<template>
<div>
    <header class="header" @tap="chkpankou">
        <div class="header-index">
            <span :class="FontClass">{{dynaData.ZuiXinJia}}</span>
            <p :class="FontClass"><span>{{dynaData.ZhangDie}}</span><span>{{dynaData.ZhangFuTxt}}</span></p>
        </div>
        <div class="header-info">
            <p>最高：</p><p>{{dynaData.ZuiGaoJia}}</p>
            <p>最低：</p><p>{{dynaData.ZuiDiJia}}</p>
        </div>
        <div class="header-info">
            <p>成交量：</p><p>{{dynaData.ChengJiaoLiang}}</p>
            <p>成交额：</p><p>{{dynaData.ChengJiaoE}}</p>
        </div>
        <div class="header-info" v-show="IsAstock">
            <p>总市值：</p><p>{{dynaData.ZongShiZhi}}</p>
            <p>量比：</p><p>{{dynaData.LiangBi}}</p>
        </div>
        <span class="header-btn" :class="{'up':pankou}" >盘口</span>
        <!--上涨指数-->
        <div v-if="stocktype==1" class="header-info-more" v-show="pankou" catchtouchmove="preventTouchMove">
            <div class="header-info-more-w">
                <ul class="more-block">
                    <li>涨停<span class="font-red">{{dynaData.ZhangTing}}</span></li>
                    <li>今开<span :class="FontClass">{{dynaData.KaiPanJia}}</span></li>
                    <li>振幅<span>{{dynaData.ZhenFu}}</span></li>
                    <li>委比<span :class="{'font-red':dynaData.WeiBi>0,'font-green':dynaData.WeiBi<0,'font-gray':dynaData.WeiBi==0}">{{dynaData.WeiBi}}</span></li>
                    <li>总市值：<span>{{zsDynaData.ZongShiZhi}}</span></li>
                </ul>
                <ul class="more-block">
                    <li>跌停<span class="font-green">{{dynaData.DieTing}}</span></li>
                    <li>昨收<span>{{dynaData.ZuoShou}}</span></li>
                    <li>现手<span>{{dynaData.XianShou}}</span></li>
                    <li>量比<span :class="FontClass">{{dynaData.LiangBi}}</span></p>
                    <li>流通值<span>{{zsDynaData.LiuTongShiZhi}}</span></li>
                </ul>
            </div>
        </div>
        <!--上涨A股-->
        <div v-else-if="stocktype==2" class="header-info-more" v-show="pankou"  catchtouchmove="preventTouchMove">
            <div class="header-info-more-w">
                <ul class="more-block">
                    <li>涨停<span class="font-red">{{dynaData.ZhangTing}}</span></li>
                    <li>振幅<span>{{dynaData.ZhenFu}}</span></li>
                    <li>委比<span :class="{'font-red':dynaData.WeiBi>0,'font-green':dynaData.WeiBi<0,'font-gray':dynaData.WeiBi==0}">{{dynaData.WeiBi}}</span></li>
                    <li>流通股<span>{{dynaData.LiuTongAGu}}</span></li>
                    <li>总股本<span>{{dynaData.ZongGuBen}}</span></li>
                    <li>市盈率(动)<span>{{dynaData.ShiYingLv}}</span></li>
                    <li>市盈率(静)<span>{{dynaData.JingTaiShiYingLv}}</span></li>
                </ul>
                <ul class="more-block">
                    <li>跌停<span class="font-green">{{dynaData.DieTing}}</span></li>
                    <li>均价<span>{{dynaData.JunJia}}</span></li>
                    <li>今开<span :class="FontClass">{{dynaData.KaiPanJia}}</span></li>
                    <li>外盘<span class="font-red">{{dynaData.WaiPan}}</span></li>
                    <li>内盘<span class="font-green">{{dynaData.NeiPan}}</span></li>
                    <li>流通值<span>{{dynaData.LiuTongShiZhi}}</span></li>
                    <li>市净率<span>{{dynaData.ShiJingLv}}</span></li>
                </ul>
            </div>
        </div>
        <!--港股 or 美股-->
        <div v-else-if="stocktype==3 || stocktype==4" class="header-info-more" v-show="pankou"  catchtouchmove="preventTouchMove">
            <div class="header-info-more-w">
                <ul class="more-block">
                    <li>振幅<span>{{dynaData.ZhenFu}}</span></li>
                    <li>今开<span :class="FontClass">{{dynaData.KaiPanJia}}</span></li>
                    <li>外盘<span class="font-red">{{dynaData.WaiPan}}</span></li>
                    <li>委比<span :class="{'font-red':dynaData.WeiBi>0,'font-green':dynaData.WeiBi<0,'font-gray':dynaData.WeiBi==0}">{{dynaData.WeiBi}}</span></li>
                </ul>
                <ul class="more-block">
                    <li>均价<span>{{dynaData.JunJia}}</span></li>
                    <li>昨收<span>{{dynaData.ZuoShou}}</span></li>
                    <li>内盘<span class="font-green">{{dynaData.NeiPan}}</span></li>
                </ul>
            </div>
        </div>
        <!--其他-->
        <div v-else class="header-info-more" v-show="pankou"  catchtouchmove="preventTouchMove">
            <div class="header-info-more-w">
                <ul class="more-block">
                    <li>涨停<span class="font-red">{{dynaData.ZhangTing}}</span></li>
                    <li>今开<span :class="FontClass">{{dynaData.KaiPanJia}}</span></li>
                </ul>
                <ul class="more-block">
                    <li>跌停<span class="font-green">{{dynaData.DieTing}}</span></li>
                    <li>昨收<span>{{dynaData.ZuoShou}}</span></li>
                </ul>
            </div>
        </div>
    </header>
    <nav class="nav nav-tab4">
        <span :class="{'cur':period=='min'}" @tap="chgchart('min')">分时</span>
        <span :class="{'cur':period=='1day'}" @tap="chgchart('1day')">日k</span>
        <span :class="{'cur':period=='week'}" @tap="chgchart('week')">周k</span>
        <span :class="{'cur':period=='month'}" @tap="chgchart('month')">月k</span>
    </nav>
    <main  class="main">
        <div v-show="!pankou" :class="{'main-l': IsAstock && period=='min'}">
            <canvas v-if="IsAstock" canvas-id="1" :style="{width:chartWidth+'px',height:chartHeight+'px'}"></canvas>
            <canvas v-else canvas-id="2" :style="{width:chartWidth2+'px',height:chartHeight+'px'}"></canvas>
        </div>
        <div v-if="IsAstock && period=='min'" class="main-r">
            <div class="main-r-tab"><span :class="{'cur':fiveOrFenbi}" @tap='chgfiveorfenbi'>五档</span><span :class="{'cur':!fiveOrFenbi}" @tap='chgfiveorfenbi'>明细</span></div>
            <div class="main-r-content"@tap="chgfiveorfenbi" v-show="fiveOrFenbi">
                <div class="flevel flevel-sell">
                    <p><span>卖五</span><span :class="{'font-red':dynaData.WeiTuoMaiChuJia5>dynaData.ZuoShou,'font-green':dynaData.WeiTuoMaiChuJia5<dynaData.ZuoShou,'font-gray':dynaData.WeiTuoMaiChuJia5==dynaData.ZuoShou}">{{dynaData.WeiTuoMaiChuJia5Txt}}</span><span>{{dynaData.WeiTuoMaiChuLiang5Txt}}</span></p>
                    <p><span>卖四</span><span :class="{'font-red':dynaData.WeiTuoMaiChuJia4>dynaData.ZuoShou,'font-green':dynaData.WeiTuoMaiChuJia4<dynaData.ZuoShou,'font-gray':dynaData.WeiTuoMaiChuJia4==dynaData.ZuoShou}">{{dynaData.WeiTuoMaiChuJia4Txt}}</span><span>{{dynaData.WeiTuoMaiChuLiang4Txt}}</span></p>
                    <p><span>卖三</span><span :class="{'font-red':dynaData.WeiTuoMaiChuJia3>dynaData.ZuoShou,'font-green':dynaData.WeiTuoMaiChuJia3<dynaData.ZuoShou,'font-gray':dynaData.WeiTuoMaiChuJia3==dynaData.ZuoShou}">{{dynaData.WeiTuoMaiChuJia3Txt}}</span><span>{{dynaData.WeiTuoMaiChuLiang3Txt}}</span></p>
                    <p><span>卖二</span><span :class="{'font-red':dynaData.WeiTuoMaiChuJia2>dynaData.ZuoShou,'font-green':dynaData.WeiTuoMaiChuJia2<dynaData.ZuoShou,'font-gray':dynaData.WeiTuoMaiChuJia2==dynaData.ZuoShou}">{{dynaData.WeiTuoMaiChuJia2Txt}}</span><span>{{dynaData.WeiTuoMaiChuLiang2Txt}}</span></p>
                    <p><span>卖一</span><span :class="{'font-red':dynaData.WeiTuoMaiChuJia1>dynaData.ZuoShou,'font-green':dynaData.WeiTuoMaiChuJia1<dynaData.ZuoShou,'font-gray':dynaData.WeiTuoMaiChuJia1==dynaData.ZuoShou}">{{dynaData.WeiTuoMaiChuJia1Txt}}</span><span>{{dynaData.WeiTuoMaiChuLiang1Txt}}</span></p>
                </div>
                <div class="flevel flevel-buy">
                    <p><span>买一</span><span :class="{'font-red':dynaData.WeiTuoMaiRuJia1>dynaData.ZuoShou,'font-green':dynaData.WeiTuoMaiRuJia1<dynaData.ZuoShou,'font-gray':dynaData.WeiTuoMaiRuJia1==dynaData.ZuoShou}">{{dynaData.WeiTuoMaiRuJia1Txt}}</span><span>{{dynaData.WeiTuoMaiRuLiang1Txt}}</span></p>
                    <p><span>买二</span><span :class="{'font-red':dynaData.WeiTuoMaiRuJia2>dynaData.ZuoShou,'font-green':dynaData.WeiTuoMaiRuJia2<dynaData.ZuoShou,'font-gray':dynaData.WeiTuoMaiRuJia2==dynaData.ZuoShou}">{{dynaData.WeiTuoMaiRuJia2Txt}}</span><span>{{dynaData.WeiTuoMaiRuLiang2Txt}}</span></p>
                    <p><span>买三</span><span :class="{'font-red':dynaData.WeiTuoMaiRuJia3>dynaData.ZuoShou,'font-green':dynaData.WeiTuoMaiRuJia3<dynaData.ZuoShou,'font-gray':dynaData.WeiTuoMaiRuJia3==dynaData.ZuoShou}">{{dynaData.WeiTuoMaiRuJia3Txt}}</span><span>{{dynaData.WeiTuoMaiRuLiang3Txt}}</span></p>
                    <p><span>买四</span><span :class="{'font-red':dynaData.WeiTuoMaiRuJia4>dynaData.ZuoShou,'font-green':dynaData.WeiTuoMaiRuJia4<dynaData.ZuoShou,'font-gray':dynaData.WeiTuoMaiRuJia4==dynaData.ZuoShou}">{{dynaData.WeiTuoMaiRuJia4Txt}}</span><span>{{dynaData.WeiTuoMaiRuLiang4Txt}}</span></p>
                    <p><span>买五</span><span :class="{'font-red':dynaData.WeiTuoMaiRuJia5>dynaData.ZuoShou,'font-green':dynaData.WeiTuoMaiRuJia5<dynaData.ZuoShou,'font-gray':dynaData.WeiTuoMaiRuJia5==dynaData.ZuoShou}">{{dynaData.WeiTuoMaiRuJia5Txt}}</span><span>{{dynaData.WeiTuoMaiRuLiang5Txt}}</span></p>
                </div>
            </div>
            <div class="main-r-content" @tap="chgfiveorfenbi" v-show="!fiveOrFenbi">
                <div class="r-trade">
                    <p v-for="(fenbi,index) in fenbiList">
                        <span>{{fenbi.ShiJian}}</span>
                        <span class="font-green">{{fenbi.ChengJiaoJia}}</span>
                        <span class="font-green">{{fenbi.DanCiChengJiaoLiang}}</span>
                    </p>
                </div>
            </div>
        </div>
    </main>
    <section class="news">
        <h2 class="news-tit">相关新闻</h2>
        <div v-if="stockNewsList.length>0" class="news-list" >
            <div class="item" v-for="(news,index) in stockNewsList">
                <a :href="'/pages/newsdetail/main?jsonurl='+news.url">
                    <h3>{{news.title}}</h3>
                    <p>
                        <span class="fl">{{news.source}}</span>
                        <span class="fr">{{news.otime}}</span>
                    </p>
                </a>
            </div>
            <p v-show="newsCurPage<=4" class="load-more" @tap="lower()">点击加载更多</p>
        </div>
        <div v-else class="blank">
            <p>暂无数据</p>
        </div>
    </section>
    <footer class="footer">
        <span v-if="isPortfolio" class="ft-btn ft-btn-minus" @tap="chgPortfolio"><i></i>删自选</span>
        <span v-else class="ft-btn" @tap="chgPortfolio"><i></i>加自选</span>
    </footer>
    <p class="pop-alert" v-show="AlterShowFlag">{{AlterTxt}}自选股成功</p>
    <aside v-show="fromApp" class="side-bar" :class="{'foldUp':isFoldUp}" >
        <button open-type="launchApp" :app-parameter="'dzh_browser_url&goto=0&type=2970&code='+code+'&kind=1'" @error="launchAppError" class="right-bar right-bar1">打开<br>APP</button>
        <button app-parameter="" class="right-bar right-bar2" @tap='gohome'>去首页</button>
        <span class="side-bar-icon" @tap="chgFoldUp"></span>
    </aside>
