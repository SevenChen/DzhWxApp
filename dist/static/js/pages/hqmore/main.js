global.webpackJsonp([5],{

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_544b8fba_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(333);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(292)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_544b8fba_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/hqmore/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-544b8fba", Component.options)
  } else {
    hotAPI.reload("data-v-544b8fba", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(147);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    navigationBarTitleText: '大智慧行情'
  }
});

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_index_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_util_js__ = __webpack_require__(19);
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
            YunDzhObj: '', //订阅的行情对象
            tp: 'zfb', //类型 默认涨幅榜
            windowHeight: '', //页面高度
            stockList: [], //数据list
            curPage: 1, //当前页
            orderby: 'ZhangFu', //排序字段
            desc: true, //true 顺序 or false 倒序
            title1: '最新价', //标题1
            title2: '涨幅%', //标题2
            testobj: {}
        };
    },

    computed: {
        Title1: function Title1() {
            return 'ZuiXinJia';
        },
        Title1Class: function Title1Class() {

            var _class = '';
            var _i = '';
            //if (this.tp == 'zfb') {
            if (this.orderby == 'ZuiXinJia') {
                _class = 'sort';
                _i = this.desc ? '' : 'up';
                return _class + ' ' + _i;
            } else {
                return '';
            }
            //}
        },
        Title2: function Title2() {

            switch (this.tp) {
                case 'zfb':
                    return 'ZhangFu';break;
                case 'dfb':
                    return 'ZhangFu';break;
                case 'fivezfb':
                    return 'FenZhongZhangFu5';break;
                case 'huanshou':
                    return 'HuanShou';break;
                case 'liangbi':
                    return 'LiangBi';break;
                case 'cje':
                    return 'ChengJiaoE';break;
            }
        },
        Title2Class: function Title2Class() {
            var _class = '';
            var _i = '';

            if (this.tp == 'zfb' || this.tp == 'dfb') {
                if (this.orderby == 'ZhangFu') {
                    _class = 'sort';
                    _i = this.desc ? '' : 'up';
                    return _class + ' ' + _i;
                } else {
                    return '';
                }
            }

            if (this.tp == 'fivezfb') {
                if (this.orderby == 'FenZhongZhangFu5') {
                    _class = 'sort';
                    _i = this.desc ? '' : 'up';
                    return _class + ' ' + _i;
                } else {
                    return '';
                }
            }

            if (this.tp == 'huanshou') {
                if (this.orderby == 'HuanShou') {
                    _class = 'sort';
                    _i = this.desc ? '' : 'up';
                    return _class + ' ' + _i;
                } else {
                    return '';
                }
            }

            if (this.tp == 'liangbi') {
                if (this.orderby == 'LiangBi') {
                    _class = 'sort';
                    _i = this.desc ? '' : 'up';
                    return _class + ' ' + _i;
                } else {
                    return '';
                }
            }

            if (this.tp == 'cje') {
                if (this.orderby == 'ChengJiaoE') {
                    _class = 'sort';
                    _i = this.desc ? '' : 'up';
                    return _class + ' ' + _i;
                } else {
                    return '';
                }
            }
        }
    },
    onLoad: function onLoad() {
        var self = this;

        this.tp = this.$root.$mp.query.tp;
        this.init();

        wx.getSystemInfo({
            success: function success(res) {
                self.windowHeight = res.windowHeight;
            }
        });

        this.YunDzhObj = __WEBPACK_IMPORTED_MODULE_0__store_index_js__["a" /* default */].state.wsobj;

        this.getRank(this.orderby, this.desc); //debug
    },
    onShow: function onShow() {
        //console.log('show..');
    },
    onHide: function onHide() {
        this.YunDzhObj.cancel();
    },
    onUnload: function onUnload() {
        this.YunDzhObj.cancel();
    },

    methods: {
        init: function init() {
            this.stockList = [];
            this.curPage = 1;

            this.title1 = '最新价';
            this.desc = true;

            switch (this.tp) {
                case 'zfb':
                    this.orderby = 'ZhangFu';
                    this.title2 = '涨幅%';
                    break;
                case 'dfb':
                    this.orderby = 'ZhangFu';
                    this.title2 = '涨幅%';
                    this.desc = false;
                    break;
                case 'fivezfb':
                    this.orderby = 'FenZhongZhangFu5';
                    this.title2 = '5分钟涨%';
                    break;
                case 'huanshou':
                    this.orderby = 'HuanShou';
                    this.title2 = '换手';
                    break;
                case 'liangbi':
                    this.orderby = 'LiangBi';
                    this.title2 = '量比';
                    break;
                case 'cje':
                    this.orderby = 'ChengJiaoE';
                    this.title2 = '成交额';
                    break;
            }
        },
        sortby: function sortby(flag) {
            if (flag != this.orderby) {
                //排序字段不是当前字段 切换 排序字段
                this.orderby = flag;
                this.desc = true;
            } else {
                //切换 排序方式
                this.desc = !this.desc;
            }
            this.curPage = 1;
            this.stockList = [];

            this.getRank(this.orderby, this.desc);
        },
        getRank: function getRank() {
            var orderby = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ZhangFu';
            var desc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var self = this;

            var params = {
                gql: 'block=市场/沪深市场/沪深A股',
                field: 'ZhangFu,ZhongWenJianCheng,ZuiXinJia,FenZhongZhangFu5,HuanShou,LiangBi,ChengJiaoE',
                mode: 2,
                orderby: orderby,
                start: start,
                count: 20,
                desc: desc
            };

            wx.request({ url: "https://gw.yundzh.com/stkdata?output=json&gql=block%3D%E5%B8%82%E5%9C%BA%2F%E6%B2%AA%E6%B7%B1%E5%B8%82%E5%9C%BA%2F%E6%B2%AA%E6%B7%B1A%E8%82%A1&field=ZhangFu%2CZhongWenJianCheng%2CZuiXinJia%2CFenZhongZhangFu5%2CHuanShou%2CLiangBi%2CChengJiaoE&mode=2&orderby=ZhangFu&start=0&count=200&desc=true&qid=4&token=0000007f:1528377253:f3ed0ba0048680fa1682646e14cf8ce078b7b6c0",
                data: {},
                header: { 'content-type': 'application/json' },
                success: function success(res) {
                    var _res = res.data.Data.RepDataStkData;

                    _res.forEach(function (eachobj) {
                        return self.FmtHqData(eachobj);
                    });

                    //self.stockList = _res;
                }
            });
            /*
                        self.YunDzhObj.query(
                            '/stkdata',
                            params,
                            res => {
                                res.forEach((eachobj)=>self.FmtHqData(eachobj));
            
            /*
                                wx.setStorage({
                                    key:'zfb',
                                    data:res,
                                    success:()=>console.log(res);
                                    fail:()=>(),
                                })
            */
            //self.stockList = [...self.stockList , ...res];


            // self.stockList.push.apply(self.stockList,res);
            /*
                               self.stockList = res;
                               //console.log(self.stockList);
            
                               if(self.testobj[self.curPage]) {
                                    self.testobj[self.curPage] = '';
                               }
            
                               self.testobj[self.curPage] = res;
            
                               console.log(self.testobj);
            
                            }
                        );*/
        },
        FmtHqData: function FmtHqData(eachObj) {
            //格式化行情数据
            if (eachObj.ZuiXinJia == null) {
                eachObj.ZuiXinJiaTxt = '--';
                eachObj.ZhangFuTxt = '--';
                eachObj.FenZhongZhangFu5 = '--';
            } else {
                eachObj.ZuiXinJiaTxt = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_util_js__["b" /* formatNumber */])(eachObj.ZuiXinJia);
                eachObj.ZhangFuTxt = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_util_js__["b" /* formatNumber */])(eachObj.ZhangFu / 100, 2, '%');
                eachObj.ChengJiaoE = (eachObj.ChengJiaoE / 100000000).toFixed(2);
                eachObj.FenZhongZhangFu5Txt = eachObj.FenZhongZhangFu5 + '%';
            }

            switch (this.tp) {
                case 'zfb':
                    eachObj.title2TXT = eachObj.ZhangFuTxt;break;
                case 'dfb':
                    eachObj.title2TXT = eachObj.ZhangFuTxt;break;
                case 'fivezfb':
                    eachObj.title2TXT = eachObj.FenZhongZhangFu5;break;
                case 'huanshou':
                    eachObj.title2TXT = eachObj.HuanShou;break;
                case 'liangbi':
                    eachObj.title2TXT = eachObj.LiangBi;break;
                case 'cje':
                    eachObj.title2TXT = eachObj.ChengJiaoE + '亿';break;
            }

            return eachObj;
        },
        lower: function lower() {
            return 0;
            if (this.curPage > 10) {
                return 0;
            } else {
                this.curPage++;
            }

            var start = (this.curPage - 1) * 20;

            this.getRank(this.orderby, this.desc, start);
        }
    },
    onShareAppMessage: function onShareAppMessage() {
        return {
            title: '大智慧行情',
            desc: '股票实时数据展示',
            path: '/pages/hq/home'
        };
    }
});

