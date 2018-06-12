import Chart from '@/charts/Chart.js';

export default class KlineChart extends Chart {

  initData() {
    super.initData();

    // 初始化数据,取options中data字段作为初始数据
    this.data = this.options.data || [];
    this.cache = [].concat(this.data);

    this.period = this.options.period || '1day';
    this.split = this.options.split != null ? this.options.split : 1;

    // 最大显示条数(理论数值,不能大于重画时计算出的最大条数)
    this.maxCount = this.options.maxCount || Number.MAX_VALUE;

    // 最小显示条数
    this.minCount = this.options.minCount || 10;

    // 最大预加载数据条数,默认200,预加载数据条数取当前显示条数和最大预加载数据条数中较小的一个值
    this.maxPreLoadCount = this.options.maxPreLoadCount || 300;

    // 位置表示显示数据在缓存中开始位置
    this.position = 0;

    this.hasMoreData = true;

    // 初始需要展示的数据条数,默认80
    this.reCalculate(0, this.options.initCount || 80);

    // 订阅K线数据变化(更新最新的1条数据)
    const subscribe = this.dataProvider.subscribeKline({
      period: this.period,
      split: this.split,
    }, (data) => {
      // chart 移除则停止订阅
      if (!this.canvas.hasChart(this)) {
        subscribe.cancel();
        return;
      }

      if (data && data.length > 0) {
        if (this.cache.length > 0) {
          this.cache[this.cache.length - 1] = data[0];
        }
        this.reCalculate();
      }
    });
  }

  redraw() {
    if (this.data) {
      super.redraw();
    }
  }

  initChart() {
    super.initChart();

    // 根据画板宽度调整显示数据个数,最多1像数显示一条数据(单条数据小于1像数时,需要调整显示个数),间隙和影线宽度都是固定的1像数
    let count = this.data.length;

    // FIXME count = 0
    let pixelPerWithSeparator = this.canvas.canvasWidth / count;

    let pixelPer = Math.max(pixelPerWithSeparator - 1, 0.5);
    if (pixelPerWithSeparator < 1) {
      pixelPerWithSeparator = 1;
      count = this.canvas.canvasWidth;
      this.data = this.data.slice(0, count);
      this.maxCount = count;
    } else if (pixelPer > 50) {
      // 超过最大值50,则取最大值
      pixelPer = 50;
    }

    this.pixelPer = pixelPer;
    this.pixelPerWithSeparator = pixelPerWithSeparator;

    // 计算最大和最小值
    const MAX_VALUE = Number.MAX_VALUE;
    const MIN_VALUE = Number.MIN_VALUE;
    let min = MAX_VALUE;
    let max = 0;
    let maxVolume = 0;
    this.data.forEach((eachData) => {
      max = Math.max(max, eachData.ZuiGaoJia || MIN_VALUE, eachData.MA5 || MIN_VALUE,
        eachData.MA10 || MIN_VALUE, eachData.MA20 || MIN_VALUE, eachData.MA30 || MIN_VALUE);
      min = Math.min(min, eachData.ZuiDiJia || MAX_VALUE, eachData.MA5 || MAX_VALUE,
        eachData.MA10 || MAX_VALUE, eachData.MA20 || MAX_VALUE, eachData.MA30 || MAX_VALUE);
      maxVolume = Math.max(maxVolume, eachData.ChengJiaoLiang);
    });

    // 最大值和最小值范围增加10%
    this.max = max > min ? max + ((max - min) * 0.1) : max * 1.1;
    this.min = max > min ? min - ((max - min) * 0.1) : max * 0.9;
    this.maxVolume = maxVolume;

    this.candleChartHeight = this.mainChartHeight;
    this.candleYPixelRadio = this.candleChartHeight / (this.max - this.min);
    this.volumeYPixelRadio = this.volumeChartHeight / maxVolume;
  }

  formatXAxisLabel(text, hasDay = false) {
    const date = new Date(text);
    return hasDay ? Chart.formatDate(date, 'yyyyMMdd') : Chart.formatDate(date, 'yyyy-MM');
  }

  /* eslint class-methods-use-this: 0 */
  isUp(open, close, lastClose) {
    // FIXME 还需要考虑当天收盘和昨收相同的情况
    return open !== close ? close > open : close > lastClose;
  }

