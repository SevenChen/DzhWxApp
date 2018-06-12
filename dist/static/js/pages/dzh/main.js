global.webpackJsonp([7],{

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_483fb6e8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(331);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(290)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_483fb6e8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/dzh/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-483fb6e8", Component.options)
  } else {
    hotAPI.reload("data-v-483fb6e8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(145);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    navigationBarTitleText: '大智慧行情'
  }
});

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_set__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_util_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_stockManager__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__store_index_js__ = __webpack_require__(18);




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
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            YunDzhObj: '', //云平台行情源对象
            subHqD: '', //订阅行情数据对象
            shzs: '', //上证指数
            szzs: '', //深圳指数
            cyzs: '', //创业板指数
            selfstock: [], //自选股
            selfstockHqD: [], //自选股hq
            fromApp: false, //是否app打开
            orderby: '', //自选股排序字段
            desc: '' //true 倒序，false 顺序
        };
    },
    onLoad: function onLoad() {
        this.YunDzhObj = __WEBPACK_IMPORTED_MODULE_6__store_index_js__["a" /* default */].state.wsobj;
    },
    onShow: function onShow() {
        var self = this;

        self.querySelfStock().then(function () {
            self.subDyna(); //订阅行情
        });

        //判断是否app打开
        wx.getStorage({
            key: 'wx.scene',
            success: function success(res) {
                if (res.data == 1036 || res.data == 1089 || res.data == 1090) {
                    self.fromApp = true;
                } else {
                    self.fromApp = false;
                }
            }
        });
    },

    computed: {
        isExitSelf: function isExitSelf() {
            //是否有自选股
            return this.selfstock.length > 0 ? true : false;
        }
    },
    methods: {
        querySelfStock: function querySelfStock() {
            var _this = this;

            return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee() {
                return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return __WEBPACK_IMPORTED_MODULE_5__utils_stockManager__["a" /* default */].getPortfolioList();

                            case 2:
                                _this.selfstock = _context.sent;

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }))();
        },
        hqOrderBy: function hqOrderBy(field) {
            //排序
            this.cancelSub(); //先取消订阅
            this.orderby = field;

            if (field != this.orderby) {
                this.desc = true;
            } else {
                this.desc = !this.desc;
            }
            //再订阅
            this.subDyna(this.orderby, this.desc);
        },
        subDyna: function subDyna() {
            var orderby = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var desc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            //订阅数据
            var self = this;
            var allstock = [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_set___default.a(['SH000001', 'SZ399006', 'SZ399001'].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(self.selfstock))))); //自选股去重

            var sortParams = {
                obj: allstock,
                field: 'ZhongWenJianCheng,ZuiXinJia,ZhangFu,ZhangDie',
                mode: 2,
                orderby: orderby,
                desc: desc
            };

            self.subHqD = self.YunDzhObj.subscribe('/stkdata', sortParams, function (HqData) {
                self.PageHqData(HqData);
            });
        },
        launchAppError: function launchAppError() {
            //打开app失败
            console.log(12);
        },
        PageHqData: function PageHqData(HqData) {
            //页面行情源绑定
            var self = this;
            var latestHq = [];

            HqData.forEach(function (hq) {
                if (hq.Obj == 'SH000001') {
                    self.shzs = self.FmtHqData(hq);
                    //自选股如果有指数，就显示到自选股区域
                    if (self.selfstock.includes('SH000001')) {
                        latestHq.push(self.FmtHqData(hq));
                    }
                } else if (hq.Obj == 'SZ399001') {
                    self.szzs = self.FmtHqData(hq);

                    if (self.selfstock.includes('SZ399001')) {
                        latestHq.push(self.FmtHqData(hq));
                    }
                } else if (hq.Obj == 'SZ399006') {
                    self.cyzs = self.FmtHqData(hq);

                    if (self.selfstock.includes('SZ399006')) {
                        latestHq.push(self.FmtHqData(hq));
                    }
                } else {
                    latestHq.push(self.FmtHqData(hq));
                }
            });
            self.selfstockHqD = latestHq;
        },
        FmtHqData: function FmtHqData(eachObj) {
            //格式化行情数据
            if (eachObj.ZuiXinJia == null) {
                eachObj.ZuiXinJiaTxt = '--';
                eachObj.ZhangFuTxt = '--';
            } else {
                eachObj.ZuiXinJiaTxt = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_util_js__["b" /* formatNumber */])(eachObj.ZuiXinJia);
                eachObj.ZhangFuTxt = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_util_js__["b" /* formatNumber */])(eachObj.ZhangFu / 100, 2, '%');
            }
            return eachObj;
        },
        cancelSub: function cancelSub() {
            //取消订阅
            if (this.subHqD) {
                this.subHqD.cancel();
            }
        }
    },
    onHide: function onHide() {
        console.log('wx---onHide');
        this.cancelSub();
    },
    onUnload: function onUnload() {
        console.log('wx---onUnload');
        this.cancelSub();
    },
    launchAppError: function launchAppError() {
        console.log('打开APP查看-挂了');
    },
    onShareAppMessage: function onShareAppMessage() {
        return {
            title: '大智慧行情',
            desc: '股票实时数据展示',
            path: '/pages/dzh/main'
        };
    }
});