</div>

</template>

<script>
import {Dzhyun, formatNumber, formatDate, noop , yunToken} from '@/utils/util.js'
import stockManager from '@/utils/stockManager.js'
import store from '@/store/index.js'

import DataProvider from '@/charts/DataProvider.js';
import Canvas from '@/charts/Canvas.js';
import MinChart from '@/charts/MinChart.js';
import KlineChart from '@/charts/KlineChart.js';


export default {
    data(){
        return {
            code:'SH601519',             //jsonUrl
            YunDzhObj:'',           //云平台行情源对象
            subHqD:'',              //订阅行情数据对象
            zsHqd:'',               //订阅指数行情
            fenbiHqD:'',            //分笔行情数据
            chartType: 'min',
            period:'min',
            dynaData:this.formatDyanData({}),    //同步数据
            zsDynaData:'',                       //指数行情数据
            chartDataProvider:'',           //数据集
            chartWidth:'',                   //图宽
            chartHeight:'',                  //图高
            chartWidth2:'',                   //图宽
            chartHeight2:'',                  //图高
            canvas:{},                  //画布
            isPortfolio:false,         //是否是自选股
            removePortListener:'',         //删除自选监听
            pankou:false,                 //盘口
            stockNewsList:[],                //个股新闻
            newsCurPage:1,                  //新闻当前页
            AlterShowFlag:0,
            AlterTxt:'',
            fromApp:false,          //是否app打开
            isFoldUp:false,
            fiveOrFenbi:true,            //显示 分笔还是 五档 =true是五档 =false是分笔
            fenbiList:[],
            stocktype:1,            //股票类型 1=上证指数 2=A股 3=港股 4=美股
            IsAstock:false,
        }
    },
    computed:{
        FontClass(){
            let _class = '';
            if (this.dynaData.ZhangFu > 0) {
                _class = 'font-red';
            } else if (this.dynaData.ZhangFu < 0) {
                _class = 'font-green';
            } else {
                _class = 'font-gray';
            }
            return _class;
        }
    },
    onLoad(options){
        let self = this;

        self.code = this.$root.$mp.query.code;

        this.chkStockType(self.code);
        //this.chartDataProvider = new DataProvider({obj:this.code});
        this.YunDzhObj = store.state.wsobj;
        this.loadDyanData();

        if (this.stocktype == 1) {
            this.loadZsDyanData(self.code);
        }

        this.loadFenbiData();
        this.loadChart();

        this.chkPortfolio();

        this.removeListener = stockManager.onPortfolioChanged(() => {
            console.log('change stock');
                                self.AlterShowFlag = 1;
                                if (self.isPortfolio) {
                                    self.AlterTxt = '删除';
                                }else{
                                    self.AlterTxt = '添加';
                                }
                                self.chkPortfolio();
                                setTimeout(()=>{
                                    self.AlterShowFlag = 0;
                                    self.AlterTxt = '';
                                },700);
                            });
    },
    onShow(){
        let self = this;

        if (this.stockNewsList.length == 0) {
            this.stocknews();
        }
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
    methods: {
        preventTouchMove(){
            return 0;
        },
        chkStockType(code){
            if(['SH000001','SZ399001','SZ399006'].includes(code)){
                this.stocktype = 1;
            } else if(code.substr(0,4) == 'SH60' || code.substr(0,4) == 'SZ00' || code.substr(0,4) == 'SZ30'){
                this.stocktype = 2;
                this.IsAstock = true;
            } else if(code.substr(0,2) == 'HK') {
                this.stocktype = 3;
            } else if(code.substr(0,2) == 'NY' || code.substr(0,2) == 'NS') {
                this.stocktype = 4;
            } else {
                this.stocktype = 5;
            }
        },
        launchAppError(e){
            wx.showModal({
                title: '小帖士',
                content: "请前往APP商城下载大智慧 \n 为您提供更专业的服务",
                success: function (res) {
                    if (res.confirm) {
                        console.log('点击确定')
                    }else{
                       console.log('点击取消')
                    }
                }
            })
        },
        chgfiveorfenbi(){
            this.fiveOrFenbi = !this.fiveOrFenbi;
        },
        gohome(){
            wx.switchTab({
              url: '/pages/dzh/main'
            })
        },
        chgFoldUp(){
            this.isFoldUp = !this.isFoldUp;
        },
        fmtNum(num){
            if (num>10000 * 10000 * 10000) {
                return (num/(10000 * 10000 * 10000)).toFixed(2) + '万亿';
            } else if (num>10000 * 10000) {
                return (num/(10000 * 10000)).toFixed(2) + '亿';
            } else if (num>10000 ) {
                return (num/(10000)).toFixed(2) + '万';
            } else {
                return num;
            }
        },
        chkPortfolio(){
            let self = this;
            stockManager.inPortfolio(self.code).then((result) => {
                self.isPortfolio = result
            });
        },
        chgPortfolio(){
            if (this.isPortfolio) { //isPortfolio = true 删自选
                stockManager.removePortfolio(this.code);
            } else {    //isPortfolio = false 加自选
                stockManager.addPortfolio(this.code);
            }
        },
        chkpankou(){
            this.pankou = !this.pankou;
        },
        chgchart(ctype){
            if (ctype == this.chartType) {
                return 0;
            }

            if(ctype=='min'){
                this.chartType = ctype;
            }else{
                this.chartType = 'kline';
            }

            this.period = ctype;
            this.chartDataProvider.cancel();    //切换图，停止订阅之前的图
            this.loadChart();
        },
        formatDyanData(data){
            console.log('formatDyanData',data);
            return Object.assign({}, data, {
                upDown: data.ZhangDie > 0 ? 1 : data.ZhangDie < 0 ? 2 : 0,
                ShiJian: data.ShiJian ? formatDate(data.ShiJian * 1000, 'yyyy-MM-dd hh:mm:ss') : '--',
                ZuiXinJia: formatNumber(data.ZuiXinJia),
                ZhangDie: formatNumber(data.ZhangDie),
                ZhangFuTxt: formatNumber(data.ZhangFu / 100, 2, '%'),
                KaiPanJia: formatNumber(data.KaiPanJia),
                ZuoShou: formatNumber(data.ZuoShou),
                ZuiGaoJia: formatNumber(data.ZuiGaoJia),
                ZuiDiJia: formatNumber(data.ZuiDiJia),
                ChengJiaoLiang: (!data.ChengJiaoLiang)?'--':this.fmtNum(data.ChengJiaoLiang),
                HuanShou: formatNumber(data.HuanShou),
                ShiYingLv: (!data.ShiYingLv)?'--':formatNumber(data.ShiYingLv),
                JingTaiShiYingLv: formatNumber(data.JingTaiShiYingLv),
                ZongShiZhi: (!data.ZongShiZhi)?'--':this.fmtNum(data.ZongShiZhi*10000),
                ChengJiaoE: (!data.ChengJiaoE)?'--':this.fmtNum(data.ChengJiaoE),
                LiuTongShiZhi: (!data.LiuTongShiZhi)?'--':this.fmtNum(data.LiuTongShiZhi*10000),
                WaiPan:(!data.WaiPan)?'--':data.WaiPan/100,
                NeiPan:(!data.NeiPan)?'--':Math.abs(data.NeiPan)/100,
                WeiTuoMaiChuJia1Txt:(!data.WeiTuoMaiChuJia1)?'--':data.WeiTuoMaiChuJia1,
                WeiTuoMaiChuJia2Txt:(!data.WeiTuoMaiChuJia2)?'--':data.WeiTuoMaiChuJia2,
                WeiTuoMaiChuJia3Txt:(!data.WeiTuoMaiChuJia3)?'--':data.WeiTuoMaiChuJia3,
                WeiTuoMaiChuJia4Txt:(!data.WeiTuoMaiChuJia4)?'--':data.WeiTuoMaiChuJia4,
                WeiTuoMaiChuJia5Txt:(!data.WeiTuoMaiChuJia5)?'--':data.WeiTuoMaiChuJia5,
                WeiTuoMaiChuLiang1Txt:(!data.WeiTuoMaiChuLiang1)?'--':data.WeiTuoMaiChuLiang1/100,
                WeiTuoMaiChuLiang2Txt:(!data.WeiTuoMaiChuLiang2)?'--':data.WeiTuoMaiChuLiang2/100,
                WeiTuoMaiChuLiang3Txt:(!data.WeiTuoMaiChuLiang3)?'--':data.WeiTuoMaiChuLiang3/100,
                WeiTuoMaiChuLiang4Txt:(!data.WeiTuoMaiChuLiang4)?'--':data.WeiTuoMaiChuLiang4/100,
                WeiTuoMaiChuLiang5Txt:(!data.WeiTuoMaiChuLiang5)?'--':data.WeiTuoMaiChuLiang5/100,
                WeiTuoMaiRuJia1Txt:(!data.WeiTuoMaiRuJia1)?'--':data.WeiTuoMaiRuJia1,
                WeiTuoMaiRuJia2Txt:(!data.WeiTuoMaiRuJia2)?'--':data.WeiTuoMaiRuJia2,
                WeiTuoMaiRuJia3Txt:(!data.WeiTuoMaiRuJia3)?'--':data.WeiTuoMaiRuJia3,
                WeiTuoMaiRuJia4Txt:(!data.WeiTuoMaiRuJia4)?'--':data.WeiTuoMaiRuJia4,
                WeiTuoMaiRuJia5Txt:(!data.WeiTuoMaiRuJia5)?'--':data.WeiTuoMaiRuJia5,
                WeiTuoMaiRuLiang1Txt:(!data.WeiTuoMaiRuLiang1)?'--':data.WeiTuoMaiRuLiang1/100,
                WeiTuoMaiRuLiang2Txt:(!data.WeiTuoMaiRuLiang2)?'--':data.WeiTuoMaiRuLiang2/100,
                WeiTuoMaiRuLiang3Txt:(!data.WeiTuoMaiRuLiang3)?'--':data.WeiTuoMaiRuLiang3/100,
                WeiTuoMaiRuLiang4Txt:(!data.WeiTuoMaiRuLiang4)?'--':data.WeiTuoMaiRuLiang4/100,
                WeiTuoMaiRuLiang5Txt:(!data.WeiTuoMaiRuLiang5)?'--':data.WeiTuoMaiRuLiang5/100,
                LiuTongAGu: (!data.LiuTongAGu)?'--':this.fmtNum(data.LiuTongAGu*10000),
                ZongGuBen: (!data.ZongGuBen)?'--':this.fmtNum(data.ZongGuBen*10000),
                WeiBi:(!data.WeiBi)?'--':data.WeiBi,
                JunJia:(!data.JunJia)?'--':data.JunJia,
                ShiJingLv: (!data.ShiJingLv)?'--':(data.ShiJingLv).toFixed(2),
                ZhenFu:(!data.ZhenFu)?'--':data.ZhenFu,
                LiangBi:(!data.LiangBi)?'--':data.LiangBi,
                XianShou:(!data.XianShou)?'--':(data.XianShou/1000000).toFixed(2),
            });
        },
        // 加载指数 相关 动态行情 数据
        loadZsDyanData(code){
            let _block = '';
            let self = this;

            if (code == 'SH000001') {
                _block = '市场/沪深市场/上证A股';
            } else if(code == 'SZ399001') {
                _block = '市场/沪深市场/深证A股';
            } else if(code == 'SZ399006') {
                _block = '市场/沪深市场/创业板';
            }

            let params = {
                    gql:'block=' + _block,
                    field: 'LiuTongShiZhi,ZongShiZhi',
            };
            self.zsDynaData='';

            self.zsHqD = self.YunDzhObj.query("/blockstat",params,res=>{
                                let _res = res[0];
                                _res.LiuTongShiZhi = self.fmtNum(_res.LiuTongShiZhi*10000);
                                _res.ZongShiZhi = self.fmtNum(_res.ZongShiZhi*10000);

                                self.zsDynaData = _res;
                            });
        },
        // 加载动态行情
        loadDyanData() {
            let self = this;
            let _params = {
                    obj: self.code,
                    field: 'XianShou,ZuoShou,ChengJiaoE,ShiJingLv,LiuTongShiZhi,NeiPan,WaiPan,JunJia,JingTaiShiYingLv,ShiYingLv,ZongGuBen,LiuTongAGu,WeiBi,ZhenFu,ZhangTing,DieTing,ZuiXinJia,ZhongWenJianCheng,ZhangDie,ZhangFu,ShiJian,KaiPanJia,ZuoShou,ZuiGaoJia,ZuiDiJia,ChengJiaoLiang,HuanShou,ShiYingLv,LiangBi,ZongShiZhi,WeiTuoMaiRuJia1,WeiTuoMaiRuJia2,WeiTuoMaiRuJia3,WeiTuoMaiRuJia4,WeiTuoMaiRuJia5,WeiTuoMaiRuLiang1,WeiTuoMaiRuLiang2,WeiTuoMaiRuLiang3,WeiTuoMaiRuLiang4,WeiTuoMaiRuLiang5,WeiTuoMaiChuJia1,WeiTuoMaiChuJia2,WeiTuoMaiChuJia3,WeiTuoMaiChuJia4,WeiTuoMaiChuJia5,WeiTuoMaiChuLiang1,WeiTuoMaiChuLiang2,WeiTuoMaiChuLiang3,WeiTuoMaiChuLiang4,WeiTuoMaiChuLiang5',
                    mode:2
                };

            self.subHqD = self.YunDzhObj.subscribe('/stkdata',_params,(data)=>{
                self.dynaData = self.formatDyanData(data[0]);
                console.log(self.dynaData);
                wx.setNavigationBarTitle({
                    title: `${self.dynaData.ZhongWenJianCheng} - ${self.dynaData.Obj.substr(2)}`,
                });
            });
        },
        loadFenbiData(){
            let self = this;
            let _params = {
                    obj: self.code,
                    field: 'ShiJian,ChengJiaoJia,DanCiChengJiaoLiang,MaiMaiFangXiang',
                    start: -12
                };

            self.subHqD = self.YunDzhObj.subscribe('/quote/tick',_params,(data)=>{
                let _res = [];

                if(data[0].hasOwnProperty('Data') && Array.isArray(data[0].Data)){
                    _res = data[0].Data;
                }

                _res.forEach((eachObj)=>{
                    eachObj.DanCiChengJiaoLiang = eachObj.DanCiChengJiaoLiang/100;
                    eachObj.ShiJian = (new Date(eachObj.ShiJian*1000)).toString().substr(16,5);
                });

                if (self.fenbiList.length + _res.length <= 12) {
                    self.fenbiList = [...self.fenbiList,..._res];
                } else {
                    self.fenbiList.shift(); //分笔
                    self.fenbiList = [...self.fenbiList,..._res];
                }

            });

        },
        //加载走时图
        loadChart() {
            let self = this;

            // 请求系统信息，得到宽高
            wx.getSystemInfo({
              success: (systemInfo) => {
                self.chartDataProvider = new DataProvider({obj:self.code , prefix:0});
                const chartWidth = systemInfo.windowWidth;
                const chartHeight = systemInfo.windowHeight - 210;

                const pixelRadio = systemInfo.pixelRatio;
                //股票类的图像大小
                self.chartWidth = chartWidth*0.66;
                self.chartHeight = self.chartWidth*1.23;
                //指数类的图像大小
                self.chartWidth2 = chartWidth;
                self.chartHeight2 = self.chartWidth*0.8;

                if(self.period!='min') {    //k的时候隐藏 分时成交
                    self.chartWidth=chartWidth;
                }

                if (self.IsAstock) {
                    self.canvas[self.chartType] = new Canvas({
                      pixelRadio,
                      canvasId: 1,
                      width: self.chartWidth,
                      height: self.chartHeight,
                    });
                } else {
                    self.canvas[self.chartType] = new Canvas({
                      pixelRadio,
                      canvasId: 2,
                      width: self.chartWidth2,
                      height: self.chartHeight,
                    });
                }

                self.showChart();
              },
            });
        },
        showChart() {
            let currentChart;

            if (this.chartType === 'min') {
              //currentChart = this.minChart = this.minChart || new MinChart(this.chartDataProvider);
              currentChart = new MinChart(this.chartDataProvider,{"IsAstock":this.IsAstock,"upColor":"#fe6b6d","downColor":"#67b883","stock":this.code});
            } else {
              const klineChartName = `klineChart${this.period}`;
              //currentChart = this[klineChartName] = this[klineChartName] || new KlineChart(this.chartDataProvider, { period: this.period });
              currentChart = new KlineChart(this.chartDataProvider, { period: this.period ,"stock":this.code});

            }

            console.log('currentChart',currentChart);
            this.canvas[this.chartType].show(currentChart);

        },
        cancel() {
            this.IsAstock = false;
            this.pankou = false;
            this.canvas = {};
            this.chartType = 'min';
            this.period = 'min';
            this.subHqD.cancel();
            this.chartDataProvider.cancel();
            this.removeListener();
            this.stockNewsList = [];
            this.subHqD.cancel();
            this.fenbiList=[];
            this.zsHqd && this.zsHqd.cancel();
        },
        stocknews(start=1) {
            let self = this;
            let obj = self.code;
            let jsonurl = "";
            //https://mnews.gw.com.cn/wap/data/ipad/stock/SH/05/600005/list/1.json
            if (obj.substr(0,2) == 'NY' || obj.substr(0,2) == 'NS') {
                 jsonurl = 'https://mnews.gw.com.cn/wap/data/ipad/stock/'+ obj.substring(0, 2) + "/" + obj + "/list/" + start + ".json";
            } else {
                 jsonurl = 'https://mnews.gw.com.cn/wap/data/ipad/stock/'+ obj.substr(0,2) + '/' + obj.substr(-2) + '/' + obj.substr(2) + '/list/'+start+'.json';
            }

            console.log(jsonurl);
            wx.request({url: jsonurl,
                        data:{},
                        header: {'content-type':'application/json'},
                        success: function(res) {
                           if (typeof res.data != 'string') {
                            let _resNewsList = self.fmtData(res.data[0].data);

                            _resNewsList.forEach((d)=>{
                                if (d.url.substr(0,5) != 'https') {
                                    d.url = 'https' + d.url.substr(4);
                                }
                            });

                            self.stockNewsList = [...self.stockNewsList,..._resNewsList];
                           }
                        },
                        fail: (error)=>{console.log(error)}
                    });
        },
        lower(){
            if (this.newsCurPage > 4) {
                return 0;
            } else {
                this.newsCurPage++;
            }

            this.stocknews(this.newsCurPage);
        },
        fmtData(paraList) { //格式化时间
            paraList.forEach((eachObj)=>eachObj.shortTime = eachObj.otime.substr(14));
            return paraList;
        }
    },
    onHide(){
        console.log('i am onHide...');
    },
    onUnload() {
        this.cancel();
        console.log('i am onUnload...');
    },
    onShareAppMessage() {
        const code = this.code;
        const dynaData = this.dynaData;
        return {
          title: `${dynaData.ZhongWenJianCheng} - ${dynaData.Obj.substr(2)}`,
          desc: `最新价:${dynaData.ZuiXinJia} 涨跌幅:${dynaData.ZhangFu}`,
          path: `/pages/stock/main?code=${code}`,
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
    .fl{float: left;}
    .fr{float: right;}

    /* 0.5顶边 */
    .news:before{
        content: '';position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: -webkit-linear-gradient(top, #e5e5e5 60%, transparent 60%) no-repeat left top;background: linear-gradient(top, #e5e5e5 60%, transparent 60%) no-repeat left top;-webkit-background-size: 100% 1px;background-size: 100% 1px;z-index: -1;
    }
    /* 0.5底边 */
    .history-list li:after,.news-tit:after,.main:before{
        content: '';position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: -webkit-linear-gradient(bottom, #e5e5e5 60%, transparent 60%) no-repeat left bottom;background: linear-gradient(bottom, #e5e5e5 60%, transparent 60%) no-repeat left bottom;-webkit-background-size: 100% 1px;background-size: 100% 1px;z-index: -1;
    }
    .news-list .item:after{
        content: '';position: absolute;left: 10px;top: 0;right:10px;height: 100%;background: -webkit-linear-gradient(bottom, #e5e5e5 60%, transparent 60%) no-repeat left bottom;background: linear-gradient(bottom, #e5e5e5 60%, transparent 60%) no-repeat left bottom;-webkit-background-size: 100% 1px;background-size: 100% 1px;z-index: -1;
    }
    
    .mb10:after{content:'';position: absolute;left:0;right:0;bottom:-10px;background:#f3f3f7;height: 10px;}
    .header{padding: 10px 16px 13px;position: relative;/* overflow:hidden; */height: 65px;z-index: 100;}
    .header-index{width: 40%;float: left;font-weight: bold;}
    .header-info{width: 19%;font-size: 12px;float:right;}
    .header-index > span{font-size: 40px;}
    .header-index > p{font-size: 17px;margin-top: 6px;}
    .header-index > p span:first-child{margin-right: 10px;}
    .header-info:nth-of-type(2){margin-right: 10px;}
    .header-info p:nth-of-type(odd){color: #777;margin: 4px 0 3px;}
    .header-info p:nth-of-type(even){color: #000;}
    .header-info p:nth-of-type(2){margin-bottom: 7px;}
    .header-btn{position: absolute;right:17px;top:21px;font-size: 12px;color:#3267c7;width:15px;height:36px;border:1px solid #3267c7;border-radius: 2px;text-align: center;padding-top: 4px;z-index: 3;}
    .header-btn:after{content:'';position: absolute;bottom:5px;left:50%;width:5px;height:5px;border-left: 1px solid #3267c7;border-bottom: 1px solid #3267c7;-webkit-transform:translate(-50%,0) rotate(-45deg);-ms-transform:translate(-50%,0) rotate(-45deg);transform:translate(-50%,0) rotate(-45deg);}
    .header-btn.up:after{-webkit-transform:translate(-50%,0) rotate(-225deg);-ms-transform:translate(-50%,0) rotate(-225deg);transform:translate(-50%,0) rotate(-225deg);bottom:2px;}
    .nav{background: #f0f4fc;height: 35px;padding: 0 15px;}
    .nav span{font-size:14px;color:#666;line-height: 35px;float: left;text-align: center;font-weight: 700;}
    .nav span.cur,.main-r-tab span.cur{color:#3e6ac5;position: relative;}
    .nav-tab4 span{width: 25%;}
    .nav span.cur:after{content:'';position: absolute;bottom:0;left:13px;right: 13px;height: 2px;background:#3e6ac5;}
    .main-r-tab span.cur:after{content:'';position: absolute;bottom:0;left:13px;right: 13px;height: 1px;background:#3e6ac5;}
    .main{/*border-bottom: 1px solid #e5e5e5; overflow:hidden; */position: relative;/* margin-bottom: 10px; */}
    .main-l{float: left;width:66%;border-right:1px solid #e5e5e5;-webkit-box-sizing: border-box;box-sizing: border-box;}
    .main-r{margin-left: 66%;height: 305px;position: relative;}
    .main-r-content{height: 100%;-webkit-box-sizing: border-box;box-sizing: border-box;padding-bottom: 22px;}
    .r-trade{height: 100%;}
    .main-r-tab{position: absolute;right: 0;left: 0;bottom: 0;height:22px;text-align: center;background: #f0f4fc;}
    .main-r-tab span{font-size:12px;color:#0e0d0b;line-height:22px;width: 50%;float: left;}
    .canvas{width: 100%;}
    .canvas-line{height:202px;}
    .canvas-bar{height: 102px;}
    .canvas-line,.flevel-sell{border-bottom: 1px solid #e5e5e5;box-sizing: border-box;-webkit-box-sizing: border-box;}
    .flevel{height: 50%;}
    .flevel p{padding: 0 10px 0 9px;height: 20%;display: table;width: 100%;box-sizing: border-box;-webkit-box-sizing: border-box;}
    .r-trade p{padding: 0 10px 0 9px;height: 8.33%;display: table;width: 100%;box-sizing: border-box;-webkit-box-sizing: border-box;}
    .flevel p span,.r-trade p span{display: inline-block;font-size: 11px;width: 33%;display: table-cell;vertical-align: middle;}
    .flevel p span:nth-of-type(1),.r-trade p span:nth-of-type(1){width: 34%;}
    .flevel p span:nth-of-type(2),.r-trade p span:nth-of-type(2){padding-left: 2px;}
    .flevel p span:nth-of-type(3),.r-trade p span:nth-of-type(3){text-align: right;}
    .news{margin:0 auto;position: relative;z-index: 1;padding-bottom: 50px;}
    .news-tit{line-height: 36px;font-size: 15px;padding: 0 15px;position: relative;z-index: 1;color: #333;}
    .news-tit:before{content:'';position: absolute;left:6px;top: 50%;width:3px;height:14px;background:#5d85ea;border-radius: 5px;margin-top: -7px;}
    .news-list{}
    .news-list .item{padding: 12px 15px 10px;position: relative;z-index: 1;}
    .news-list .item h3{font-size: 16px;color: #333;line-height: 1.4;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp:2; -webkit-box-orient:vertical;}
    .news-list .item p{font-size:12px;color:#666;margin-top:10px;height:12px;}
    .footer{position: fixed;bottom:0;left: 0;right: 0;z-index:5;}
    .ft-btn{line-height:49px;background:#5f87e7;font-size:18px;text-align: center;color: #fff;display: block;}
    .ft-btn i{display: inline-block;vertical-align:-4px;margin-right: 8px;width: 16px;height: 16px;border-radius: 50%;border:2px solid #fff;position: relative;}
    .ft-btn i:before,.ft-btn i:after{content: '';position: absolute;left: 50%;top: 50%;background: #fff;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);}
    .ft-btn i:before{width: 2px;height: 7px;}
    .ft-btn i:after{width: 7px;height: 2px;}
    .ft-btn-minus{background: #aeccf4;}
    .ft-btn-minus i:before{content: none;}
    .header-info-more{position: fixed;left: 0;right: 0;top: 83px;bottom:0;background: rgba(0,0,0,.5);z-index:100;/* -webkit-transform:translate(0,-200%);-ms-transform:translate(0,-200%);transform:translate(0,-200%);-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s; */}
    /* .header-info-more.flyIn{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0);} */
    .header-info-more-w{background: #fff;overflow:hidden;}
    .more-block{padding:5px 16px;-webkit-box-sizing: border-box;box-sizing: border-box;float: left;width: 50%;}
    .more-block li{font-size: 14px;color: #333;line-height: 25px;}
    .more-block li span{float:right;}
    .pop-alert{position: fixed;top: 50%;left: 50%;background: rgba(0, 0, 0, 0.7);font-size: 15px;padding:10px 15px;color: #fff;border-radius: 3px;z-index: 10;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);}
    .load-more{text-align: center;line-height: 50px;font-size: 14px;color: #666;}
    .blank{background: #fff;font-size:15px;color: #898e99;text-align: center;padding:80px 0;}
</style>
