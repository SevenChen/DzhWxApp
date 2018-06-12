<template>
<div>
    <header class="sch sch_gray">
        <a href="/pages/search/main"><img src="/static/images/icon_search.png" alt="">输入股票代码/首字母</a>
    </header>
    <main class="main">
        <section class="mb5 index mod">
            <div class="flex index_market">
                <a href="/pages/stock/main?code=SH000001" class="space" :class="{'mod-red':shzs.ZhangFu>0,'mod-green':shzs.ZhangFu<0,'mod-gray':shzs.ZhangFu==0}">
                    上证指数<p>{{shzs.ZuiXinJiaTxt}}</p><p><span>{{shzs.ZhangDieTxt}}</span><span>{{shzs.ZhangFuTxt}}</span></p>
                </a>
                <a href="/pages/stock/main?code=SZ399001" class="space" :class="{'mod-red':szzs.ZhangFu>0,'mod-green':szzs.ZhangFu<0,'mod-gray':szzs.ZhangFu==0}">
                    深证成指<p>{{szzs.ZuiXinJiaTxt}}</p><p><span>{{szzs.ZhangDieTxt}}</span><span>{{szzs.ZhangFuTxt}}</span></p>
                </a>
                <a href="/pages/stock/main?code=SZ399006" class="space" :class="{'mod-red':cyzs.ZhangFu>0,'mod-green':cyzs.ZhangFu<0,'mod-gray':cyzs.ZhangFu==0}">
                    创业板指<p>{{cyzs.ZuiXinJiaTxt}}</p><p><span>{{cyzs.ZhangDieTxt}}</span><span>{{cyzs.ZhangFuTxt}}</span></p>
                </a>
            </div>
            <div class="index_info">
                <div class="arr-green">下跌<span>{{xiadie}}家</span></div>
                <div class="arr-gray">平盘<span>{{ping}}家</span></div>
                <div class="arr-red">上涨<span>{{shangzhang}}家</span></div>
            </div>
        </section>
        <section class="mb10 ranking mod">
            <h2 class="tit tit-dropDown" :class="{'up': zfb.length>0}" @tap="rankHandler('zfb')">涨幅榜<a :href="'/pages/ohqmore/ohqmore?tp=zfb&token='+token"><i></i></a></h2>
            <ul class="ranking-list">
                <li v-for="(stock,index) in zfb" :key="index">
                    <a :href="'/pages/stock/main?code='+stock.Obj">
                        <span>{{stock.ZhongWenJianCheng}}</span><span class="font-red">{{stock.ZuiXinJiaTxt}}</span><span class="font-red">{{stock.ZhangFuTxt}}</span>
                    </a>
                </li>
            </ul>
        </section>

        <section class="mb10 ranking mod">
            <h2 class="tit tit-dropDown" :class="{'up': dfb.length>0}" @tap="rankHandler('dfb')">跌幅榜<a :href="'/pages/ohqmore/ohqmore?tp=dfb&token='+token"><i></i></a></h2>
            <ul class="ranking-list">
                <li v-for="(stock,index) in dfb" :key="index">
                    <a :href="'/pages/stock/main?code='+stock.Obj">
                        <span>{{stock.ZhongWenJianCheng}}</span><span class="font-green">{{stock.ZuiXinJiaTxt}}</span><span class="font-green">{{stock.ZhangFuTxt}}</span>
                    </a>
                </li>
            </ul>
        </section>

        <section class="mb10 ranking mod">
            <h2 class="tit tit-dropDown" :class="{'up': fivezfb.length>0}" @tap="rankHandler('fivezfb')">5分钟涨跌幅<a :href="'/pages/ohqmore/ohqmore?tp=fivezfb&token='+token"><i></i></a></h2>
            <ul class="ranking-list">
                <li v-for="(stock,index) in fivezfb" :key="index">
                    <a :href="'/pages/stock/main?code='+stock.Obj">
                        <span>{{stock.ZhongWenJianCheng}}</span><span :class="{'font-red':stock.ZhangFu>0,'font-green':stock.ZhangFu<0,'font-gray':stock.ZhangFu==0}">{{stock.ZuiXinJiaTxt}}</span><span :class="{'font-red':stock.ZhangFu>0,'font-green':stock.ZhangFu<0,'font-gray':stock.ZhangFu==0}">{{stock.FenZhongZhangFu5Txt}}</span>
                    </a>
                </li>
            </ul>
        </section>

        <section class="mb10 ranking mod">
            <h2 class="tit tit-dropDown" :class="{'up': huanshou.length>0}" @tap="rankHandler('huanshou')">换手率<a :href="'/pages/ohqmore/ohqmore?tp=huanshou&token='+token"><i></i></a></h2>
            <ul class="ranking-list">
                <li v-for="(stock,index) in huanshou" :key="index">
                    <a :href="'/pages/stock/main?code='+stock.Obj">
                        <span>{{stock.ZhongWenJianCheng}}</span><span :class="{'font-red':stock.ZhangFu>0,'font-green':stock.ZhangFu<0,'font-gray':stock.ZhangFu==0}">{{stock.ZuiXinJiaTxt}}</span><span :class="{'font-red':stock.ZhangFu>0,'font-green':stock.ZhangFu<0,'font-gray':stock.ZhangFu==0}">{{stock.HuanShou}}%</span>
                    </a>
                </li>
            </ul>
        </section>

        <section class="mb10 ranking mod">
            <h2 class="tit tit-dropDown" :class="{'up': liangbi.length>0}" @tap="rankHandler('liangbi')">量比<a :href="'/pages/ohqmore/ohqmore?tp=liangbi&token='+token"><i></i></a></h2>
            <ul class="ranking-list">
                <li v-for="(stock,index) in liangbi" :key="index">
                    <a :href="'/pages/stock/main?code='+stock.Obj">
                        <span>{{stock.ZhongWenJianCheng}}</span><span :class="{'font-red':stock.ZhangFu>0,'font-green':stock.ZhangFu<0,'font-gray':stock.ZhangFu==0}">{{stock.ZuiXinJiaTxt}}</span><span :class="{'font-red':stock.ZhangFu>0,'font-green':stock.ZhangFu<0,'font-gray':stock.ZhangFu==0}">{{stock.LiangBi}}</span>
                    </a>
                </li>
            </ul>
        </section>

        <section class="mb10 ranking mod">
            <h2 class="tit tit-dropDown" :class="{'up': cje.length>0}" @tap="rankHandler('cje')">成交额<a :href="'/pages/ohqmore/ohqmore?tp=cje&token='+token"><i></i></a></h2>
            <ul class="ranking-list">
                <li v-for="(stock,index) in cje" :key="index">
                    <a :href="'/pages/stock/main?code='+stock.Obj">
                        <span>{{stock.ZhongWenJianCheng}}</span><span :class="{'font-red':stock.ZhangFu>0,'font-green':stock.ZhangFu<0,'font-gray':stock.ZhangFu==0}">{{stock.ZuiXinJiaTxt}}</span><span :class="{'font-red':stock.ZhangFu>0,'font-green':stock.ZhangFu<0,'font-gray':stock.ZhangFu==0}">{{stock.ChengJiaoE}}亿</span>
                    </a>
                </li>
            </ul>
        </section>


    </main>