/***/ }),

/***/ 292:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('section', {
    staticClass: "market-list-th"
  }, [_c('span', [_vm._v("沪深A股")]), _c('span', {
    class: _vm.Title1Class,
    attrs: {
      "eventid": '0'
    },
    on: {
      "tap": function($event) {
        _vm.sortby(_vm.Title1)
      }
    }
  }, [_vm._v(_vm._s(_vm.title1))]), _c('span', {
    class: _vm.Title2Class,
    attrs: {
      "eventid": '1'
    },
    on: {
      "tap": function($event) {
        _vm.sortby(_vm.Title2)
      }
    }
  }, [_vm._v(_vm._s(_vm.title2))])]), _vm._v(" "), _c('section', {
    staticClass: "market-list-tb"
  }, [_c('scroll-view', {
    staticClass: "ranking-list",
    style: ({
      height: _vm.windowHeight + 'px'
    }),
    attrs: {
      "scroll-y": "true",
      "eventid": '2'
    },
    on: {
      "scrolltolower": _vm.lower
    }
  }, _vm._l((_vm.stockList), function(stock, index) {
    return _c('li', {
      key: index
    }, [_c('a', {
      attrs: {
        "href": '/pages/stock/main?code=' + stock.Obj
      }
    }, [_c('span', [_vm._v(_vm._s(stock.ZhongWenJianCheng)), _c('small', [_vm._v(_vm._s(stock.Obj))])], 1), _vm._v(" "), _c('span', {
      class: {
        'font-red': stock.ZhangFu > 0, 'font-green': stock.ZhangFu < 0, 'font-gray': stock.ZhangFu == 0
      }
    }, [_vm._v(_vm._s(stock.ZuiXinJiaTxt))]), _vm._v(" "), _c('span', {
      class: {
        'font-red': stock.ZhangFu > 0, 'font-green': stock.ZhangFu < 0, 'font-gray': stock.ZhangFu == 0
      }
    }, [_vm._v(_vm._s(stock.title2TXT))])])])
  }))], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-544b8fba", esExports)
  }
}

/***/ })

},[175]);
//# sourceMappingURL=main.js.map