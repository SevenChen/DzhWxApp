import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/news/main','pages/hq/main','^pages/dzh/main','pages/search/main','pages/index/main','pages/ohqmore/ohqmore'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '大智慧行情',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#666666',
      selectedColor: '#000000',
      borderStyle: 'white',
      backgroundColor: '#f8f9fb',
      list: [
        {
          text: '自选',
          pagePath: 'pages/dzh/main',
          iconPath: 'static/images/icon_my.png',
          selectedIconPath: 'static/images/icon_my2.png'
        },
        {
          text: '行情',
          pagePath: 'pages/hq/main',
          iconPath: 'static/images/icon_market.png',
          selectedIconPath: 'static/images/icon_market2.png'
        },
        {
          text: '资讯',
          pagePath: 'pages/news/main',
          iconPath: 'static/images/icon_news.png',
          selectedIconPath: 'static/images/icon_news2.png'
        }
        /*,
        {
          text: '测试',
          pagePath: 'pages/index/main',
          iconPath: 'static/images/icon_news.png',
          selectedIconPath: 'static/images/icon_news2.png'
        }*/
      ]
    }
  }

};
