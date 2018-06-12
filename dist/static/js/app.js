global.webpackJsonp([8],{

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(197);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(296)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-658258fa", Component.options)
  } else {
    hotAPI.reload("data-v-658258fa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(144);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */].mpType = 'app';

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/news/main', 'pages/hq/main', '^pages/dzh/main', 'pages/search/main', 'pages/index/main', 'pages/ohqmore/ohqmore'],
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
      list: [{
        text: '自选',
        pagePath: 'pages/dzh/main',
        iconPath: 'static/images/icon_my.png',
        selectedIconPath: 'static/images/icon_my2.png'
      }, {
        text: '行情',
        pagePath: 'pages/hq/main',
        iconPath: 'static/images/icon_market.png',
        selectedIconPath: 'static/images/icon_market2.png'
      }, {
        text: '资讯',
        pagePath: 'pages/news/main',
        iconPath: 'static/images/icon_news.png',
        selectedIconPath: 'static/images/icon_news2.png'
        /*,
        {
          text: '测试',
          pagePath: 'pages/index/main',
          iconPath: 'static/images/icon_news.png',
          selectedIconPath: 'static/images/icon_news2.png'
        }*/
      }]
    }
  }

});

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_index_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_util_js__ = __webpack_require__(19);




/* harmony default export */ __webpack_exports__["a"] = ({
  created: function created() {
    console.log('app created and cache logs by setStorageSync');
    var token = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_util_js__["d" /* yunToken */])().generateToken()._v;

    if (__WEBPACK_IMPORTED_MODULE_0__store_index_js__["a" /* default */].state.wsobj == '') {
      var wsObj = new __WEBPACK_IMPORTED_MODULE_1__utils_util_js__["e" /* Dzhyun */]({
        address: 'wss://gw.yundzh.com/ws',
        dataType: 'json',
        token: token
      });

      __WEBPACK_IMPORTED_MODULE_0__store_index_js__["a" /* default */].commit('getNoVolumeStock', wsObj);
      __WEBPACK_IMPORTED_MODULE_0__store_index_js__["a" /* default */].commit('setws', wsObj);
      __WEBPACK_IMPORTED_MODULE_0__store_index_js__["a" /* default */].commit('settoken', token);
    }
  },
  onShow: function onShow(options) {
    wx.setStorage({
      key: 'wx.scene',
      data: options.scene
    });
  }
});

/***/ }),

/***/ 296:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[172]);
//# sourceMappingURL=app.js.map