  drawChart() {
    const maPoints = [[], [], [], []];
    const color = ['#222222', '#e78512', '#2e8ae6', '#cc2996'];
    const pixelPerWithSeparator = this.pixelPerWithSeparator;
    const pixelPer = this.pixelPer;
    const halfPixelPer = pixelPer / 2;
    const hasVolume = this.hasVolume;
    const candleYPixelRadio = this.candleYPixelRadio;
    const max = this.max;
    const canvas = this.canvas;
    let lastLabel;

    let lastDrawIndex = 0;

    // 画出每根k线和量
    /* eslint no-param-reassign: 0 */


    let timeArr = [];
    this.data.forEach((eachData, index) => {
      let lastClose = eachData.lastClose;

      // 添加数据附加属性
      if (!lastClose) {
        lastClose = eachData.lastClose = index > 0 ? this.data[index - 1].ShouPanJia : 0;
        eachData.time = eachData.ShiJian * 1000;
        eachData.isUp = this.isUp(eachData.KaiPanJia, eachData.ShouPanJia, lastClose);
        eachData.xAxisLabel = this.formatXAxisLabel(eachData.time,true);
      }

      timeArr.push(eachData.xAxisLabel)

      //console.log("label is ",currentLabel)

      // 满足条件画x轴坐标(跨月的第一交易日并且两个坐标点之间的距离不小于指定大小)
/*      if (currentLabel !== lastLabel) {
        lastLabel = currentLabel;
        if ((index - lastDrawIndex) * pixelPerWithSeparator > pix) {
           // -30 修复时间轴最右侧日期显示一半的问题
          this.drawXAxisGridLine((pixelPerWithSeparator * index) + halfPixelPer-30, currentLabel);
          lastDrawIndex = index;
        }
      }*/

      this.drawCandle(index, eachData.KaiPanJia, eachData.ShouPanJia, eachData.ZuiGaoJia,
        eachData.ZuiDiJia, eachData.isUp);
      if (hasVolume) {
        this.drawVolume(index, eachData.ChengJiaoLiang, eachData.isUp);
      }

      // MA
      if (eachData.MA5) {
        let x = (pixelPerWithSeparator * index) + halfPixelPer;
        if (index === 0) {
          x -= halfPixelPer;
        } else if (index === this.data.length - 1) {
          x += halfPixelPer;
        }
        maPoints[0].push([x, candleYPixelRadio * (max - eachData.MA5)]);
        maPoints[1].push([x, candleYPixelRadio * (max - eachData.MA10)]);
        maPoints[2].push([x, candleYPixelRadio * (max - eachData.MA20)]);
        maPoints[3].push([x, candleYPixelRadio * (max - eachData.MA30)]);
      }
    });

    let pix = this.canvas.canvasWidth/2;

    for(let i =0 ;i<3;i++){
      if(i ==0){
        this.drawXAxisGridLine(i * pix + 21 * this.canvas.pixelRadio, timeArr[0], '#dddddd');
      }else if(i==1){
        this.drawXAxisGridLine(i * pix, timeArr[Math.round(timeArr.length/2)], '#dddddd','middle');
      }else if(i==2){
        this.drawXAxisGridLine(i * pix-29 * this.canvas.pixelRadio, timeArr[timeArr.length-1], '#dddddd');
      }
    }
    timeArr = null;


    maPoints.forEach((eachPoints, index) => {
      canvas.drawPath(eachPoints, color[index]);
    });

    // 按压时显示十字光标
    if (this.pressPoint) {
      const { x, y } = this.pressPoint;
      const index = parseInt(x / pixelPerWithSeparator, 10);
      const data = this.data[index] || {};

      // x
      this.drawXAxisGridLine((pixelPerWithSeparator * index) + (pixelPerWithSeparator / 2),
        this.formatXAxisLabel(data.time, true), this.pointerLineColor, undefined, true, true);

      // y
      if (y < this.candleChartHeight && y > 0) {
        this.drawYAxisGridLine(y, this.max - (y / this.candleYPixelRadio), this.pointerLineColor,
          (y > this.candleChartHeight / 2) ? 'top' : 'bottom', true);
      }

      // 显示详细信息
      this.drawTooltip(data);
    }
  }

  //k线时间轴显示和竖线
  drawXAxisGridLine(x, text, color = this.gridLineColor, position = 'middle', withBackground = false, full = false, tickColor = this.tickColor) {
    //不显示竖线
    //this.canvas.drawLine(x, 0, x, full ? this.canvas.canvasHeight : this.mainChartHeight, this.gridLineWidth, color);
    if (text) {
      const textWidth = this.canvas.measureText(text);
      const fontSize = this.fontSize;
      const textX = position === 'middle' ? x - (textWidth / 2) : x;
      const textY = this.mainChartHeight + fontSize + 2;

      this.canvas.drawText(text, textX, textY, fontSize, tickColor,
        withBackground && this.tickBackgroundColor);
    }
  }