</div>
</template>
<script>
import store from '@/store/index.js'
import {Dzhyun, formatNumber, formatDate, noop , yunToken} from '@/utils/util.js'

export default {
    data () {
        return {
            YunDzhObj:'',           //云平台行情源对象
            wsHqObj:{},             //订阅的行情对象
            shzs:'',               //上证指数
            szzs:'',               //深圳指数
            cyzs:'',               //创业板指数
            shangzhang:0,            //涨跌平统计
            xiadie:0,
            ping:0,
            zfb:[],                 //涨幅榜
            dfb:[],                 //跌幅榜
            fivezfb:[],                 //5涨幅榜
            huanshou:[],            //换手
            liangbi:[],             //量比
            cje:[],                 //成交额
            token:'',
        }
    },
    onLoad(){
        this.YunDzhObj = store.state.wsobj;
        this.token =  store.state.token;
    },
    onShow(){
        this.getZsHq();     //
        this.getZDPStat(); //涨跌平统计
        this.getRank('zfb');
    },
    onHide(){
        Object.keys(this.wsHqObj).forEach( k=>this.wsHqObj[k].cancel() );    //取消对象订阅
    },
    onShareAppMessage() {
        return {
          title: '大智慧行情',
          desc: '股票实时数据展示',
          path: '/pages/hq/home',
        };
    },
    methods: {
        getRank(name='zfb',orderby='ZhangFu',desc=true){
            let self = this;

            let params = {
                    gql:'block=市场/沪深市场/沪深A股',
                    field: 'ZhangFu,ZhongWenJianCheng,ZuiXinJia,FenZhongZhangFu5,HuanShou,LiangBi,ChengJiaoE',
                    mode:2,
                    orderby:orderby,
                    start:0,
                    count:10,
                    desc:desc
            };
            self.wsHqObj[name] = self.YunDzhObj.subscribe(
                '/stkdata',
                params,
                res => {
                    res.forEach((eachobj)=>self.FmtHqData(eachobj));
                    self[name] = res;
                    console.log(self[name]);
                }
            );
        },
        rankHandler(name){
            if (this[name].length > 0) {
                this[name] = [];
                this.wsHqObj[name].cancel();
            } else {
                switch (name) {
                    case 'zfb':
                        this.getRank(name);
                        break;
                    case 'dfb':
                        this.getRank(name,'ZhangFu',false);
                        break;
                    case 'fivezfb':
                        this.getRank(name,'FenZhongZhangFu5',true);
                        break;
                    case 'huanshou':
                        this.getRank(name,'HuanShou',true);
                        break;
                    case 'liangbi':
                        this.getRank(name,'LiangBi',true);
                        break;
                    case 'cje':
                        this.getRank(name,'ChengJiaoE',true);
                        break;
                }

            }
        },
        getZDPStat(){   //涨跌平统计
            let self = this;

            let params = {
                    gql:'block=市场/沪深市场/沪深A股',
                    field: 'ZhangDiePing',
                    mode:2,
            };
            self.wsHqObj.zdpHq = self.YunDzhObj.subscribe(
                '/blockstat',
                params,
                res => {
                    self.shangzhang = res[0].ZhangDiePing.ShangZhangJiaShu;
                    self.xiadie = res[0].ZhangDiePing.XiaDieJiaShu;
                    self.ping = res[0].ZhangDiePing.PingPanJiaShu;
                }
            );
        },
        getZsHq(orderby='',desc='') {   //订阅数据
            let self = this;
            let allstock = ['SH000001','SZ399006','SZ399001'];    //指数行情

            let sortParams = {
                    obj: allstock,
                    field: 'ZhongWenJianCheng,ZuiXinJia,ZhangFu,ZhangDie',
                    mode:2,
                    orderby:orderby,
                    desc:desc
            };

            self.wsHqObj.zsHq = self.YunDzhObj.subscribe(
                '/stkdata',
                sortParams,
                HqData => { self.ZsHqData(HqData) }
            );
        },
        ZsHqData(HqData){   //筛选指数行情数据
            let self = this;
            HqData.forEach(hq=>{
                if (hq.Obj == 'SH000001') {
                    self.shzs = self.FmtHqData(hq);
                } else if(hq.Obj == 'SZ399001') {
                    self.szzs = self.FmtHqData(hq);
                } else if(hq.Obj == 'SZ399006') {
                    self.cyzs = self.FmtHqData(hq);
                }
            });
        },
        FmtHqData(eachObj){ //格式化行情数据
            if (eachObj.ZuiXinJia == null) {
                eachObj.ZuiXinJiaTxt = '--';
                eachObj.ZhangFuTxt = '--';
                eachObj.ZhangDieTxt = '--';
                eachObj.FenZhongZhangFu5 = '--';
            } else {
                eachObj.ZhangDieTxt = eachObj.ZhangDie;
                eachObj.ZuiXinJiaTxt = formatNumber(eachObj.ZuiXinJia);
                eachObj.ZhangFuTxt = formatNumber(eachObj.ZhangFu / 100, 2, '%');
                eachObj.ChengJiaoE = (eachObj.ChengJiaoE/100000000).toFixed(2);
                eachObj.FenZhongZhangFu5Txt =eachObj.FenZhongZhangFu5 + '%';
            }
            return eachObj;
        },
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

    .main{padding-bottom: 52px;}
    .sch{padding: 8px 16px;}
    .sch a{font-size:15px;color:#999;display: block;height: 33px;line-height: 33px;position: relative;}
    .sch a:after{content:'';position: absolute;left:0;top:0;height:200%;width:200%;border:1px solid #bfbfbf;border-radius: 10px;-webkit-transform:scale(.5);-ms-transform:scale(.5);transform:scale(.5);-webkit-transform-origin: left top;-ms-transform-origin: left top;transform-origin: left top;}
    .sch img{width: 16px;height: 16px;float: left;margin:8px 8px 0 13px;}
    .sch_gray{background: #f3f3f7;}
    .sch_gray a{z-index: 1;}
    .sch_gray a:after{background: #fff;z-index: -1;}
    .mb5:after{content:'';position: absolute;left:0;right:0;bottom:-5px;background:#f3f3f7;height: 5px;}
    .tit{line-height:35px;font-size: 15px;padding-left:15px;position: relative;z-index: 1;}
    .tit a{float: right;padding:0 15px;}
    .tit a i{width:4px;height:4px;border-radius: 50%;background: #999;display: inline-block;vertical-align: middle;}
    .tit a:before,.tit a:after{content:'';display: inline-block;width:4px;height:4px;border-radius: 50%;background: #999;vertical-align: middle;margin:0 3px;}
    .mod-red>p{color:#ef3939;}
    .mod-green>p{color:#01aa3b;}
    .mod-gray>p{color:#8e9ab7;}
    .index_market>a{padding:16px 0 10px 30px;position: relative;font-size: 15px;color: #333;}
    .index_market>a:before{content:'';position: absolute;left:15px;top:16px;bottom:10px;width: 5px;border-radius: 1px;}
    .index_market p{padding-top: 5px;}
    .index_market p:nth-of-type(1){font-weight: bold;}
    .index_market p:nth-of-type(2){font-size: 11px;}
    .index_market p span{margin-right: 5px;}
    .index_market p span:last-child{margin-right: 0;}
    .index_info{font-size: 12px;color: #333;text-align: right;overflow:hidden;}
    .index_info div{padding:5px 10px 5px 15px;position: relative;float: right;}
    .index_info div:after{content:'';position: absolute;left:4px;top:50%;width: 0;height: 0;border:5px solid transparent;-webkit-transform:translate(0,-50%);-ms-transform:translate(0,-50%);transform:translate(0,-50%);}
    .index_info div.arr-red:after{border-bottom:5px solid #ec3b3f;top: 35%;}
    .index_info div.arr-gray:after{border-left:5px solid #999;}
    .index_info div.arr-green:after{border-top:5px solid #1ea348;top:65%;}
    .index_info div:last-child:before{content: none;}
    .arr-red span{color:#ec3b3f;}
    .arr-gray span{color:#333;}
    .arr-green span{color:#1ea348;}
    .mod{position: relative;z-index: 1;margin-bottom:5px;}
    .tit-dropDown{padding-left: 35px;}
    .tit-dropDown:before{content:'';position: absolute;left:15px;top:50%;width:9px;height: 9px;border-left: 1px solid #303f8f;border-bottom: 1px solid #303f8f;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);border-radius: 0 0 0 2px;margin-top: -6px;}
    .tit-dropDown.up:before{-webkit-transform:rotate(135deg);-ms-transform:rotate(135deg);transform:rotate(135deg);margin-top: -2px;}
    .ranking-list li a{line-height: 50px;position: relative;display: block;color: #333;font-size: 17px;height: 50px;}
    .ranking-list li a span{float: left;box-sizing: border-box;-webkit-box-sizing: border-box;}
    .ranking-list li a span:nth-of-type(1){font-size: 16px;width: 34%;padding-left: 15px;}
    .ranking-list li a span:nth-of-type(2),.ranking-list li a span:nth-of-type(3){width: 33%;padding-right: 15px;text-align: right;}
</style>
