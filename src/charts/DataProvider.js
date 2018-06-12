/**
 * Created by jiagang on 16/2/18.
 */
import { Dzhyun, noop } from '@/utils/util.js'
import store from '@/store/index.js'

const oneMinute = 1 * 60 * 1000;
const oneDay = 1 * 24 * 60 * oneMinute;

// 默认股票交易时间
const defaultTimeInfo = (function () {
  const now = new Date();
  const year = now.getFullYear();
  const month = (`0${(now.getMonth() + 1)}`).slice(-2);
  const day = (`0${now.getDate()}`).slice(-2);
  const date = [year, month, day].join('');
  return {
    RiQi: date,
    JiaoYiShiJianDuan: [
      {
        KaiShiShiJian: '0930',
        JieShuShiJian: '1130',
        KaiShiRiQi: date,
        JieShuRiQi: date,
      },
      {
        KaiShiShiJian: '1300',
        JieShuShiJian: '1500',
        KaiShiRiQi: date,
        JieShuRiQi: date,
      },
    ],
    JiHeJingJiaDianShu: 15,
    ShiQu: 8,
    ZuoShou: 0,
  };
}());

//将2018-05-30 09:30 这种转成 uinx毫秒时间戳
const getTime = function (dateParam, hourMinute, timeZone) {
  const date = JSON.stringify(dateParam);
  const year = parseInt(date.substr(0, 4), 10);
  const month = parseInt(date.substr(4, 2), 10) - 1;
  const day = parseInt(date.substr(6, 2), 10);
  const hour = parseInt(hourMinute / 100, 10) - timeZone;
  const minute = hourMinute % 100;
  return Date.UTC(year, month, day, hour, minute);
};

export default class DataProvider {
//K线-K线服务
  /*
  klineDataStore = new DataStore({
    serviceUrl: '/quote/kline',
    idProperty: ' ',
  });*/
  klineDataStore = store.state.wsobj;

//指标-分笔行情
/*
  maDataStore = new DataStore({
    serviceUrl: '/indicator/calc',
    idProperty: ' ',
    otherParams: {
      name: 'MA',
      text: 'MA1:MA(CLOSE,P1);MA2:MA(CLOSE,P2);MA3:MA(CLOSE,P3);MA4:MA(CLOSE,P4);',
      parameter: 'P1=5,P2=10,P3=30,P4=60',
    },
  });*/
  maDataStore = store.state.wsobj;

//分时走势
/*
  minDataStore = new DataStore({
    serviceUrl: '/quote/min',
    idProperty: ' ',
  });*/
  minDataStore = store.state.wsobj;

  constructor(params) {
    this.params = params;
    //this.klineDataStore.dataParser.direct = true;
    //this.maDataStore.dataParser.direct = true;
    //this.minDataStore.dataParser.direct = true;
  }

  getKline(params, withMA = true) {
    const klineQuery = this.klineDataStore.query('/quote/kline',
      Object.assign({}, this.params, params)).then(data => data[0] && data[0].Data);
    return [klineQuery, withMA && this.getMA(params)];
  }

  subscribeKline(params, callback = noop) {
    const request = this.klineDataStore.subscribe('/quote/kline',
      Object.assign({}, this.params, { start: -1 }, params),
      (data) => {
        console.log('kline',params,data);

        if (!(data instanceof Error)) {
          const kline = data[0] && data[0].Data;
          callback(kline);

          this.getMA(Object.assign({}, { start: -1 }, params)).then((ma) => {
            if (kline && ma && kline[0] && ma[0] && kline[0].ShiJian === ma[0].ShiJian) {
              const maResult = ma[0].JieGuo;
              Object.assign(kline[0], {
                MA5: maResult[0],
                MA10: maResult[1],
                MA20: maResult[2],
                MA30: maResult[3],
              });
            }
            callback(kline);
          });
        }
      });
    request.cancel = () => {
      this.klineDataStore.cancel(request.qid);
    };
    return request;
  }

  getMA(params) {
    let _params ={name: 'MA',
                  text: 'MA1:MA(CLOSE,P1);MA2:MA(CLOSE,P2);MA3:MA(CLOSE,P3);MA4:MA(CLOSE,P4);',
                  parameter: 'P1=5,P2=10,P3=30,P4=60'};

    return this.maDataStore.query('/indicator/calc',Object.assign({}, this.params, params, _params))
    .then(data => data[0] && data[0].ShuJu)
    .catch(() => []);
  }

