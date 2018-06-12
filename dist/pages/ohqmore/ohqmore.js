//logs.js
Page({
  data: {
    stockList: [],
    tp:'zfb',
    windowHeight:'',
    curPage:1,
    orderby:'ZhangFu',
    desc:true,
    title1:'最新价',
    title2:'涨幅%',
    tab1:'ZuiXinJia',
    tab1class:'',
    tab2:'',
    tab2class:'',
    token:'',
  },
  onLoad: function (opt) {
    this.setData({tp:opt.tp,token:opt.token});

    let self = this;
    this.init();
    this.tab();

    wx.getSystemInfo({
      success: (res) => {
        self.setData({windowHeight:res.windowHeight});
      }
    });

    this.getRank(this.data.orderby,this.data.desc);
  },
  init:function(){
     this.setData({
        stockList:[],
        curPage:1,
        title1:'最新价',

     });

     switch(this.data.tp){
        case 'zfb':
          this.setData({orderby:'ZhangFu',title2:'涨幅%'});
          break;
        case 'dfb':
          this.setData({orderby:'ZhangFu',title2:'涨幅%',desc:'false'});
          break;
        case 'fivezfb':
          this.setData({orderby:'FenZhongZhangFu5',title2:'5分钟涨%'});
          break;
        case 'huanshou':
          this.setData({orderby:'HuanShou',title2:'换手'});
          break;
        case 'liangbi':
          this.setData({orderby:'LiangBi',title2:'量比'});
          break;
        case 'cje':
          this.setData({orderby:'ChengJiaoE',title2:'成交额'});
          break;
     }
  },
  tab:function(){
    this.tab1class();
    this.tab2();
    this.tab2class();
  },
  tab1class:function(){
      let _class = '';
      let _i = '';
      let _res = '';
      //if (this.tp == 'zfb') {
      if (this.data.orderby == 'ZuiXinJia') {
          _class = 'sort';
          _i = (this.data.desc) ? '' : 'up';
          _res = _class + ' ' + _i;
      } else {
          _res = '';
      }
      this.setData({tab1class:_res});
  },
  tab2(){
      let _res = '';
      switch(this.data.tp) {
          case 'zfb':
              _res = 'ZhangFu';
              break;
          case 'dfb':
              _res =  'ZhangFu';break;
          case 'fivezfb':
              _res =  'FenZhongZhangFu5';break;
          case 'huanshou':
              _res =  'HuanShou';break;
          case 'liangbi':
              _res =  'LiangBi';break;
          case 'cje':
              _res =  'ChengJiaoE';break;
      };
      this.setData({tab2:_res});
  },
  tab2class(){
      let _class = '';
      let _i = '';
      let _res = '';

      if (this.data.tp == 'zfb' || this.data.tp == 'dfb') {
          if (this.data.orderby == 'ZhangFu') {
              _class = 'sort';
              _i = (this.data.desc) ? '' : 'up';
              _res = _class + ' ' + _i;
          } else {
              _res = '';
          }
      }

      if (this.data.tp == 'fivezfb') {
          if (this.data.orderby == 'FenZhongZhangFu5') {
              _class = 'sort';
              _i = (this.data.desc) ? '' : 'up';
              _res = _class + ' ' + _i;
          } else {
              _res = '';
          }
      }

      if (this.data.tp == 'huanshou') {
          if (this.data.orderby == 'HuanShou') {
              _class = 'sort';
              _i = (this.data.desc) ? '' : 'up';
              _res = _class + ' ' + _i;
          } else {
              _res = '';
          }
      }

      if (this.data.tp == 'liangbi') {
          if (this.data.orderby == 'LiangBi') {
              _class = 'sort';
              _i = (this.data.desc) ? '' : 'up';
              _res = _class + ' ' + _i;
          } else {
              _res = '';
          }
      }

      if (this.data.tp == 'cje') {
          if (this.data.orderby == 'ChengJiaoE') {
              _class = 'sort';
              _i = (this.data.desc) ? '' : 'up';
              _res = _class + ' ' + _i;
          } else {
              _res = '';
          }
      }

      this.setData({tab2class:_res});
  },
  getRank:function(orderby='ZhangFu',desc=true,start=0){
      let self = this;
      let url = "https://gw.yundzh.com/stkdata";
      let params = {
                    output:'json',
                    gql:'block=市场/沪深市场/沪深A股',
                    field: 'ZhangFu,ZhongWenJianCheng,ZuiXinJia,FenZhongZhangFu5,HuanShou,LiangBi,ChengJiaoE',
                    mode:2,
                    orderby:orderby,
                    start:start,
                    count:20,
                    desc:desc,
                    token:this.data.token
            };
      url = url + '?' + this.fmturl(params);

      wx.request({url:url,
                  data:{},
                  header: {'content-type':'application/json'},
                  success: function(res) {
                    let _res = res.data.Data.RepDataStkData
                    _res.forEach((eachobj)=>self.FmtHqData(eachobj));

                    self.setData({stockList: self.data.stockList.concat(_res)});
                  }
            });
  },
  FmtHqData(eachObj){ //格式化行情数据
      if (eachObj.ZuiXinJia == null) {
          eachObj.ZuiXinJiaTxt = '--';
          eachObj.ZhangFuTxt = '--';
          eachObj.FenZhongZhangFu5 = '--';
      } else {
          eachObj.ZuiXinJiaTxt = eachObj.ZuiXinJia;
          eachObj.ZhangFuTxt = eachObj.ZhangFu.toFixed(2);
          eachObj.ChengJiaoE = (eachObj.ChengJiaoE/100000000).toFixed(2);
          eachObj.FenZhongZhangFu5Txt =eachObj.FenZhongZhangFu5 + '%';
      }

      switch(this.data.tp) {
          case 'zfb':
              eachObj.title2TXT = eachObj.ZhangFuTxt;break;
          case 'dfb':
              eachObj.title2TXT = eachObj.ZhangFuTxt;break;
          case 'fivezfb':
              eachObj.title2TXT = eachObj.FenZhongZhangFu5;break;
          case 'huanshou':
              eachObj.title2TXT = eachObj.HuanShou;break;
          case 'liangbi':
              eachObj.title2TXT = eachObj.LiangBi;break;
          case 'cje':
              eachObj.title2TXT = eachObj.ChengJiaoE + '亿';break;
      }

      return eachObj;
  },
  fmturl(objparam){
    let str = '';
    Object.keys(objparam).forEach((o)=>{
      str +='&'+ o + '=' + objparam[o];
    });
    return str.substr(1);
  },
  sortby:function(e){
    let _flag = e.currentTarget.dataset.hi;
    if (_flag != this.data.orderby) {     //排序字段不是当前字段 切换 排序字段
        this.setData({orderby:_flag,desc:true});
    } else {                        //切换 排序方式
        this.setData({desc:!this.data.desc});
    }

    this.tab();

    this.setData({curPage:1,stockList:[]});

    this.getRank(this.data.orderby,this.data.desc);
  },
  lower(){
    let cp = this.data.curPage;

    if(cp > 10) {
        return 0;
    } else {
        cp ++;
    }

    this.setData({curPage:cp});
    let start = (cp-1) * 20;
    this.getRank(this.data.orderby,this.data.desc,start);
  },
  onShareAppMessage() {
      return {
        title: '大智慧行情',
        desc: '股票实时数据展示',
        path: '/pages/ohqmore/ohqmore',
      };
  }



})
