global.webpackJsonp([6],{

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_581be0b6_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(334);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(293)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_581be0b6_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/hq/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-581be0b6", Component.options)
  } else {
    hotAPI.reload("data-v-581be0b6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(146);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    navigationBarTitleText: '大智慧行情'
  }
});

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_index_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_util_js__ = __webpack_require__(19);

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
            wsHqObj: {}, //订阅的行情对象
            shzs: '', //上证指数
            szzs: '', //深圳指数
            cyzs: '', //创业板指数
            shangzhang: 0, //涨跌平统计
            xiadie: 0,
            ping: 0,
            zfb: [], //涨幅榜
            dfb: [], //跌幅榜
            fivezfb: [], //5涨幅榜
            huanshou: [], //换手
            liangbi: [], //量比
            cje: [], //成交额
            token: ''
        };
    },
    onLoad: function onLoad() {
        this.YunDzhObj = __WEBPACK_IMPORTED_MODULE_1__store_index_js__["a" /* default */].state.wsobj;
        this.token = __WEBPACK_IMPORTED_MODULE_1__store_index_js__["a" /* default */].state.token;
    },
    onShow: function onShow() {
        this.getZsHq(); //
        this.getZDPStat(); //涨跌平统计
        this.getRank('zfb');
    },
    onHide: function onHide() {
        var _this = this;

        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(this.wsHqObj).forEach(function (k) {
            return _this.wsHqObj[k].cancel();
        }); //取消对象订阅
    },
    onShareAppMessage: function onShareAppMessage() {
        return {
            title: '大智慧行情',
            desc: '股票实时数据展示',
            path: '/pages/hq/home'
        };
    },

    methods: {
        getRank: function getRank() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'zfb';
            var orderby = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ZhangFu';
            var desc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var self = this;

            var params = {
                gql: 'block=市场/沪深市场/沪深A股',
                field: 'ZhangFu,ZhongWenJianCheng,ZuiXinJia,FenZhongZhangFu5,HuanShou,LiangBi,ChengJiaoE',
                mode: 2,
                orderby: orderby,
                start: 0,
                count: 10,
                desc: desc
            };
            self.wsHqObj[name] = self.YunDzhObj.subscribe('/stkdata', params, function (res) {
                res.forEach(function (eachobj) {
                    return self.FmtHqData(eachobj);
                });
                self[name] = res;
                console.log(self[name]);
            });
        },
        rankHandler: function rankHandler(name) {
            if (this[name].length > 0) {
                this[name] = [];
                this.wsHqObj[name].cancel();
            } else {
                switch (name) {
                    case 'zfb':
                        this.getRank(name);
                        break;
                    case 'dfb':
                        this.getRank(name, 'ZhangFu', false);
                        break;
                    case 'fivezfb':
                        this.getRank(name, 'FenZhongZhangFu5', true);
                        break;
                    case 'huanshou':
                        this.getRank(name, 'HuanShou', true);
                        break;
                    case 'liangbi':
                        this.getRank(name, 'LiangBi', true);
                        break;
                    case 'cje':
                        this.getRank(name, 'ChengJiaoE', true);
                        break;
                }
            }
        },
        getZDPStat: function getZDPStat() {
            //涨跌平统计
            var self = this;

            var params = {
                gql: 'block=市场/沪深市场/沪深A股',
                field: 'ZhangDiePing',
                mode: 2
            };
            self.wsHqObj.zdpHq = self.YunDzhObj.subscribe('/blockstat', params, function (res) {
                self.shangzhang = res[0].ZhangDiePing.ShangZhangJiaShu;
                self.xiadie = res[0].ZhangDiePing.XiaDieJiaShu;
                self.ping = res[0].ZhangDiePing.PingPanJiaShu;
            });
        },
        getZsHq: function getZsHq() {
            var orderby = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var desc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            //订阅数据
            var self = this;
            var allstock = ['SH000001', 'SZ399006', 'SZ399001']; //指数行情

            var sortParams = {
                obj: allstock,
                field: 'ZhongWenJianCheng,ZuiXinJia,ZhangFu,ZhangDie',
                mode: 2,
                orderby: orderby,
                desc: desc
            };

            self.wsHqObj.zsHq = self.YunDzhObj.subscribe('/stkdata', sortParams, function (HqData) {
                self.ZsHqData(HqData);
            });
        },
        ZsHqData: function ZsHqData(HqData) {
            //筛选指数行情数据
            var self = this;
            HqData.forEach(function (hq) {
                if (hq.Obj == 'SH000001') {
                    self.shzs = self.FmtHqData(hq);
                } else if (hq.Obj == 'SZ399001') {
                    self.szzs = self.FmtHqData(hq);
                } else if (hq.Obj == 'SZ399006') {
                    self.cyzs = self.FmtHqData(hq);
                }
            });
        },
        FmtHqData: function FmtHqData(eachObj) {
            //格式化行情数据
            if (eachObj.ZuiXinJia == null) {
                eachObj.ZuiXinJiaTxt = '--';
                eachObj.ZhangFuTxt = '--';
                eachObj.ZhangDieTxt = '--';
                eachObj.FenZhongZhangFu5 = '--';
            } else {
                eachObj.ZhangDieTxt = eachObj.ZhangDie;
                eachObj.ZuiXinJiaTxt = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_util_js__["b" /* formatNumber */])(eachObj.ZuiXinJia);
                eachObj.ZhangFuTxt = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_util_js__["b" /* formatNumber */])(eachObj.ZhangFu / 100, 2, '%');
                eachObj.ChengJiaoE = (eachObj.ChengJiaoE / 100000000).toFixed(2);
                eachObj.FenZhongZhangFu5Txt = eachObj.FenZhongZhangFu5 + '%';
            }
            return eachObj;
        }
    }
});

