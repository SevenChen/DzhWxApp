<template>
<div>
    <header class="sch sch-fixTop">
        <div class="flex"><img src="/static/images/icon_search.png" alt=""><input type="text" placeholder="输入股票代码/首字母" class="space" v-model:value="stockkey"></div>
    </header>
    <section class="sch-history">
        <h2 class="history-tit">搜索结果</h2>
        <ul class="history-list">
            <li v-for="(stock,index) in resList" :key="index">
                <a :href="'/pages/stock/main?code='+stock.DaiMa">
                    <b class="stock-tag">{{stock.Market}}</b>
                    <span class="stock-code">{{stock.Code}}</span>
                    <span class="stock-name" :class="{'xl':!stock.isAddPro}" >{{stock.MingCheng}}</span>
                </a>
                <span v-if="stock.isAddPro" class="operate-btn btn-minus" @tap='delPro(stock.DaiMa)'>已加入</span>
                <span v-else class="operate-btn btn-add" @tap='addPro(stock.DaiMa)'></span>
            </li>
        </ul>
    </section>
</body>
</div>
</template>
<script>
import {Dzhyun, formatNumber, formatDate, noop , yunToken} from '@/utils/util.js'
import stockManager from '@/utils/stockManager.js'
import store from '@/store/index.js'

export default {
    data(){
        return {
            YunDzhObj:'',           //云平台行情源对象
            resList:[],             //键盘宝
            stockkey:'',             //
            myStock:[]             //我的自选股列表
        }
    },
    onLoad(){
        let self = this;

        this.YunDzhObj = store.state.wsobj;

        stockManager.onPortfolioChanged((obj) => {  //自选股变化时，重新绑定搜索结果
            self.myStock = obj;
            self.searchStock(self.stockkey);
        });
    },
    onShow(){
        let self = this;
        stockManager.getPortfolioList().then((d)=>{
            self.myStock = d
        })
    },
    onUnload(){
        this.stockkey = '';
        this.resList=[];
    },
    onShareAppMessage() {
        return {
          title: '大智慧行情',
          desc: '大智慧股票实时数据展示',
          path: '/pages/search/main',
        };
    },
    methods: {
        searchStock(key) {   //查询之选新闻
            let self = this;
            this.YunDzhObj.query("/kbspirit",{'input':key,type:0,market:'SH,SZ,HK,NY,NS',vartype:'0,1'},(resStockList)=>{
                let _resStockList = [];

                if( resStockList[0].JieGuo ) {
                    _resStockList = resStockList[0].JieGuo[0].ShuJu;
                } else {
                    _resStockList = [];
                }
                
                _resStockList.forEach((eachObj)=>{
                    eachObj.Market=eachObj.DaiMa.substr(0,2);
                    eachObj.Code = eachObj.DaiMa.substr(2);
                    eachObj.isAddPro = self.myStock.includes(eachObj.DaiMa);
                });

                self.resList = _resStockList;
            });
        },
        delPro(stock) { //删自选
           stockManager.removePortfolio(stock);
        },
        addPro(stock) { //加自选
            stockManager.addPortfolio(stock);
        }
    },
    watch:{
        stockkey(curVal,oldVal){
            if (curVal !='' ) {
                this.searchStock(curVal);
            }

            console.log(this.resList);
　　　　 }
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

    /* 0.5底边 */
    .history-list li:after{
        content: '';position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: -webkit-linear-gradient(bottom, #e5e5e5 60%, transparent 60%) no-repeat left bottom;background: linear-gradient(bottom, #e5e5e5 60%, transparent 60%) no-repeat left bottom;-webkit-background-size: 100% 1px;background-size: 100% 1px;z-index: -1;
    }
    
    .sch{padding: 8px 16px;}
    .sch-fixTop{position: fixed;top: 0;left: 0;right: 0;background: #fff;z-index: 5;}
    .sch input{font-size:15px;color:#333;display:block;height:23px;padding:5px 10px 5px 0;line-height: 23px;}
    .sch input::-webkit-input-placeholder{color:#9aa5b8;}
    .sch>div{position: relative;}
    .sch>div:after{content:'';position: absolute;left:0;top:0;height:200%;width:200%;border:1px solid #bfbfbf;border-radius: 10px;-webkit-transform:scale(.5);-ms-transform:scale(.5);transform:scale(.5);-webkit-transform-origin: left top;-ms-transform-origin: left top;transform-origin: left top;z-index: -1;}
    .sch img{width: 16px;height: 16px;float: left;margin:8px 8px 0 13px;}
    .sch-history{padding-top: 80px;}
    .history-tit{position: fixed;top: 49px;left: 0;right: 0;background: #f0f0f5;line-height: 30px;font-size: 15px;padding: 0 10px;color:#0631a8;z-index: 5;}
    .history-list{}
    .history-list li{position: relative;z-index: 1;}
    .history-list li a{display: block;padding: 15px 0 15px 87px;color: #333;font-size:17px;height: 26px;line-height: 26px;margin-right: 50px;}
    .history-list li a:active{background: #e5e5e5;}
    .stock-tag{position: absolute;left:10px;top:50%;width: 65px;height: 26px;text-align: center;line-height: 26px;background:#e8e8ee;margin-top:-13px;font-size: 15px;}
    .stock-code,.stock-name{float: left;}
    .stock-code{width: 31%;}
    .stock-name{overflow: hidden;text-overflow: ellipsis;width:55%;white-space: nowrap;}
    .stock-name.xl{width:65%;}
    .operate-btn{position: absolute;right: 0;top: 0;padding:0 15px;height: 100%;font-size: 15px;color:#041ca0;}
    .btn-add{width: 15px;}
    .btn-minus{width: auto;font-size: 13px;line-height:56px;padding-right: 30px;}
    .btn-add:before,.btn-add:after{content:'';position: absolute;background: #041ca0;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);}
    .btn-add:before{width:15px;height: 2px;}
    .btn-add:after{width:2px;height:15px;}
    .btn-minus:after{content:'';position: absolute;background: #041ca0;right:15px;top:50%;-webkit-transform:translate(0,-50%);-ms-transform:translate(0,-50%);transform:translate(0,-50%);width:12px;height: 1px;}
</style>
