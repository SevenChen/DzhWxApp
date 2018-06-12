global.webpackJsonp([3],{

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_4fb02504_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(332);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(291)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_4fb02504_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/search/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4fb02504", Component.options)
  } else {
    hotAPI.reload("data-v-4fb02504", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(150);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    navigationBarTitleText: '大智慧行情'
  }
});

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_util_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_stockManager_js__ = __webpack_require__(65);
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
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            YunDzhObj: '', //云平台行情源对象
            resList: [], //键盘宝
            stockkey: '', //
            myStock: [] //我的自选股列表
        };
    },
    onLoad: function onLoad() {
        var self = this;

        this.YunDzhObj = __WEBPACK_IMPORTED_MODULE_2__store_index_js__["a" /* default */].state.wsobj;

        __WEBPACK_IMPORTED_MODULE_1__utils_stockManager_js__["a" /* default */].onPortfolioChanged(function (obj) {
            //自选股变化时，重新绑定搜索结果
            self.myStock = obj;
            self.searchStock(self.stockkey);
        });
    },
    onShow: function onShow() {
        var self = this;
        __WEBPACK_IMPORTED_MODULE_1__utils_stockManager_js__["a" /* default */].getPortfolioList().then(function (d) {
            self.myStock = d;
        });
    },
    onUnload: function onUnload() {
        this.stockkey = '';
        this.resList = [];
    },
    onShareAppMessage: function onShareAppMessage() {
        return {
            title: '大智慧行情',
            desc: '大智慧股票实时数据展示',
            path: '/pages/search/main'
        };
    },

    methods: {
        searchStock: function searchStock(key) {
            //查询之选新闻
            var self = this;
            this.YunDzhObj.query("/kbspirit", { 'input': key, type: 0, market: 'SH,SZ,HK,NY,NS', vartype: '0,1' }, function (resStockList) {
                var _resStockList = [];

                if (resStockList[0].JieGuo) {
                    _resStockList = resStockList[0].JieGuo[0].ShuJu;
                } else {
                    _resStockList = [];
                }

                _resStockList.forEach(function (eachObj) {
                    eachObj.Market = eachObj.DaiMa.substr(0, 2);
                    eachObj.Code = eachObj.DaiMa.substr(2);
                    eachObj.isAddPro = self.myStock.includes(eachObj.DaiMa);
                });

                self.resList = _resStockList;
            });
        },
        delPro: function delPro(stock) {
            //删自选
            __WEBPACK_IMPORTED_MODULE_1__utils_stockManager_js__["a" /* default */].removePortfolio(stock);
        },
        addPro: function addPro(stock) {
            //加自选
            __WEBPACK_IMPORTED_MODULE_1__utils_stockManager_js__["a" /* default */].addPortfolio(stock);
        }
    },
    watch: {
        stockkey: function stockkey(curVal, oldVal) {
            if (curVal != '') {
                this.searchStock(curVal);
            }

            console.log(this.resList);
        }
    }
});

/***/ }),

/***/ 291:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('header', {
    staticClass: "sch sch-fixTop"
  }, [_c('div', {
    staticClass: "flex"
  }, [_c('img', {
    attrs: {
      "src": "/static/images/icon_search.png",
      "alt": ""
    }
  }), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model:value",
      value: (_vm.stockkey),
      expression: "stockkey",
      arg: "value"
    }],
    staticClass: "space",
    attrs: {
      "type": "text",
      "placeholder": "输入股票代码/首字母",
      "eventid": '0'
    },
    domProps: {
      "value": (_vm.stockkey)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.stockkey = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('section', {
    staticClass: "sch-history"
  }, [_c('h2', {
    staticClass: "history-tit"
  }, [_vm._v("搜索结果")]), _vm._v(" "), _c('ul', {
    staticClass: "history-list"
  }, _vm._l((_vm.resList), function(stock, index) {
    return _c('li', {
      key: index
    }, [_c('a', {
      attrs: {
        "href": '/pages/stock/main?code=' + stock.DaiMa
      }
    }, [_c('b', {
      staticClass: "stock-tag"
    }, [_vm._v(_vm._s(stock.Market))]), _vm._v(" "), _c('span', {
      staticClass: "stock-code"
    }, [_vm._v(_vm._s(stock.Code))]), _vm._v(" "), _c('span', {
      staticClass: "stock-name",
      class: {
        'xl': !stock.isAddPro
      }
    }, [_vm._v(_vm._s(stock.MingCheng))])], 1), _vm._v(" "), (stock.isAddPro) ? _c('span', {
      staticClass: "operate-btn btn-minus",
      attrs: {
        "eventid": '2-' + index
      },
      on: {
        "tap": function($event) {
          _vm.delPro(stock.DaiMa)
        }
      }
    }, [_vm._v("已加入")]) : _c('span', {
      staticClass: "operate-btn btn-add",
      attrs: {
        "eventid": '1-' + index
      },
      on: {
        "tap": function($event) {
          _vm.addPro(stock.DaiMa)
        }
      }
    })])
  }))], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4fb02504", esExports)
  }
}

/***/ })

},[178]);
//# sourceMappingURL=main.js.map