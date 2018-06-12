<template>
	<div>
		<main class="detail">
	        <h1>{{title}}</h1>
	        <p class="info">来源：<span>{{source}}</span><span>{{time}}</span></p>
            <div class="text">
	        	<wxParse  :content="content" @navigate="navHandler"></wxParse>
	        </div>
            <aside v-show="fromApp" class="side-bar" :class="{'foldUp':isFoldUp}" >
                <button open-type="launchApp" :app-parameter="'dzh_browser_url&goto=0&screen=232&id='+id+'&resource='+source+'&title='+title+'&url='+jsonurl" @error="launchAppError" class="right-bar right-bar1">打开APP</button>
                <button app-parameter="" class="right-bar right-bar2" @tap='gohome'>去首页</button>
                <span class="side-bar-icon" @tap="chgFoldUp"></span>
            </aside>
	    </main>

	</div>
</template>
<script>
import wxParse from 'mpvue-wxparse';
export default {
	data(){
        return {
        	jsonurl:'',				//jsonUrl
            title:'',               //页面标题
            source:'',				//source
            time:'',				//时间
            content:'内容加载中...',
            fromApp:false,          //是否app打开
            isFoldUp:false,
            id:'',
        }
    },
    components: {
        wxParse,
    },
    methods: {
        navHandler (url) {
            if (url.substr(0,4) == '@min') {    //分时 跳转到分时页面
                wx.navigateTo({
                   url: '/pages/stock/main?code='+url.substr(5)
                });
            } else if( ['pdf','docx','xlsx','pptx','doc','xls','ppt'].includes(url.substr(-3)) ){ //文档，打开文档
                console.log('https' + url.substr(4));
                wx.downloadFile({
                    url:'https' + url.substr(4),
                    success:(res)=>{
                        wx.openDocument({
                            filePath:res.tempFilePath,
                            success:(d)=>console.log('打开成功'),
                            fail:(d)=>console.log(d),
                            complete:(d)=>console.log(d)
                        })
                    },
                    fail:(e)=>console.log(e)
                });
            }
        },
        chgFoldUp(){
            this.isFoldUp = !this.isFoldUp;
        },
        gohome(){
            wx.switchTab({
              url: '/pages/dzh/main'
            })
        },
        launchAppError(e){
            wx.showModal({
                title: '小帖士',
                content: '请前往APP商城下载大智慧  为您提供更专业的服务',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }else{
                       console.log('用户点击取消')
                    }
                }
            })
        },
	},
	mounted(){
		let self = this;

		self.jsonurl = this.$root.$mp.query.jsonurl;
		
		wx.request({url:self.jsonurl,
                        data:{},
                        header: {'content-type':'application/json'},
                        success: function(res) {
                        	let _res = res.data[0];
                            self.id = res.id;
                        	self.title = _res.title;
                        	self.source= _res.source;
                        	self.time= _res.otime;
                        	self.content = (_res.content);
                            //self.content = "<a href='@min=SZ002610' style='color:#2c8ce7;'> 爱康科技</a>（002610）";
                        }
        			});
        this.$on('navigate',function(e){console.log(123)});
	},
    onShow(){
        let self = this;

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
    onShareAppMessage() {
        const title = this.title;
        const jsonurl = this.jsonurl;

        return {
          title: `${title}`,
          desc: '大智慧资讯实时展示',
          path: `/pages/newsdetail/main?jsonurl=${jsonurl}`,
        };
    }
}
</script>
<style>
@import url("~mpvue-wxparse/src/wxParse.css");
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
    
    /* 0.5四边 */
    .tag:after{content:'';position: absolute;left:0;top:0;z-index: -1;width: 200%;height: 200%;border:1px solid #fa1635;border-radius: 8px;transform:scale(0.5);transform-origin: left top;box-sizing: border-box;-webkit-box-sizing: border-box;}
    .stocks span:after{content:'';position: absolute;left:0;top:0;z-index: -1;width: 200%;height: 200%;border:1px solid #8e9ab7;border-radius:50px;transform:scale(0.5);transform-origin: left top;box-sizing: border-box;-webkit-box-sizing: border-box;}
    /* 0.5左边 */
    .comments:before{
        content: '';position: absolute;left: 0;top: 10%;width: 100%;height: 80%;background: -webkit-linear-gradient(left, #d1d6e0 60%, transparent 60%) no-repeat left top;background: linear-gradient(left, #d1d6e0 60%, transparent 60%) no-repeat left top;-webkit-background-size: 1px 100%;background-size: 1px 100%;z-index: -1;
    }

    .detail{padding:20px 15px;}
    .detail h1{font-size:22px;line-height: 1.3;}
    .detail .info{font-size:12px;color: #808080;margin:15px 0 0;}
    .detail .info span{margin-right: 10px;}
    .detail .text{margin-top: 30px;font-size: 17px;line-height: 1.5;}
    .detail .text img{display: block;width: 100%;}
    .detail .text p{margin-bottom: 15px;line-height: 1.5;word-wrap: break-word;word-break: break-all;text-align: justify;}
    .detail .text p a{color:#2c8ce7;text-decoration: underline;}
    .side-bar{position: fixed;right:0;bottom:0;z-index: 10;}
    .right-bar{position:absolute;right:10px;background: -webkit-linear-gradient(top, #396afc 0%, #2948ff 100%) no-repeat 0 0;background: linear-gradient(top, #396afc 6%, #2948ff 100%) no-repeat 0 0;color:#fff;font-size:13px;width: 50px;height: 50px;border-radius:50%;text-align: center;line-height: 1.2;-webkit-transition:bottom .2s;-o-transition:bottom .2s;transition:bottom .2s;-webkit-box-sizing: border-box;box-sizing: border-box;}
    .right-bar1{bottom:190px;padding-top: 10px;}
    .right-bar2{bottom:130px;line-height: 50px;}
    .side-bar-icon{position: absolute;bottom:90px;right: 21px;width: 28px;height: 28px;background: #fff;box-shadow: 0 0 10px #396afc;border-radius: 50%;}
    .side-bar-icon:after{content:'';position: absolute;top: 45%;left: 50%;width:10px;height:10px;border-left:2px solid #2948ff;border-bottom: 2px solid #2948ff;-webkit-transform:translate(-50%,-50%) rotate(-45deg);-ms-transform:translate(-50%,-50%) rotate(-45deg);transform:translate(-50%,-50%) rotate(-45deg);border-radius:0 0 0 3px;}
    .side-bar.foldUp .right-bar{bottom:80px;}
    .side-bar.foldUp .side-bar-icon{width: 30px;height: 30px;bottom:80px;right: 10px;padding:10px;}
    .side-bar.foldUp .side-bar-icon:after{content:'快捷导航';position: static;border:0;color:#2948ff;width: auto;height: auto;font-size: 13px;padding-top: 1px;line-height: 1.2;text-align: center;display: block;-webkit-transform:inherit;-ms-transform:inherit;transform:inherit;}
</style>