  drawTooltip(data) {
    let startX = 50;
    const fontSize = this.fontSize;
    const y = fontSize + 2;
    const color = this.getColor(this.isUp(data.KaiPanJia, data.ShouPanJia, data.lastClose));

    [
      { label: `日期:${this.formatXAxisLabel(data.time, true)}`, labelColor: '#555555' },
      { label: `开:${Chart.formatNumber(data.KaiPanJia, 2)}` },
      { label: `收:${Chart.formatNumber(data.ShouPanJia, 2)}` },
      { label: `高:${Chart.formatNumber(data.ZuiGaoJia, 2)}` },
      { label: `低:${Chart.formatNumber(data.ZuiDiJia, 2)}` },
      { label: `涨跌:${Chart.formatNumber((data.ShouPanJia - data.lastClose) / data.lastClose, 2, '%')}`, labelColor: this.getColor(data.ShouPanJia >= data.lastClose) },
      { label: `量:${Chart.formatNumber(data.ChengJiaoLiang, 2, 'K/M')}` },
    ].forEach(({ label, labelColor = color }) => {
      this.canvas.drawText(label, startX, y, fontSize, labelColor);
      startX += (this.canvas.measureText(label) + 10);
    });
  }

  drawBackground() {
    // 画出纵坐标和网格线
    const max = this.max;
    const min = this.min;
    this.drawYAxisGridLine(0, max, undefined, 'bottom');
    this.drawYAxisGridLine(this.candleChartHeight, min, undefined, 'bottom',undefined,undefined,12*this.canvas.pixelRadio);

    this.drawYAxisGridLine(this.candleChartHeight / 2, max - ((max - min) / 2));
    this.drawYAxisGridLine(this.candleChartHeight / 4, max - ((max - min) / 4));
    this.drawYAxisGridLine(this.candleChartHeight * (3 / 4), max - ((max - min) * (3 / 4)));
    this.drawYAxisGridLine(this.canvas.canvasHeight - this.volumeChartHeight, this.maxVolume, null, 'bottom');

    //0坐标 不显示
    //this.drawYAxisGridLine(this.canvas.canvasHeight, '0');

  }

  drawYAxisGridLine(y, text, color = this.gridLineColor, position = 'top', withBackground = false, tickColor = this.tickColor,textMove = 0) {

      if(position == 'bottom'){
        this.canvas.drawLine(0, y, this.canvas.canvasWidth, y, this.gridLineWidth, color);
      }else{
        this.canvas.drawLineDash(0, y, this.canvas.canvasWidth, y, this.gridLineWidth, color);
      }

    if (text) {
        textMove >0 && (y-=textMove)
      // 记录Y轴坐标位置
      const yAxisTicks = this.yAxisTicks;
      yAxisTicks.push({
        text: this.formatYAxisLabel(text),
        x:2*this.canvas.pixelRadio,
        y: (position === 'top' ? y - 2 : y + this.fontSize + 2),
        tickColor,
        withBackground,
      });
    }
  }

  drawCandle(index, open, close, top, low, isUp) {
    const width = this.pixelPer;
    const x = ((this.pixelPerWithSeparator * index) + (this.pixelPerWithSeparator / 2)) -
      (width / 2);
    const y = this.candleYPixelRadio * (this.max - open);
    let height = open === close ? 1 : (this.candleYPixelRadio * (this.max - close)) - y;
    height = Math.abs(height) < 1 ? Math.sign(height) : height;
    let color = this.getColor(isUp);

    if (width > 1) {
      if(isUp){
        this.canvas.drawRectEmpty(x, y, width, height,color);
      }else {
        if(!isUp){
          color = '#1ca049';
        }
        this.canvas.drawRect(x, y, width, height, color);
      }

    }

    // 上下影线
    const x1 = x + (width / 2) - 1;
    const y1 = this.candleYPixelRadio * (this.max - top);
    const y2 = this.candleYPixelRadio * (this.max - low);

    this.canvas.drawLine(x1, y1, x1, y+height, 0.6, color);
    this.canvas.drawLine(x1, y, x1, y2, 0.6, color);
  }

  drawVolume(index, volume, isUp) {
    const width = this.pixelPer;
    const x = ((this.pixelPerWithSeparator * index) + (this.pixelPerWithSeparator / 2)) -
      (width / 2);
    const y = this.canvas.canvasHeight;
    const height = -this.volumeYPixelRadio * volume;
    if(isUp){
      this.canvas.drawRectEmpty(x, y, width, height,this.getColor(isUp));
    }else{
      this.canvas.drawRect(x, y, width, height, this.getColor(isUp));
    }

  }

