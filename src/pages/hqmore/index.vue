<template>
	<div>
	    <section class="market-list-th">
	        <span>沪深A股</span><span :class="Title1Class" @tap="sortby(Title1)">{{title1}}</span><span :class="Title2Class" @tap="sortby(Title2)">{{title2}}</span>
	    </section>
	    <section class="market-list-tb">
	    	<scroll-view class="ranking-list" scroll-y='true' :style="{height: windowHeight + 'px'}"  @scrolltolower='lower'>
	            <li v-for="(stock,index) in stockList" :key="index">
	                <a :href="'/pages/stock/main?code='+stock.Obj">
	                    <span>{{stock.ZhongWenJianCheng}}<small>{{stock.Obj}}</small></span>
                        <span :class="{'font-red':stock.ZhangFu>0,'font-green':stock.ZhangFu<0,'font-gray':stock.ZhangFu==0}">{{stock.ZuiXinJiaTxt}}</span>
                        <span :class="{'font-red':stock.ZhangFu>0,'font-green':stock.ZhangFu<0,'font-gray':stock.ZhangFu==0}">{{stock.title2TXT}}</span>
	                </a>
	            </li>
	        </scroll-view>
	    </section>

	</div>
</template>
<script>

import store from '@/store/index.js'
import {Dzhyun, formatNumber, formatDate, noop , yunToken} from '@/utils/util.js'

