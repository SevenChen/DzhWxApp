<template>
<div>
    <header class="header flex header-blue">
        <a href="/pages/stock/main?code=SH000001" class="space" :class="{'mod-red':shzs.ZhangFu>0,'mod-green':shzs.ZhangFu<0,'mod-gray':shzs.ZhangFu==0}">
            <span>{{shzs.ZuiXinJiaTxt}}</span>
            <p>上证 <span :class="{'font-red':shzs.ZhangFu>0,'font-green':shzs.ZhangFu<0,'font-gray':shzs.ZhangFu==0}">{{shzs.ZhangFuTxt}}</span></p>
        </a>
        <a href="/pages/stock/main?code=SZ399001" class="space" :class="{'mod-red':szzs.ZhangFu>0,'mod-green':szzs.ZhangFu<0,'mod-gray':szzs.ZhangFu==0}">
            <span>{{szzs.ZuiXinJiaTxt}}</span>
            <p>深证 <span :class="{'font-red':szzs.ZhangFu>0,'font-green':szzs.ZhangFu<0,'font-gray':szzs.ZhangFu==0}">{{szzs.ZhangFuTxt}}</span></p>
        </a>
        <a href="/pages/stock/main?code=SZ399006" class="space" :class="{'mod-red':cyzs.ZhangFu>0,'mod-green':cyzs.ZhangFu<0,'mod-gray':cyzs.ZhangFu==0}">
            <span>{{cyzs.ZuiXinJiaTxt}}</span>
            <p>创业 <span :class="{'font-red':cyzs.ZhangFu>0,'font-green':cyzs.ZhangFu<0,'font-gray':cyzs.ZhangFu==0}">{{cyzs.ZhangFuTxt}}</span></p>
        </a>
    </header>
    <main class="main">
        <section class="sch">
            <a href="/pages/search/main"><img src="/static/images/icon_search.png" alt="">输入股票代码/首字母</a>
        </section>
        <article class="stock-selected">
            <div v-if="!isExitSelf" class="selected-blank"><a href="/pages/search/main">+</a><p>添加自选股</p></div>
            <div v-else class="stock-list">
                <div class="stock-list-hd">
                    <span>名称</span><span @tap="hqOrderBy('ZuiXinJia')">最新</span><span @tap="hqOrderBy('ZhangFu')">涨跌幅</span>
                </div>
                <ul class="stock-list-bd">
                    <li v-for="(stock,index) in selfstockHqD" :key="index">
                        <a :href="'/pages/stock/main?code='+stock.Obj">
                            <div>{{stock.ZhongWenJianCheng}}<small>{{stock.Obj}}</small></div>
                            <div>{{stock.ZuiXinJiaTxt}}</div>
                            <div><span :class="{'block-red':stock.ZhangFu>0,'block-green':stock.ZhangFu<0,'block-gray':(stock.ZhangFu==0 || stock.ZhangFu==null)} ">{{stock.ZhangFuTxt}}</span></div>
                        </a>
                    </li>
                </ul>
            </div>
        </article>
    </main>
</div>
</template>
<script>
import {Dzhyun, formatNumber, formatDate, noop , yunToken} from '@/utils/util.js'
import stockManager from '../../utils/stockManager'
import store from '@/store/index.js'

