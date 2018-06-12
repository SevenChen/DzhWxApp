<template>
<div>
    <main class="main">
        <scroll-view class="news-list" scroll-y='true' :style="{height: windowHeight + 'px'}"  @scrolltolower='lower'>
            <view class="item" v-for="(news,index) in newsList">
                <a :href="'/pages/newsdetail/main?jsonurl='+news.url">
                    <h3 class="news-tit">{{news.title}}</h3>
                    <p>
                        <span v-if=" news.resType!='' " class="tag">{{news.resType}}</span>
                        <span class="time">{{news.shortTime}}</span>
                        <span class="comments">{{news.views}}阅读</span>
                    </p>
                </a>
            </view>

        </scroll-view>
    </main>
</div>
</template>
<script>
import {Dzhyun, formatNumber, formatDate, noop , yunToken} from '@/utils/util.js'
import store from '@/store/index.js'

export default {
    data(){
        return {
            windowHeight:'',         //页面高度
            maxPage:3,               //最多下啦加载页面
            curPage:1,               //当前页面
            newsList:[]
        }
    },
    onLoad(){
        let self = this;
        wx.getSystemInfo({
          success: (res) => {
            self.windowHeight = res.windowHeight;
          }
        })
    },
    onShow(){
        if (this.newsList.length == 0) {
            this.getNewslist();
        }
    },
    methods: {
        getNewslist(start=1) {   //查询之选新闻
            let self = this;
            wx.request({url: 'https://mnews.gw.com.cn/wap/data/news/txs/page_'+start+'.json',
                        data:{},
                        header: {'content-type':'application/json'},
                        success: function(res) {
                            let _resNewsList = self.fmtData(res.data[0].data);
                            
                            _resNewsList.forEach((d)=>{
                                if (d.url.substr(0,5) != 'https') {
                                    d.url = 'https' + d.url.substr(4);
                                }
                            });

                            self.newsList = [...self.newsList,..._resNewsList];
                        }
                    });
        },
        lower() {   //翻页
            if (this.curPage > this.maxPage) {
                return 0;
            } else {
                this.curPage++;
            }
            
            this.getNewslist(this.curPage);
        },
        fmtData(paraList) { //格式化时间
            paraList.forEach((eachObj)=>{
                if (eachObj.otime.substr(8,2) != (new Date()).getDate()) {
                    eachObj.shortTime = eachObj.otime.substr(5,11);
                } else {
                    eachObj.shortTime = eachObj.otime.substr(11,5);
                }
            });
            return paraList;
        }
    },
    mounted(){

    },
    onShareAppMessage() {
        return {
          title: '大智慧资讯',
          desc: '大智慧资讯实时展示',
          path: '/pages/news/main',
        };
    },
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
    .nav:after{
        content: '';position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: -webkit-linear-gradient(bottom, #e5e5e5 60%, transparent 60%) no-repeat left bottom;background: linear-gradient(bottom, #e5e5e5 60%, transparent 60%) no-repeat left bottom;-webkit-background-size: 100% 1px;background-size: 100% 1px;z-index: -1;
    }
    .news-list a:after{
        content: '';position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: -webkit-linear-gradient(bottom, #d9d9d9 60%, transparent 60%) no-repeat left bottom;background: linear-gradient(bottom, #d9d9d9 60%, transparent 60%) no-repeat left bottom;-webkit-background-size: 100% 1px;background-size: 100% 1px;z-index: -1;
    }
    /* 0.5四边 */
    .tag:after{content:'';position: absolute;left:0;top:0;z-index: -1;width: 200%;height: 200%;border:1px solid #fa1635;border-radius: 8px;transform:scale(0.5);transform-origin: left top;box-sizing: border-box;-webkit-box-sizing: border-box;}
    .stocks span:after{content:'';position: absolute;left:0;top:0;z-index: -1;width: 200%;height: 200%;border:1px solid #8e9ab7;border-radius:50px;transform:scale(0.5);transform-origin: left top;box-sizing: border-box;-webkit-box-sizing: border-box;}
    /* 0.5左边 */
    .comments:before{
        content: '';position: absolute;left: 0;top: 10%;width: 100%;height: 80%;background: -webkit-linear-gradient(left, #d1d6e0 60%, transparent 60%) no-repeat left top;background: linear-gradient(left, #d1d6e0 60%, transparent 60%) no-repeat left top;-webkit-background-size: 1px 100%;background-size: 1px 100%;z-index: -1;
    }

    .main{padding-bottom: 52px;}
    .nav{position: fixed;top:0;left: 0;right: 0;background: #fff;z-index: 5;line-height: 35px;}
    .nav span{font-size: 15px;color: #3f557e;display: inline-block;text-align: center;}
    .nav span.cur{color:#3366cc;position: relative;}
    .nav span.cur:after{content:'';position: absolute;left:50%;bottom:0;height:3px;background: #3366cc;border-radius:5px;width: 32px;margin-left: -16px;}
    .banner-swipe{/* margin-top: 35px; */position: relative;height:130px;overflow:hidden;}
    .banner-list{position: relative;width: 2000px;}
    .banner-list li{width:375px;height:130px;position: relative;}
    .banner-list li p{position: absolute;left: 0;right: 0;bottom:0;line-height:25px;background: rgba(40,48,59,0.7);padding: 0 15px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;color: #fff;font-size: 15px;}
    .dot{position: absolute;right:10px;bottom:10px;}
    .dot span{display: inline-block;width:4px;height:4px;border-radius: 50%;background:rgba(255,255,255,0.5);margin:0 2px;}
    .dot span.cur{background: rgba(255, 255, 255, 1.0);}
    .news-list{}
    /* .news-list .item{position: relative;z-index: 1;} */
    .news-list a{display: block;padding:17px 15px;min-height: 75px;position: relative;z-index: 1;}
    .news-list .item a:active{background:#e0e0e0;}
    .news-list .item a img{float: right;width: 114px;height:75px;margin-left: 24px;}
    .news-list .item a>p{position: absolute;left: 15px;right:153px;top:75px;font-size: 12px;color: #b3b3b3;}
    .news-list .item a>p span{margin-right: 10px;}
    .tag{color: #e30000;display: inline-block;padding: 2px 6px;position: relative;z-index: 1;}
    .comments{padding-left: 12px;position: relative;}
    .news-tit{font-size: 17px;color: #333;line-height: 1.4;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp:2; -webkit-box-orient:vertical;/* padding-right: 24px; */}
    .stocks{clear: both;margin-top:45px;text-align: center;height: 18px;}
    .stocks p{float:left;font-size: 12px;color: #666;line-height: 18px;width: 30%;position: relative;z-index: 1;}
    .stocks p:nth-of-type(2){margin:0 5%;}
    .stocks p span{font-size: 10px;}
    .stocks p.stock-red:after{border-color:#dc4434;}
    .stocks p.stock-red span{color:#e30000;}
    .stocks p.stock-green:after{border-color:#3cc02a;}
    .stocks p.stock-green span{color:#4ca92a;}
</style>