export default {
	data () {
        return {
            YunDzhObj:'',             //订阅的行情对象
            tp:'zfb',               //类型 默认涨幅榜
            windowHeight:'',         //页面高度
            stockList:[],            //数据list
            curPage:1,              //当前页
            orderby:'ZhangFu',      //排序字段
            desc:true,              //true 顺序 or false 倒序
            title1:'最新价',           //标题1
            title2:'涨幅%',           //标题2
            testobj:{},
        }
    },
    computed:{
        Title1(){
            return 'ZuiXinJia';
        },
        Title1Class(){

            let _class = '';
            let _i = '';
            //if (this.tp == 'zfb') {
            if (this.orderby == 'ZuiXinJia') {
                _class = 'sort';
                _i = (this.desc) ? '' : 'up';
                return _class + ' ' + _i;
            } else {
                return '';
            }
            //}
        },
        Title2(){

            switch(this.tp) {
                case 'zfb':
                    return 'ZhangFu';break;
                case 'dfb':
                    return 'ZhangFu';break;
                case 'fivezfb':
                    return 'FenZhongZhangFu5';break;
                case 'huanshou':
                    return 'HuanShou';break;
                case 'liangbi':
                    return 'LiangBi';break;
                case 'cje':
                    return 'ChengJiaoE';break;
            }
        },
        Title2Class(){
            let _class = '';
            let _i = '';

            if (this.tp == 'zfb' || this.tp == 'dfb') {
                if (this.orderby == 'ZhangFu') {
                    _class = 'sort';
                    _i = (this.desc) ? '' : 'up';
                    return _class + ' ' + _i;
                } else {
                    return '';
                }
            }

            if (this.tp == 'fivezfb') {
                if (this.orderby == 'FenZhongZhangFu5') {
                    _class = 'sort';
                    _i = (this.desc) ? '' : 'up';
                    return _class + ' ' + _i;
                } else {
                    return '';
                }
            }

            if (this.tp == 'huanshou') {
                if (this.orderby == 'HuanShou') {
                    _class = 'sort';
                    _i = (this.desc) ? '' : 'up';
                    return _class + ' ' + _i;
                } else {
                    return '';
                }
            }

            if (this.tp == 'liangbi') {
                if (this.orderby == 'LiangBi') {
                    _class = 'sort';
                    _i = (this.desc) ? '' : 'up';
                    return _class + ' ' + _i;
                } else {
                    return '';
                }
            }

            if (this.tp == 'cje') {
                if (this.orderby == 'ChengJiaoE') {
                    _class = 'sort';
                    _i = (this.desc) ? '' : 'up';
                    return _class + ' ' + _i;
                } else {
                    return '';
                }
            }

        },
    },
    onLoad(){
    	let self = this;

    	this.tp = this.$root.$mp.query.tp;
        this.init();

    	wx.getSystemInfo({
          success: (res) => {
            self.windowHeight = res.windowHeight;
          }
        });

        this.YunDzhObj = store.state.wsobj;

        this.getRank(this.orderby,this.desc);     //debug
    },
    onShow(){
    	//console.log('show..');
    },
    onHide(){
        this.YunDzhObj.cancel();
    },
    onUnload(){
        this.YunDzhObj.cancel();
    },
    methods: {
        init(){
            this.stockList=[];
            this.curPage=1;

            this.title1 = '最新价';
            this.desc  = true;

            switch(this.tp) {
                case 'zfb':
                    this.orderby='ZhangFu';
                    this.title2 = '涨幅%';
                    break;
                case 'dfb':
                    this.orderby='ZhangFu';
                    this.title2 = '涨幅%';
                    this.desc = false;
                    break;
                case 'fivezfb':
                    this.orderby='FenZhongZhangFu5';
                    this.title2 = '5分钟涨%';
                    break;
                case 'huanshou':
                    this.orderby='HuanShou';
                    this.title2 = '换手';
                    break;
                case 'liangbi':
                    this.orderby='LiangBi';
                    this.title2 = '量比';
                    break;
                case 'cje':
                    this.orderby='ChengJiaoE';
                    this.title2 = '成交额';
                    break;
            }
        },
        sortby(flag){
            if (flag != this.orderby) {     //排序字段不是当前字段 切换 排序字段
                this.orderby = flag;
                this.desc = true;
            } else {                        //切换 排序方式
                this.desc = !this.desc;
            }
            this.curPage = 1;
            this.stockList = [];

            this.getRank(this.orderby,this.desc);

        },
    	getRank(orderby='ZhangFu',desc=true,start=0){
            let self = this;

            let params = {
                    gql:'block=市场/沪深市场/沪深A股',
                    field: 'ZhangFu,ZhongWenJianCheng,ZuiXinJia,FenZhongZhangFu5,HuanShou,LiangBi,ChengJiaoE',
                    mode:2,
                    orderby:orderby,
                    start:start,
                    count:20,
                    desc:desc
            };

            wx.request({url:"https://gw.yundzh.com/stkdata?output=json&gql=block%3D%E5%B8%82%E5%9C%BA%2F%E6%B2%AA%E6%B7%B1%E5%B8%82%E5%9C%BA%2F%E6%B2%AA%E6%B7%B1A%E8%82%A1&field=ZhangFu%2CZhongWenJianCheng%2CZuiXinJia%2CFenZhongZhangFu5%2CHuanShou%2CLiangBi%2CChengJiaoE&mode=2&orderby=ZhangFu&start=0&count=200&desc=true&qid=4&token=0000007f:1528377253:f3ed0ba0048680fa1682646e14cf8ce078b7b6c0",
                        data:{},
                        header: {'content-type':'application/json'},
                        success: function(res) {
                            let _res = res.data.Data.RepDataStkData;

                            _res.forEach((eachobj)=>self.FmtHqData(eachobj));

                            //self.stockList = _res;
                        }
                    });
/*
            self.YunDzhObj.query(
                '/stkdata',
                params,
                res => {
                    res.forEach((eachobj)=>self.FmtHqData(eachobj));

/*
                    wx.setStorage({
                        key:'zfb',
                        data:res,
                        success:()=>console.log(res);
                        fail:()=>(),
                    })
*/
                    //self.stockList = [...self.stockList , ...res];


                   // self.stockList.push.apply(self.stockList,res);
/*
                   self.stockList = res;
                   //console.log(self.stockList);

                   if(self.testobj[self.curPage]) {
                        self.testobj[self.curPage] = '';
                   }

                   self.testobj[self.curPage] = res;

                   console.log(self.testobj);

                }
            );*/
        },
        FmtHqData(eachObj){ //格式化行情数据
            if (eachObj.ZuiXinJia == null) {
                eachObj.ZuiXinJiaTxt = '--';
                eachObj.ZhangFuTxt = '--';
                eachObj.FenZhongZhangFu5 = '--';
            } else {
                eachObj.ZuiXinJiaTxt = formatNumber(eachObj.ZuiXinJia);
                eachObj.ZhangFuTxt = formatNumber(eachObj.ZhangFu / 100, 2, '%');
                eachObj.ChengJiaoE = (eachObj.ChengJiaoE/100000000).toFixed(2);
                eachObj.FenZhongZhangFu5Txt =eachObj.FenZhongZhangFu5 + '%';
            }

            switch(this.tp) {
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
        lower(){
            return 0;
            if(this.curPage > 10 ) {
                return 0;
            } else {
                this.curPage ++;
            }

            let start = (this.curPage-1) * 20;

            this.getRank(this.orderby,this.desc,start);

        }
    },
    onShareAppMessage() {
        return {
          title: '大智慧行情',
          desc: '股票实时数据展示',
          path: '/pages/hq/home',
        };
    }
}
</script>
<style>
    /* init */
    body,button,input,select,textarea{font:12px/1 Arial,San Francisco,Helvetica,SimHei,SimSun,sans-serif;}
    h1,h2,h3,h4,h5,h6,b,strong{font-weight: normal;}
    button,input,select,textarea{padding: 0;background: none;border: 0;font-size: inherit;}
    input:focus,textarea:focus,button:focus{outline:0;}
    ul,ol,li{list-style: none;}
    i{font-style: normal;}
    a{text-decoration: none;}
    img{display: block;}
    *{padding: 0;margin:0;}

    /* common */
    .flex{display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;}
    .space{-webkit-box-flex: 1; -webkit-flex: 1; -ms-flex: 1;flex: 1;}
    .mod-red:before{background:#ef3939;}
    .mod-green:before{background:#01aa3b;}
    .mod-gray:before{background:#8e9ab7;}
    .font-red{color:#ef3939;}
    .font-green{color:#01aa3b;}
    .font-gray{color:#8e9ab7;}
    .block-red{background:#f24957;}
    .block-green{background:#13a977;}
    .block-gray{background:#8e9ab7;}

    /* 0.5左边 */
    .header_links a:before,.index_info div:before{
        content: '';position: absolute;left: 0;top: 30%;width: 100%;height: 40%;background: -webkit-linear-gradient(left, #e5e5e5 60%, transparent 60%) no-repeat left top;background: linear-gradient(left, #e5e5e5 60%, transparent 60%) no-repeat left top;-webkit-background-size: 1px 100%;background-size: 1px 100%;z-index: -1;
    }

    /* 0.5底边 */
    .tit:after,.ranking-list li a:after{
        content: '';position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: -webkit-linear-gradient(bottom, #e5e5e5 60%, transparent 60%) no-repeat left bottom;background: linear-gradient(bottom, #e5e5e5 60%, transparent 60%) no-repeat left bottom;-webkit-background-size: 100% 1px;background-size: 100% 1px;z-index: -1;
    }

    /* 0.5上下边 */
    .mod:before{
        content: '';position: absolute;left: 0;top: 0;width: 100%;height: 100%;background-image: -webkit-linear-gradient(top, #e5e5e5 60%, transparent 60%),-webkit-linear-gradient(bottom, #e5e5e5 60%, transparent 60%);background-image:linear-gradient(top, #e5e5e5 60%, transparent 60%),linear-gradient(bottom, #e5e5e5 60%, transparent 60%);background-repeat:no-repeat;background-position:top,bottom;-webkit-background-size: 100% 1px;background-size: 100% 1px;z-index: -1;
    }

    .market-list-th{background:#f3f3f7;height:35px;display:table;width:100%;position: fixed;top: 0;left: 0;z-index: 10;}
    .market-list-th span{display:table-cell;vertical-align:middle;font-size:14px;color: #666;-webkit-box-sizing:border-box;box-sizing:border-box;}
    .market-list-tb{padding-top: 38px;}
    .ranking-list li a{position: relative;display:table;color: #333;font-size: 17px;height: 50px;width: 100%;}
    .ranking-list li a span{box-sizing: border-box;-webkit-box-sizing: border-box;display: table-cell;vertical-align: middle;}
    .ranking-list li a span small{display: block;font-size: 12px;color: #999;padding-top: 3px;}
    .ranking-list li a span:nth-of-type(1),.market-list-th span:nth-of-type(1){font-size: 16px;width: 34%;padding-left: 15px;}
    .ranking-list li a span:nth-of-type(2),.ranking-list li a span:nth-of-type(3),.market-list-th span:nth-of-type(2),.market-list-th span:nth-of-type(3){width: 33%;padding-right: 15px;text-align: right;}
    .sort:after{content:'↓';display: inline-block;vertical-align:text-top;margin-left: 2px;line-height: 1;}
    .sort.up:after{content:'↑';}
</style>