/***/ }),

/***/ 293:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._m(0), _vm._v(" "), _c('main', {
    staticClass: "main"
  }, [_c('section', {
    staticClass: "mb5 index mod"
  }, [_c('div', {
    staticClass: "flex index_market"
  }, [_c('a', {
    staticClass: "space",
    class: {
      'mod-red': _vm.shzs.ZhangFu > 0, 'mod-green': _vm.shzs.ZhangFu < 0, 'mod-gray': _vm.shzs.ZhangFu == 0
    },
    attrs: {
      "href": "/pages/stock/main?code=SH000001"
    }
  }, [_vm._v("\n                    上证指数"), _c('p', [_vm._v(_vm._s(_vm.shzs.ZuiXinJiaTxt))]), _c('p', [_c('span', [_vm._v(_vm._s(_vm.shzs.ZhangDieTxt))]), _c('span', [_vm._v(_vm._s(_vm.shzs.ZhangFuTxt))])])], 1), _vm._v(" "), _c('a', {
    staticClass: "space",
    class: {
      'mod-red': _vm.szzs.ZhangFu > 0, 'mod-green': _vm.szzs.ZhangFu < 0, 'mod-gray': _vm.szzs.ZhangFu == 0
    },
    attrs: {
      "href": "/pages/stock/main?code=SZ399001"
    }
  }, [_vm._v("\n                    深证成指"), _c('p', [_vm._v(_vm._s(_vm.szzs.ZuiXinJiaTxt))]), _c('p', [_c('span', [_vm._v(_vm._s(_vm.szzs.ZhangDieTxt))]), _c('span', [_vm._v(_vm._s(_vm.szzs.ZhangFuTxt))])])], 1), _vm._v(" "), _c('a', {
    staticClass: "space",
    class: {
      'mod-red': _vm.cyzs.ZhangFu > 0, 'mod-green': _vm.cyzs.ZhangFu < 0, 'mod-gray': _vm.cyzs.ZhangFu == 0
    },
    attrs: {
      "href": "/pages/stock/main?code=SZ399006"
    }
  }, [_vm._v("\n                    创业板指"), _c('p', [_vm._v(_vm._s(_vm.cyzs.ZuiXinJiaTxt))]), _c('p', [_c('span', [_vm._v(_vm._s(_vm.cyzs.ZhangDieTxt))]), _c('span', [_vm._v(_vm._s(_vm.cyzs.ZhangFuTxt))])])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "index_info"
  }, [_c('div', {
    staticClass: "arr-green"
  }, [_vm._v("下跌"), _c('span', [_vm._v(_vm._s(_vm.xiadie) + "家")])]), _vm._v(" "), _c('div', {
    staticClass: "arr-gray"
  }, [_vm._v("平盘"), _c('span', [_vm._v(_vm._s(_vm.ping) + "家")])]), _vm._v(" "), _c('div', {
    staticClass: "arr-red"
  }, [_vm._v("上涨"), _c('span', [_vm._v(_vm._s(_vm.shangzhang) + "家")])])])]), _vm._v(" "), _c('section', {
    staticClass: "mb10 ranking mod"
  }, [_c('h2', {
    staticClass: "tit tit-dropDown",
    class: {
      'up': _vm.zfb.length > 0
    },
    attrs: {
      "eventid": '0'
    },
    on: {
      "tap": function($event) {
        _vm.rankHandler('zfb')
      }
    }
  }, [_vm._v("涨幅榜"), _c('a', {
    attrs: {
      "href": '/pages/ohqmore/ohqmore?tp=zfb&token=' + _vm.token
    }
  }, [_c('i')], 1)]), _vm._v(" "), _c('ul', {
    staticClass: "ranking-list"
  }, _vm._l((_vm.zfb), function(stock, index) {
    return _c('li', {
      key: index
    }, [_c('a', {
      attrs: {
        "href": '/pages/stock/main?code=' + stock.Obj
      }
    }, [_c('span', [_vm._v(_vm._s(stock.ZhongWenJianCheng))]), _c('span', {
      staticClass: "font-red"
    }, [_vm._v(_vm._s(stock.ZuiXinJiaTxt))]), _c('span', {
      staticClass: "font-red"
    }, [_vm._v(_vm._s(stock.ZhangFuTxt))])])])
  }))], 1), _vm._v(" "), _c('section', {
    staticClass: "mb10 ranking mod"
  }, [_c('h2', {
    staticClass: "tit tit-dropDown",
    class: {
      'up': _vm.dfb.length > 0
    },
    attrs: {
      "eventid": '1'
    },
    on: {
      "tap": function($event) {
        _vm.rankHandler('dfb')
      }
    }
  }, [_vm._v("跌幅榜"), _c('a', {
    attrs: {
      "href": '/pages/ohqmore/ohqmore?tp=dfb&token=' + _vm.token
    }
  }, [_c('i')], 1)]), _vm._v(" "), _c('ul', {
    staticClass: "ranking-list"
  }, _vm._l((_vm.dfb), function(stock, index) {
    return _c('li', {
      key: index
    }, [_c('a', {
      attrs: {
        "href": '/pages/stock/main?code=' + stock.Obj
      }
    }, [_c('span', [_vm._v(_vm._s(stock.ZhongWenJianCheng))]), _c('span', {
      staticClass: "font-green"
    }, [_vm._v(_vm._s(stock.ZuiXinJiaTxt))]), _c('span', {
      staticClass: "font-green"
    }, [_vm._v(_vm._s(stock.ZhangFuTxt))])])])
  }))], 1), _vm._v(" "), _c('section', {
    staticClass: "mb10 ranking mod"
  }, [_c('h2', {
    staticClass: "tit tit-dropDown",
    class: {
      'up': _vm.fivezfb.length > 0
    },
    attrs: {
      "eventid": '2'
    },
    on: {
      "tap": function($event) {
        _vm.rankHandler('fivezfb')
      }
    }
  }, [_vm._v("5分钟涨跌幅"), _c('a', {
    attrs: {
      "href": '/pages/ohqmore/ohqmore?tp=fivezfb&token=' + _vm.token
    }
  }, [_c('i')], 1)]), _vm._v(" "), _c('ul', {
    staticClass: "ranking-list"
  }, _vm._l((_vm.fivezfb), function(stock, index) {
    return _c('li', {
      key: index
    }, [_c('a', {
      attrs: {
        "href": '/pages/stock/main?code=' + stock.Obj
      }
    }, [_c('span', [_vm._v(_vm._s(stock.ZhongWenJianCheng))]), _c('span', {
      class: {
        'font-red': stock.ZhangFu > 0, 'font-green': stock.ZhangFu < 0, 'font-gray': stock.ZhangFu == 0
      }
    }, [_vm._v(_vm._s(stock.ZuiXinJiaTxt))]), _c('span', {
      class: {
        'font-red': stock.ZhangFu > 0, 'font-green': stock.ZhangFu < 0, 'font-gray': stock.ZhangFu == 0
      }
    }, [_vm._v(_vm._s(stock.FenZhongZhangFu5Txt))])])])
  }))], 1), _vm._v(" "), _c('section', {
    staticClass: "mb10 ranking mod"
  }, [_c('h2', {
    staticClass: "tit tit-dropDown",
    class: {
      'up': _vm.huanshou.length > 0
    },
    attrs: {
      "eventid": '3'
    },
    on: {
      "tap": function($event) {
        _vm.rankHandler('huanshou')
      }
    }
  }, [_vm._v("换手率"), _c('a', {
    attrs: {
      "href": '/pages/ohqmore/ohqmore?tp=huanshou&token=' + _vm.token
    }
  }, [_c('i')], 1)]), _vm._v(" "), _c('ul', {
    staticClass: "ranking-list"
  }, _vm._l((_vm.huanshou), function(stock, index) {
    return _c('li', {
      key: index
    }, [_c('a', {
      attrs: {
        "href": '/pages/stock/main?code=' + stock.Obj
      }
    }, [_c('span', [_vm._v(_vm._s(stock.ZhongWenJianCheng))]), _c('span', {
      class: {
        'font-red': stock.ZhangFu > 0, 'font-green': stock.ZhangFu < 0, 'font-gray': stock.ZhangFu == 0
      }
    }, [_vm._v(_vm._s(stock.ZuiXinJiaTxt))]), _c('span', {
      class: {
        'font-red': stock.ZhangFu > 0, 'font-green': stock.ZhangFu < 0, 'font-gray': stock.ZhangFu == 0
      }
    }, [_vm._v(_vm._s(stock.HuanShou) + "%")])])])
  }))], 1), _vm._v(" "), _c('section', {
    staticClass: "mb10 ranking mod"
  }, [_c('h2', {
    staticClass: "tit tit-dropDown",
    class: {
      'up': _vm.liangbi.length > 0
    },
    attrs: {
      "eventid": '4'
    },
    on: {
      "tap": function($event) {
        _vm.rankHandler('liangbi')
      }
    }
  }, [_vm._v("量比"), _c('a', {
    attrs: {
      "href": '/pages/ohqmore/ohqmore?tp=liangbi&token=' + _vm.token
    }
  }, [_c('i')], 1)]), _vm._v(" "), _c('ul', {
    staticClass: "ranking-list"
  }, _vm._l((_vm.liangbi), function(stock, index) {
    return _c('li', {
      key: index
    }, [_c('a', {
      attrs: {
        "href": '/pages/stock/main?code=' + stock.Obj
      }
    }, [_c('span', [_vm._v(_vm._s(stock.ZhongWenJianCheng))]), _c('span', {
      class: {
        'font-red': stock.ZhangFu > 0, 'font-green': stock.ZhangFu < 0, 'font-gray': stock.ZhangFu == 0
      }
    }, [_vm._v(_vm._s(stock.ZuiXinJiaTxt))]), _c('span', {
      class: {
        'font-red': stock.ZhangFu > 0, 'font-green': stock.ZhangFu < 0, 'font-gray': stock.ZhangFu == 0
      }
    }, [_vm._v(_vm._s(stock.LiangBi))])])])
  }))], 1), _vm._v(" "), _c('section', {
    staticClass: "mb10 ranking mod"
  }, [_c('h2', {
    staticClass: "tit tit-dropDown",
    class: {
      'up': _vm.cje.length > 0
    },
    attrs: {
      "eventid": '5'
    },
    on: {
      "tap": function($event) {
        _vm.rankHandler('cje')
      }
    }
  }, [_vm._v("成交额"), _c('a', {
    attrs: {
      "href": '/pages/ohqmore/ohqmore?tp=cje&token=' + _vm.token
    }
  }, [_c('i')], 1)]), _vm._v(" "), _c('ul', {
    staticClass: "ranking-list"
  }, _vm._l((_vm.cje), function(stock, index) {
    return _c('li', {
      key: index
    }, [_c('a', {
      attrs: {
        "href": '/pages/stock/main?code=' + stock.Obj
      }
    }, [_c('span', [_vm._v(_vm._s(stock.ZhongWenJianCheng))]), _c('span', {
      class: {
        'font-red': stock.ZhangFu > 0, 'font-green': stock.ZhangFu < 0, 'font-gray': stock.ZhangFu == 0
      }
    }, [_vm._v(_vm._s(stock.ZuiXinJiaTxt))]), _c('span', {
      class: {
        'font-red': stock.ZhangFu > 0, 'font-green': stock.ZhangFu < 0, 'font-gray': stock.ZhangFu == 0
      }
    }, [_vm._v(_vm._s(stock.ChengJiaoE) + "亿")])])])
  }))], 1)], 1)], 1)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "sch sch_gray"
  }, [_c('a', {
    attrs: {
      "href": "/pages/search/main"
    }
  }, [_c('img', {
    attrs: {
      "src": "/static/images/icon_search.png",
      "alt": ""
    }
  }), _vm._v("输入股票代码/首字母")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-581be0b6", esExports)
  }
}

/***/ })

},[174]);
//# sourceMappingURL=main.js.map