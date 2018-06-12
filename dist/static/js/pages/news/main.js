global.webpackJsonp([4],{

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_61a8acaf_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(336);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(295)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_61a8acaf_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/news/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61a8acaf", Component.options)
  } else {
    hotAPI.reload("data-v-61a8acaf", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(148);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    navigationBarTitleText: '大智慧行情'
  }
});

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_util_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_index_js__ = __webpack_require__(18);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            windowHeight: '', //页面高度
            maxPage: 3, //最多下啦加载页面
            curPage: 1, //当前页面
            newsList: []
        };
    },
    onLoad: function onLoad() {
        var self = this;
        wx.getSystemInfo({
            success: function success(res) {
                self.windowHeight = res.windowHeight;
            }
        });
    },
    onShow: function onShow() {
        if (this.newsList.length == 0) {
            this.getNewslist();
        }
    },

    methods: {
        getNewslist: function getNewslist() {
            var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            //查询之选新闻
            var self = this;
            wx.request({ url: 'https://mnews.gw.com.cn/wap/data/news/txs/page_' + start + '.json',
                data: {},
                header: { 'content-type': 'application/json' },
                success: function success(res) {
                    var _resNewsList = self.fmtData(res.data[0].data);

                    _resNewsList.forEach(function (d) {
                        if (d.url.substr(0, 5) != 'https') {
                            d.url = 'https' + d.url.substr(4);
                        }
                    });

                    self.newsList = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(self.newsList), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(_resNewsList));
                }
            });
        },
        lower: function lower() {
            //翻页
            if (this.curPage > this.maxPage) {
                return 0;
            } else {
                this.curPage++;
            }

            this.getNewslist(this.curPage);
        },
        fmtData: function fmtData(paraList) {
            //格式化时间
            paraList.forEach(function (eachObj) {
                if (eachObj.otime.substr(8, 2) != new Date().getDate()) {
                    eachObj.shortTime = eachObj.otime.substr(5, 11);
                } else {
                    eachObj.shortTime = eachObj.otime.substr(11, 5);
                }
            });
            return paraList;
        }
    },
    mounted: function mounted() {},
    onShareAppMessage: function onShareAppMessage() {
        return {
            title: '大智慧资讯',
            desc: '大智慧资讯实时展示',
            path: '/pages/news/main'
        };
    }
});

/***/ }),

/***/ 295:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('main', {
    staticClass: "main"
  }, [_c('scroll-view', {
    staticClass: "news-list",
    style: ({
      height: _vm.windowHeight + 'px'
    }),
    attrs: {
      "scroll-y": "true",
      "eventid": '0'
    },
    on: {
      "scrolltolower": _vm.lower
    }
  }, _vm._l((_vm.newsList), function(news, index) {
    return _c('view', {
      staticClass: "item"
    }, [_c('a', {
      attrs: {
        "href": '/pages/newsdetail/main?jsonurl=' + news.url
      }
    }, [_c('h3', {
      staticClass: "news-tit"
    }, [_vm._v(_vm._s(news.title))]), _vm._v(" "), _c('p', [(news.resType != '') ? _c('span', {
      staticClass: "tag"
    }, [_vm._v(_vm._s(news.resType))]) : _vm._e(), _vm._v(" "), _c('span', {
      staticClass: "time"
    }, [_vm._v(_vm._s(news.shortTime))]), _vm._v(" "), _c('span', {
      staticClass: "comments"
    }, [_vm._v(_vm._s(news.views) + "阅读")])])], 1)])
  }))], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-61a8acaf", esExports)
  }
}

/***/ })

},[176]);
//# sourceMappingURL=main.js.map