  reCalculate(move = 0, count) {
    // 重新计算显示数据在缓存数据中的左偏移位置和长度
    const cacheCount = this.cache.length;
    let requestCount = 0;
    let currentCount = this.data.length;
    let leftPosition = this.position;

    // 如果move为正数,表示向左移动,判断缓存数据是否存在,缓存数据不足则加载更多数据,负数表示向右移动直接从缓存中取得数据
    if (move > 0) {
      if (leftPosition < move) {
        if (this.hasMoreData) {
          requestCount = move - leftPosition;
        } else {
          leftPosition = 0;
        }
      } else {
        leftPosition -= move;
      }
    } else if (move < 0) {
      const restCount = cacheCount - leftPosition - currentCount;
      if (restCount > -move) {
        leftPosition += -move;
      } else {
        leftPosition += restCount;
      }
    }

    // count 重设显示数据个数(先重新计算左偏移,再重设count)
    // 限制最小个数
    if (count) {
      count = Math.max(count, this.minCount);
    }

    // 如果count比当前个数小,则直接左偏移向右移动count/2
    if (count < currentCount) {
      leftPosition += parseInt((currentCount - count) / 2, 10);
      currentCount = count;
    } else if (count > currentCount) {
      // 限制显示的最大个数
      count = Math.min(count, this.maxCount);
      let leftOffsetCount = parseInt((count - currentCount) / 2, 10);

      leftOffsetCount += Math.max(leftOffsetCount - (cacheCount - leftPosition - currentCount), 0);

      // 如果缓存数据不足则加载更多数据
      if (leftPosition < leftOffsetCount && this.hasMoreData) {
        requestCount = leftOffsetCount - leftPosition;
      } else {
        leftPosition = Math.max(leftPosition - leftOffsetCount, 0);
        currentCount = count;
      }
    }

    // requestCount不为零则加载数据后再做reCalculate
    if (requestCount > 0) {
      // 计算请求数据的start和count,count需要加上预加载个数(默认等于当前显示的数据个数,但不能超过限制的最大值)
      // 初始currentCount为0时,请求个数为初始显示个数的2倍
      requestCount += Math.min(currentCount || requestCount, this.maxPreLoadCount);
      const start = -(requestCount + cacheCount);
      this.loadMoreData(start, requestCount).then(() => {
        this.reCalculate(move, count);
      });
      return;
    }

    // 根据新的左偏移位置和新的数据个数重设显示数据data后重画图形
    this.data = this.cache.slice(leftPosition, leftPosition + currentCount);
    this.position = leftPosition;
    this.redraw();
  }

  /**
   * 动态加载数据,添加到缓存cache中并且修改当前位置
   */
  loadMoreData(start, count) {
    this.loading = true;
    this.canvas && this.canvas.toggleMask(true);
    const lastDataProvider = this.dataProvider;

    const [klinePromise, maPromise] = this.dataProvider.getKline({
      period: this.period,
      split: this.split,
      start,
      count,
    });
    return klinePromise.then((klineData) => {
      if (klineData && lastDataProvider === this.dataProvider) {
        // 合并数据到缓存中,判断是否还有更多数据(请求到的数据长度小于count大小或者请求到的数据的时间在cache中已经存在)
        if (klineData.length < count) {
          this.hasMoreData = false;
        }
        const cacheStartTime = this.cache[0] ? this.cache[0].ShiJian : Number.MAX_VALUE;
        let eachData;
        for (let i = klineData.length; i > 0; i -= 1) {
          eachData = klineData[i - 1];
          if (eachData.ShiJian < cacheStartTime) {
            this.cache.unshift(eachData);
            this.position += 1;
          } else {
            this.hasMoreData = false;
            break;
          }
        }
      }
      this.loading = false;

      // 再等待MA数据返回后更新缓存后重画chart
      maPromise.then((maData) => {
        // 合并K线和MA数据
        if (maData) {
          let maIndex = 0;
          const maLength = maData.length;
          klineData.forEach((eachKline) => {
            const kTime = eachKline.ShiJian;
            while (maIndex < maLength) {
              const eachMA = maData[maIndex];
              const maTime = eachMA.ShiJian;
              const maResult = eachMA.JieGuo;
              if (maTime > kTime) {
                break;
              } else if (maTime === kTime) {
                Object.assign(eachKline, {
                  MA5: maResult[0],
                  MA10: maResult[1],
                  MA20: maResult[2],
                  MA30: maResult[3],
                });
              }
              maIndex += 1;
            }
          });

          this.redraw();
        }
      });
    });
  }

  panMove(pressed, x, y, deltaX) {
    if (!this.loading) {
      if (pressed) {
        this.pressPoint = { x, y };
        this.redraw();
      } else if (this.pressPoint) {
        this.pressPoint = null;
        this.redraw();
      } else {
        const size = parseInt(deltaX / (this.pixelPerWithSeparator), 10);
        if (size !== 0) {
          this.reCalculate(size);
          return true;
        }
      }
    }
    return false;
  }

  pinchMove(scale) {
    if (!this.loading) {
      const deltaX = this.canvas.canvasWidth * scale;
      const offsetCount = parseInt(deltaX / (this.pixelPerWithSeparator), 10);
      if (Math.abs(offsetCount) > 1) {
        this.reCalculate(0, this.data.length + offsetCount);
        return true;
      }
    }
    return false;
  }
}