  _initMinCache(timeInfo) {
    const times = timeInfo.JiaoYiShiJianDuan;
    const timeZone = timeInfo.ShiQu;
    this.minCache = {
      lastClose: timeInfo.ZuoShou,
    };
    const minTimes = this.minCache.minTimes = [];
    if (times && times.length > 0) {
      let lastTime = 0;
      let startTime;
      let endTime;

      times.forEach((eachTime, index) => {
        startTime = getTime(eachTime.KaiShiRiQi, eachTime.KaiShiShiJian, timeZone);
        endTime = getTime(eachTime.JieShuRiQi, eachTime.JieShuShiJian, timeZone);

        // 跨天
        if (endTime < startTime) {
          endTime += oneDay;
        }
        if (startTime < lastTime) {
          startTime += oneDay;
          endTime += oneDay;
        }

        // 跳过除第一段时间的开始时间
        if (index > 0) {
          startTime += oneMinute;
        }
        while (startTime <= endTime) {
          minTimes.push(startTime);
          startTime += oneMinute;
        }
        lastTime = endTime;
      });

      // FIXME 默认包含集合进价的数据
      const prefixMinute =  0;
      startTime = minTimes[0];

      for (let i = 1; i <= prefixMinute; i += 1) {
        minTimes.unshift(startTime - (i * oneMinute));
      }
    }
  }

  _updateMinCache(time, data) {
    const minTimes = this.minCache.minTimes || [];
    let index = this.minCache.minTimes.indexOf(time);
    if (index >= 0) {
      this.minCache[time] = data;
    } else {
      // 没有对应时间时，认为交易日期有跨越，对应修正交易时间数据
      const firstTime = minTimes[0];
      const overDays = parseInt((time - firstTime) / oneDay, 10);
      const overTime = overDays * oneDay;
      index = minTimes.indexOf(time - overTime);

      // 找到跨越时间点将之后的数据统一修改日期到数据对应的日期
      if (index >= 0) {
        while (index < minTimes.length) {
          let oldTime = minTimes[index];
          oldTime += overTime;
          minTimes[index] = oldTime;
          index += 1;
        }
        this.minCache[time] = data;
      }
    }
  }

  //本地存储
  saveDataLocal(minData,ckey,callback){
    if(!this.minCache || this.minCache === undefined){
      this._initMinCache(minData.JiaoYiShiJianDuan ? minData : defaultTimeInfo);
    }
    minData = minData.Data;
    if (minData && minData.length > 0) {
      minData.forEach((eachData) => {
        const time = eachData.ShiJian * 1000;
        this._updateMinCache(time, eachData);
      });
    }
    //console.log('minCache',this.minCache);
    callback(this.minCache);
    let temp = this.minCache ;
    this.minCache = null;
    wx.setStorage({
      key: ckey,
      data: temp,
      success: () => {

      },
      fail: () => {

      },
    });
  }

  /* eslint no-underscore-dangle: 0 */
  subscribeMin(callback = noop) {
    this.minCache = null;

    const request = this.minDataStore.subscribe('/quote/min', this.params, (data) => {
            console.log('subscribeMin',data);
            if (data && !(data instanceof Error) && data.length > 0) {
              let minData = data[0];

              // 清盘
              if (minData.QingPan === 1) {
                this.minCache = null;
                callback(this.minCache);
                return ;
              }

              let ckey = "stock-min";
              let that =this

                wx.getStorage({
                  key: ckey,
                  success: result => {
                    that.minCache = result.data;
                    that.saveDataLocal(minData,ckey,callback)
                  },
                  fail: () => {
                    that.saveDataLocal(minData,ckey,callback)

                  },
                });
                //console.log("minCache getSync is ",this.minCache)
            }
          });
    request.cancel = () => {
      this.minDataStore.cancel(request.qid);
    };
    return request;
  }

  cancel() {
    this.klineDataStore.cancel();
    this.maDataStore.cancel();
    this.minDataStore.cancel();
  }
}