export default {
    data () {
        return {
            YunDzhObj:'',           //云平台行情源对象
            subHqD:'',              //订阅行情数据对象
            shzs:'',               //上证指数
            szzs:'',               //深圳指数
            cyzs:'',               //创业板指数
            selfstock:[],               //自选股
            selfstockHqD:[],           //自选股hq
            fromApp:false,          //是否app打开
            orderby:'',             //自选股排序字段
            desc:''                 //true 倒序，false 顺序
        }
    },
    onLoad(){
        this.YunDzhObj = store.state.wsobj;
    },
    onShow(){
        let self = this;

        self.querySelfStock().then(()=>{
            self.subDyna();//订阅行情
        });

        //判断是否app打开
        wx.getStorage({
              key: 'wx.scene',
              success: function(res) {
                  if (res.data == 1036 || res.data == 1089 || res.data == 1090) {
                    self.fromApp = true;
                  } else {
                    self.fromApp = false;
                  }
              }
        });

    },
    computed:{
        isExitSelf() {  //是否有自选股
           return (this.selfstock.length>0)?true:false;
        }
    },
    methods: {
        async querySelfStock() {    //查询之选股
            this.selfstock = await stockManager.getPortfolioList();
        },
        hqOrderBy(field) {  //排序
            this.cancelSub();   //先取消订阅
            this.orderby = field;

            if (field != this.orderby) {
                this.desc = true;
            }else{
                this.desc = !this.desc;
            }
            //再订阅
            this.subDyna(this.orderby,this.desc);
        },
        subDyna(orderby='',desc='') {   //订阅数据
            let self = this;
            let allstock = [...new Set([...['SH000001','SZ399006','SZ399001'],...self.selfstock])];    //自选股去重

            let sortParams = {
                    obj: allstock,
                    field: 'ZhongWenJianCheng,ZuiXinJia,ZhangFu,ZhangDie',
                    mode:2,
                    orderby:orderby,
                    desc:desc
            };

            self.subHqD = self.YunDzhObj.subscribe(
                '/stkdata',
                sortParams,
                HqData => { self.PageHqData(HqData) }
            );
        },
        launchAppError() {  //打开app失败
            console.log(12);
        },
        PageHqData(HqData) {    //页面行情源绑定
            let self = this;
            let latestHq = [];

            HqData.forEach(hq=>{
                if (hq.Obj == 'SH000001') {
                    self.shzs = self.FmtHqData(hq);
                    //自选股如果有指数，就显示到自选股区域
                    if(self.selfstock.includes('SH000001')) {
                        latestHq.push(self.FmtHqData(hq));
                    }

                } else if(hq.Obj == 'SZ399001') {
                    self.szzs = self.FmtHqData(hq);

                    if(self.selfstock.includes('SZ399001')) {
                        latestHq.push(self.FmtHqData(hq));
                    }

                } else if(hq.Obj == 'SZ399006') {
                    self.cyzs = self.FmtHqData(hq);

                    if(self.selfstock.includes('SZ399006')) {
                        latestHq.push(self.FmtHqData(hq));
                    }
                } else {
                    latestHq.push(self.FmtHqData(hq));
                }
            });
            self.selfstockHqD = latestHq;
        },
        FmtHqData(eachObj){ //格式化行情数据
            if (eachObj.ZuiXinJia == null) {
                eachObj.ZuiXinJiaTxt = '--';
                eachObj.ZhangFuTxt = '--';
            } else {
                eachObj.ZuiXinJiaTxt = formatNumber(eachObj.ZuiXinJia);
                eachObj.ZhangFuTxt = formatNumber(eachObj.ZhangFu / 100, 2, '%');
            }
            return eachObj;
        },
        cancelSub() {   //取消订阅
            if (this.subHqD) {
                this.subHqD.cancel();
            }
        }
    },
    onHide() {
        console.log('wx---onHide');
        this.cancelSub();
    },
    onUnload() {
        console.log('wx---onUnload');
        this.cancelSub();
    },
    launchAppError() {
        console.log('打开APP查看-挂了');
    },
    onShareAppMessage() {
        return {
          title: '大智慧行情',
          desc: '股票实时数据展示',
          path: '/pages/dzh/main',
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
    a:active{color: inherit;}
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

    /* icons
    .sch a:before,.footer>div a:before{background: url('images/icons.png') no-repeat 0 0;-webkit-background-size: 50px auto;background-size: 50px auto;}*/

    /* 0.5顶边 */
    .footer:before{
        content: '';position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: -webkit-linear-gradient(top, #e7e7e7 60%, transparent 60%) no-repeat left top;background: linear-gradient(top, #e7e7e7 60%, transparent 60%) no-repeat left top;-webkit-background-size: 100% 1px;background-size: 100% 1px;z-index: -1;
    }
    .stock-list-hd:before{
        content: '';position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: -webkit-linear-gradient(top, #d6d6d6 60%, transparent 60%) no-repeat left top;background: linear-gradient(top, #d6d6d6 60%, transparent 60%) no-repeat left top;-webkit-background-size: 100% 1px;background-size: 100% 1px;z-index: -1;
    }

    /* 0.5底边 */
    .stock-list-hd:after,.header:after{
        content: '';position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: -webkit-linear-gradient(bottom, #d6d6d6 60%, transparent 60%) no-repeat left bottom;background: linear-gradient(bottom, #d6d6d6 60%, transparent 60%) no-repeat left bottom;-webkit-background-size: 100% 1px;background-size: 100% 1px;z-index: -1;
    }

    .footer{position: fixed;bottom:0;left: 0;right: 0;padding: 0 37px;background: #f7f7fc;}
    .footer>div{text-align: center;}
    .footer>div a{color:#000;font-size: 11px;padding:33px 0 6px;display: inline-block;position: relative;}
    .footer>div a:before{content:'';position: absolute;top:5px;left:0;width: 25px;height: 25px;}
    .footer>div.cur a{color:#1949d0;}
    .footer>div:nth-of-type(1) a:before{background-position:0 0;}
    .footer>div:nth-of-type(2) a:before{background-position:0 -25px;}
    .footer>div:nth-of-type(3) a:before{background-position:0 -50px;}
    .footer>div:nth-of-type(1).cur a:before{background-position:-25px 0;}
    .footer>div:nth-of-type(2).cur a:before{background-position:-25px -25px;}
    .footer>div:nth-of-type(3).cur a:before{background-position:-25px -50px;}
    .header{/* background:#214db4;color: #fff; */position: relative;z-index: 1;}
    .header>a{padding:10px 0 12px 30px;position: relative;}
    .header>a>span{font-size:21px;font-weight: bold;}
    .header>a.mod-red>span{color:#ef3939;}
    .header>a.mod-green>span{color:#01aa3b;}
    .header>a.mod-gray>span{color:#8e9ab7;}
    .header>a:before{content:'';position: absolute;left:15px;top:11px;bottom:14px;width: 5px;border-radius: 1px;}
    .header>a>p{font-size:11px;margin-top: 5px;}
    .header>a>p span{font-size:12px;margin-left: 8px;}
    .main{padding-bottom: 52px;}
    .sch{padding: 8px 16px;}
    .sch a{font-size:15px;color:#999;display: block;height: 33px;line-height: 33px;position: relative;}
    .sch a:after{content:'';position: absolute;left:0;top:0;height:200%;width:200%;border:1px solid #bfbfbf;border-radius: 10px;-webkit-transform:scale(.5);-ms-transform:scale(.5);transform:scale(.5);-webkit-transform-origin: left top;-ms-transform-origin: left top;transform-origin: left top;}
    .sch img{width: 16px;height: 16px;float: left;margin:8px 8px 0 13px;}
    .stock-selected{}
    .selected-blank{text-align: center;padding: 45px 0;}
    .selected-blank a{display: block;width:60px;height:60px;border-radius: 50%;box-shadow:0 0 15px rgba(203,53,58,.2) ;margin:0 auto 15px;position: relative;line-height: 1000px;overflow: hidden;}
    .selected-blank a:before,.selected-blank a:after{content:'';position: absolute;left: 50%;top: 50%;background: #cb353a;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);border-radius: 1px;}
    .selected-blank a:before{width:3px;height:20px;}
    .selected-blank a:after{width:20px;height:3px;}
    .selected-blank p{color: #333;font-size: 14px;}
    .stock-list-hd{background: #f6f9ff;overflow: hidden;position: relative;z-index: 1;}
    .stock-list-hd>span{font-size:14px;float: left;line-height: 31px;color: #222;-webkit-box-sizing: border-box;box-sizing: border-box;}
    .stock-list-hd>span:nth-of-type(1),.stock-list-bd li a>div:nth-of-type(1){padding-left: 13px;width: 48%;}
    .stock-list-hd>span:nth-of-type(2),.stock-list-bd li a>div:nth-of-type(2){padding-right: 25px;width: 27%;text-align: right;}
    .stock-list-hd>span:nth-of-type(3){padding-right: 17px;width: 25%;text-align: right;}
    .stock-list-bd li{overflow: hidden;padding:10px 0 8px;}
    .stock-list-bd li a{display: block;width: 100%;display:table;}
    .stock-list-bd li a>div{display:table-cell;vertical-align: middle;color: #000;}
    .stock-list-bd li a>div:nth-of-type(1){font-size: 16px;}
    .stock-list-bd li a>div:nth-of-type(2){font-size: 18px;}
    .stock-list-bd li a>div:nth-of-type(3){font-size: 16px;padding-right: 10px;width: 25%;text-align: right;}
    .stock-list-bd li a>div>span{color:#fff;text-align: center;line-height: 28px;border-radius:2px;display:inline-block;width:80px;}
    .stock-list-bd li a>div>small{display: block;font-size:11px;color:#9aa4ad;margin-top: 4px;}
    .side-bar{position: fixed;right:0;bottom:0;z-index: 10;}
    .right-bar{position:absolute;right:10px;background: -webkit-linear-gradient(top, #396afc 0%, #2948ff 100%) no-repeat 0 0;background: linear-gradient(top, #396afc 6%, #2948ff 100%) no-repeat 0 0;color:#fff;font-size:13px;width: 50px;height: 50px;border-radius:50%;text-align: center;line-height: 1.2;-webkit-transition:bottom .2s;-o-transition:bottom .2s;transition:bottom .2s;-webkit-box-sizing: border-box;box-sizing: border-box;}
    .right-bar1{bottom:190px;padding-top: 10px;}
    .right-bar2{bottom:130px;line-height: 50px;}
    .side-bar-icon{position: absolute;bottom:90px;right: 21px;width: 28px;height: 28px;background: #fff;box-shadow: 0 0 10px #396afc;border-radius: 50%;}
    .side-bar-icon:after{content:'';position: absolute;top: 45%;left: 50%;width:10px;height:10px;border-left:2px solid #2948ff;border-bottom: 2px solid #2948ff;-webkit-transform:translate(-50%,-50%) rotate(-45deg);-ms-transform:translate(-50%,-50%) rotate(-45deg);transform:translate(-50%,-50%) rotate(-45deg);border-radius:0 0 0 3px;}
    .side-bar.foldUp .right-bar{bottom:80px;}
    .side-bar.foldUp .side-bar-icon{width: 30px;height: 30px;bottom:80px;right: 10px;padding:10px;}
    .side-bar.foldUp .side-bar-icon:after{content:'快捷导航';position: static;border:0;color:#2948ff;width: auto;height: auto;font-size: 13px;padding-top: 1px;line-height: 1.2;text-align: center;display: block;-webkit-transform:inherit;-ms-transform:inherit;transform:inherit;}
    .sort:after{content:'↓';display: inline-block;vertical-align:text-top;margin-left: 2px;line-height: 1;}
    .sort.up:after{content:'↑';}
</style>