/***/ }),

/***/ 290:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('header', {
    staticClass: "header flex header-blue"
  }, [_c('a', {
    staticClass: "space",
    class: {
      'mod-red': _vm.shzs.ZhangFu > 0, 'mod-green': _vm.shzs.ZhangFu < 0, 'mod-gray': _vm.shzs.ZhangFu == 0
    },
    attrs: {
      "href": "/pages/stock/main?code=SH000001"
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.shzs.ZuiXinJiaTxt))]), _vm._v(" "), _c('p', [_vm._v("上证 "), _c('span', {
    class: {
      'font-red': _vm.shzs.ZhangFu > 0, 'font-green': _vm.shzs.ZhangFu < 0, 'font-gray': _vm.shzs.ZhangFu == 0
    }
  }, [_vm._v(_vm._s(_vm.shzs.ZhangFuTxt))])])], 1), _vm._v(" "), _c('a', {
    staticClass: "space",
    class: {
      'mod-red': _vm.szzs.ZhangFu > 0, 'mod-green': _vm.szzs.ZhangFu < 0, 'mod-gray': _vm.szzs.ZhangFu == 0
    },
    attrs: {
      "href": "/pages/stock/main?code=SZ399001"
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.szzs.ZuiXinJiaTxt))]), _vm._v(" "), _c('p', [_vm._v("深证 "), _c('span', {
    class: {
      'font-red': _vm.szzs.ZhangFu > 0, 'font-green': _vm.szzs.ZhangFu < 0, 'font-gray': _vm.szzs.ZhangFu == 0
    }
  }, [_vm._v(_vm._s(_vm.szzs.ZhangFuTxt))])])], 1), _vm._v(" "), _c('a', {
    staticClass: "space",
    class: {
      'mod-red': _vm.cyzs.ZhangFu > 0, 'mod-green': _vm.cyzs.ZhangFu < 0, 'mod-gray': _vm.cyzs.ZhangFu == 0
    },
    attrs: {
      "href": "/pages/stock/main?code=SZ399006"
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.cyzs.ZuiXinJiaTxt))]), _vm._v(" "), _c('p', [_vm._v("创业 "), _c('span', {
    class: {
      'font-red': _vm.cyzs.ZhangFu > 0, 'font-green': _vm.cyzs.ZhangFu < 0, 'font-gray': _vm.cyzs.ZhangFu == 0
    }
  }, [_vm._v(_vm._s(_vm.cyzs.ZhangFuTxt))])])], 1)]), _vm._v(" "), _c('main', {
    staticClass: "main"
  }, [_c('section', {
    staticClass: "sch"
  }, [_c('a', {
    attrs: {
      "href": "/pages/search/main"
    }
  }, [_c('img', {
    attrs: {
      "src": "/static/images/icon_search.png",
      "alt": ""
    }
  }), _vm._v("输入股票代码/首字母")])]), _vm._v(" "), _c('article', {
    staticClass: "stock-selected"
  }, [(!_vm.isExitSelf) ? _c('div', {
    staticClass: "selected-blank"
  }, [_c('a', {
    attrs: {
      "href": "/pages/search/main"
    }
  }, [_vm._v("+")]), _c('p', [_vm._v("添加自选股")])], 1) : _c('div', {
    staticClass: "stock-list"
  }, [_c('div', {
    staticClass: "stock-list-hd"
  }, [_c('span', [_vm._v("名称")]), _c('span', {
    attrs: {
      "eventid": '0'
    },
    on: {
      "tap": function($event) {
        _vm.hqOrderBy('ZuiXinJia')
      }
    }
  }, [_vm._v("最新")]), _c('span', {
    attrs: {
      "eventid": '1'
    },
    on: {
      "tap": function($event) {
        _vm.hqOrderBy('ZhangFu')
      }
    }
  }, [_vm._v("涨跌幅")])]), _vm._v(" "), _c('ul', {
    staticClass: "stock-list-bd"
  }, _vm._l((_vm.selfstockHqD), function(stock, index) {
    return _c('li', {
      key: index
    }, [_c('a', {
      attrs: {
        "href": '/pages/stock/main?code=' + stock.Obj
      }
    }, [_c('div', [_vm._v(_vm._s(stock.ZhongWenJianCheng)), _c('small', [_vm._v(_vm._s(stock.Obj))])], 1), _vm._v(" "), _c('div', [_vm._v(_vm._s(stock.ZuiXinJiaTxt))]), _vm._v(" "), _c('div', [_c('span', {
      class: {
        'block-red': stock.ZhangFu > 0, 'block-green': stock.ZhangFu < 0, 'block-gray': (stock.ZhangFu == 0 || stock.ZhangFu == null)
      }
    }, [_vm._v(_vm._s(stock.ZhangFuTxt))])])])])
  }))], 1)])], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-483fb6e8", esExports)
  }
}

/***/ })

},[173]);
//# sourceMappingURL=main.js.map