global.webpackJsonp([2],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_util_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_index_js__ = __webpack_require__(18);





var Chart = function () {
  function Chart(dataProvider) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Chart);

    this.dataProvider = dataProvider;
    this.options = options;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Chart, [{
    key: 'initData',
    value: function initData() {
      // // 设置画详细提示框方法,设置为false则为不显示
      // let drawTooltip = this._options.drawTooltip;
      // this.drawTooltip = drawTooltip === false ? noop : ((typeof drawTooltip === 'function') ? drawTooltip : this.drawTooltip);

      // 图表通用参数配置
      //this.hasVolume = this.options.hasVolume != null ? this.options.hasVolume : true;
      this.hasVolume = __WEBPACK_IMPORTED_MODULE_3__store_index_js__["a" /* default */].state.volumeObj.indexOf(this.options.stock) == -1 ? true : false;
      this.fontSize = this.options.fontSize || 10 * this.canvas.pixelRadio;
      this.upColor = this.options.upColor || '#e30000';
      this.downColor = this.options.downColor || '#1ca049';

      // 时间轴的高度为fontSize + 4
      this.timeAxisHeight = this.fontSize + 4;

      this.gridLineWidth = 0.5;
      this.gridLineColor = '#dddddd';
      this.tickColor = '#555555';
      this.tickBackgroundColor = '#eeeeee';

      this.pointerLineColor = '#999999';
    }
  }, {
    key: 'setCanvas',
    value: function setCanvas(canvas) {
      if (!this.canvas) {
        // 初始数据
        this.canvas = canvas;
        this.initData();
      }
    }
  }, {
    key: 'show',
    value: function show() {
      this.canvas && this.canvas.show(this);
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.canvas && this.canvas.remove(this);
    }
  }, {
    key: 'redraw',
    value: function redraw() {
      //if (this.canvas && this.canvas.getCurrentChart() === this &&  //debug
      if (this.canvas && this.canvas.canvasWidth && this.canvas.canvasHeight) {
        this.canvas.clear();
        this.initChart();
        this.drawBackground();
        this.drawChart();
        this.drawAxisTicks();
        this.canvas && this.canvas.toggleMask(false);
        this.canvas.drawCanvas();
      }
    }
  }, {
    key: 'initChart',
    value: function initChart() {
      this.yAxisTicks = [];
      var timeAxisHeight = this.timeAxisHeight;
      var hasVolume = this.hasVolume;

      // 默认主图和量图的比例为7 : 3
      var height = this.canvas.canvasHeight - timeAxisHeight;
      if (hasVolume) {
        this.mainChartHeight = height * 0.7;
        this.volumeChartHeight = height * 0.3;
      } else {
        this.mainChartHeight = height;
        this.volumeChartHeight = 0;
      }
    }

    /* eslint class-methods-use-this: 0 */

  }, {
    key: 'drawBackground',
    value: function drawBackground() {
      console.warn('not implemented');
    }

    /* eslint class-methods-use-this: 0 */

  }, {
    key: 'drawChart',
    value: function drawChart() {
      console.warn('not implemented');
    }
  }, {
    key: 'drawAxisTicks',
    value: function drawAxisTicks() {
      var yAxisTicks = this.yAxisTicks;
      if (yAxisTicks) {
        var canvas = this.canvas;
        var fontSize = this.fontSize;
        var tickBackgroundColor = this.tickBackgroundColor;
        yAxisTicks.forEach(function (eachTick) {
          canvas.drawText(eachTick.text, eachTick.x, eachTick.y, fontSize, eachTick.tickColor, eachTick.withBackground && tickBackgroundColor);
        });
      }
    }
  }, {
    key: 'formatYAxisLabel',
    value: function formatYAxisLabel(text) {
      return Chart.formatNumber(text, 2, 'K/M', false);
    }
  }, {
    key: 'formatXAxisLabel',
    value: function formatXAxisLabel(text) {
      return text;
    }
  }, {
    key: 'getColor',
    value: function getColor(isUp) {
      return isUp ? this.upColor : this.downColor;
    }
  }, {
    key: 'drawYAxisGridLine',
    value: function drawYAxisGridLine(y, text) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.gridLineColor;
      var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'top';
      var withBackground = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var tickColor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : this.tickColor;
      var textMove = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

      if (position == 'bottom') {
        this.canvas.drawLine(0, y, this.canvas.canvasWidth, y, this.gridLineWidth, color);
      } else {
        this.canvas.drawLineDash(0, y, this.canvas.canvasWidth, y, this.gridLineWidth, color);
      }

      if (text) {
        // 记录Y轴坐标位置
        var yAxisTicks = this.yAxisTicks;
        if (textMove > 0) y -= textMove;
        yAxisTicks.push({
          text: this.formatYAxisLabel(text),
          x: 2 * this.canvas.pixelRadio,
          y: position === 'top' ? y - 2 : y + this.fontSize + 2,
          tickColor: tickColor,
          withBackground: withBackground
        });
      }
    }
  }, {
    key: 'drawXAxisGridLine',
    value: function drawXAxisGridLine(x, text) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.gridLineColor;
      var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'middle';
      var withBackground = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var full = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var tickColor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : this.tickColor;

      this.canvas.drawLine(x, 0, x, full ? this.canvas.canvasHeight : this.mainChartHeight, this.gridLineWidth, color);
      if (text) {
        var textWidth = this.canvas.measureText(text);
        var fontSize = this.fontSize;
        var textX = position === 'middle' ? x - textWidth / 2 : x;
        var textY = this.mainChartHeight + fontSize + 2;

        this.canvas.drawText(text, textX, textY, fontSize, tickColor, withBackground && this.tickBackgroundColor);
      }
    }

    /* eslint no-unused-vars: 0 */

  }, {
    key: 'panMove',
    value: function panMove(pressed, x, y, deltaX) {}

    /* eslint no-unused-vars: 0 */

  }, {
    key: 'pinchMove',
    value: function pinchMove(scale) {}
  }]);

  return Chart;
}();

Chart.formatNumber = __WEBPACK_IMPORTED_MODULE_2__utils_util_js__["b" /* formatNumber */];
Chart.formatDate = __WEBPACK_IMPORTED_MODULE_2__utils_util_js__["a" /* formatDate */];
/* harmony default export */ __webpack_exports__["a"] = (Chart);

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_468de450_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(330);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(289)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_468de450_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/stock/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-468de450", Component.options)
  } else {
    hotAPI.reload("data-v-468de450", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);



// import Hammer from '../../bower_components/hammerjs/hammer.js';

var Canvas = function () {
  function Canvas() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        width = _ref.width,
        height = _ref.height,
        eventListener = _ref.eventListener,
        pixelRadio = _ref.pixelRadio,
        canvasId = _ref.canvasId;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Canvas);

    this.pixelRadio = 2;

    // TODO 无法得到canvas的大小，只能设置默认宽高
    this.width = width || 350;
    this.height = height || 500;
    //this.width = 210;
    //this.height = 261;
    this.eventListener = eventListener;

    //this.charts = [];
    this.charts = '';
    this.currentChartIndex = 0;

    this.canvasId = canvasId;
    this.pixelRadio = pixelRadio;
  }

  // /* eslint no-undef: 0 */
  // _pixelRadio = (function () {
  //   const ctx = document.createElement('canvas').getContext('2d');
  //   const dpr = window.devicePixelRatio || 1;
  //   const bsr = ctx.webkitBackingStorePixelRatio ||
  //     ctx.mozBackingStorePixelRatio ||
  //     ctx.msBackingStorePixelRatio ||
  //     ctx.oBackingStorePixelRatio ||
  //     ctx.backingStorePixelRatio || 1;

  //   return dpr / bsr;
  // }());


  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Canvas, [{
    key: 'initCanvas',
    value: function initCanvas() {
      var ctx = this.ctx = wx.createCanvasContext(this.canvasId); // this.ctx = wx.createContext();

      // TODO 初始化ctx缩放比例，canvas大小
      var ratio = this.pixelRadio;
      this.canvasWidth = this.width * ratio;
      this.canvasHeight = this.height * ratio;
      ctx.scale(1 / ratio, 1 / ratio);
    }
  }, {
    key: 'redraw',
    value: function redraw(chart) {
      this.initCanvas();
      //const currentChart = this.getCurrentChart();
      //currentChart && currentChart.redraw();
      //chart && chart.redraw();
    }
  }, {
    key: 'getCurrentChart',
    value: function getCurrentChart() {
      return this.charts[this.currentChartIndex];
    }
  }, {
    key: 'show',
    value: function show(chart) {
      /*
      if (chart) {
        const index = this.charts.indexOf(chart);
         if (index >= 0) {
          this.currentChartIndex = index;   //这里好像是一个缓存
        } else {
          this.currentChartIndex = this.charts.length;  //
          this.addChart(chart);
        }
      }*/

      this.addChart(chart);

      //this.redraw();
      this.redraw(chart);
    }
  }, {
    key: 'hasChart',
    value: function hasChart(chart) {
      return true; //debug
      return this.charts.indexOf(chart) >= 0;
    }
  }, {
    key: 'addChart',
    value: function addChart(chart) {
      //debug
      /*
      const index = this.charts.indexOf(chart);
      if (index < 0) {
        this.charts.push(chart);
        chart.setCanvas(this);
      }*/
      chart.setCanvas(this);
    }
  }, {
    key: 'removeChart',
    value: function removeChart(chart) {
      var index = void 0;
      if (typeof chart === 'number') {
        index = chart;
      } else {
        index = this.charts.indexOf(chart);
      }

      if (index >= 0) {
        this.clear();
        this.currentChartIndex = 0;
        this.charts.splice(index, 1);
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.charts = [];
      this.currentChartIndex = 0;
      this.clear();
    }
  }, {
    key: 'clear',
    value: function clear() {
      // this.ctx && this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      // 微信小程序画了一次后状态还原，需要重新设置ctx比例
      this.initCanvas();
    }
  }, {
    key: 'drawCanvas',
    value: function drawCanvas() {
      if (this.ctx) {
        this.ctx.draw();
        // wx.drawCanvas({
        //   canvasId: this.canvasId,
        //   actions: this.ctx.getActions(),
        // });

        // const context = wx.createContext();

        // context.rect(0, 0, 300, 500);
        // context.stroke();
        // wx.drawCanvas({
        //   canvasId: 1,
        //   actions: context.getActions(),
        // });
      }
    }
  }, {
    key: 'touchstart',
    value: function touchstart(event) {
      this.lastX = event.changedTouches[0].x * this.pixelRadio;
    }
  }, {
    key: 'touchmove',
    value: function touchmove(event) {
      var chart = this.getCurrentChart();
      var touch = event.changedTouches[0];
      var moveToX = touch.x * this.pixelRadio;
      var moveToY = touch.y * this.pixelRadio;
      var deltaX = moveToX - this.lastX;
      var result = chart && chart.panMove(this.pressed, moveToX, moveToY, deltaX);
      result && (this.lastX = moveToX);
    }
  }, {
    key: 'touchend',
    value: function touchend() {
      this.pressed = false;
      this.lastX = 0;
      var chart = this.getCurrentChart();
      chart && chart.panMove(this.pressed);
    }
  }, {
    key: 'longtap',
    value: function longtap(event) {
      this.pressed = true;
      var chart = this.getCurrentChart();
      var touch = event.changedTouches[0];
      var moveToX = touch.pageX * this.pixelRadio;
      var moveToY = (touch.pageY - event.target.offsetTop) * this.pixelRadio;
      chart && chart.panMove(this.pressed, moveToX, moveToY);
    }

    // bindEvent() {

    //   // 绑定事件,hammer相关
    //   let mc = new Hammer.Manager(this._canvas, {});
    //   mc.add(new Hammer.Pan({threshold: 10, direction: Hammer.DIRECTION_ALL}));
    //   mc.add(new Hammer.Press({time: 300}));
    //   mc.add(new Hammer.Pinch());

    //   let lastDeltaX = 0;
    //   let lastScale = 1;
    //   let pressed = false;

    //   mc.on('panstart', (event) => {
    //     lastDeltaX = 0;
    //     this._eventListener && this._eventListener(event);
    //   });

    //   mc.on('panmove panend', (event) => {
    //     let chart = this.getCurrentChart();
    //     let deltaX = event.deltaX - lastDeltaX;
    //     if (event.type === 'panend') {
    //       pressed = false;
    //       deltaX = lastDeltaX = 0;
    //     }
    //     let result = chart && chart.panMove(pressed, event.center.x, event.center.y, deltaX);
    //     result && (lastDeltaX += deltaX);
    //     this._eventListener && this._eventListener(event);
    //   });

    //   mc.on('press pressup', (event) => {
    //     pressed = (event.type === 'press');
    //     let chart = this.getCurrentChart();
    //     chart && chart.panMove(pressed, event.center.x, event.center.y);
    //     this._eventListener && this._eventListener(event);
    //   });

    //   mc.on('pinchstart', (event) => {
    //     lastScale = 1;
    //     this._eventListener && this._eventListener(event);
    //   });

    //   mc.on('pinchmove', (event) => {
    //     if (!pressed) {
    //       let chart = this.getCurrentChart();
    //       let result = chart && chart.pinchMove(lastScale - event.scale);
    //       result && (lastScale = event.scale);
    //     }
    //     this._eventListener && this._eventListener(event);
    //   });
    // }

    /**
     * 显示和隐藏mask层
     */

  }, {
    key: 'toggleMask',
    value: function toggleMask(show) {
      // // 如果mask不存在则创建
      // let mask = this._mask;
      // if (!mask) {
      //   mask = this._mask = document.createElement('div');
      //   mask.class = 'load-mask';
      //   let style = mask.style;
      //   style.position = 'absolute';
      //   style.top = style.left = style.right = style.bottom = 0;
      //   style.zIndex = 100;
      //   style.backgroundColor = 'rgba(255,255,255,0.5)';
      //   this.container.appendChild(mask);
      //   if ('|absolute|relative|fix'.indexOf(this.container.style.position) <= 0) {
      //     this.container.style.position = 'relative';
      //   }

      //   let label = document.createElement('div');
      //   let labelStyle = label.style;
      //   labelStyle.position = 'absolute';
      //   labelStyle.marginLeft = '-60px';
      //   labelStyle.top = '30%';
      //   labelStyle.left = '50%';
      //   labelStyle.fontSize = '14px';
      //   labelStyle.textAlign = 'center';
      //   labelStyle.padding = '4px 8px';
      //   labelStyle.border = '1px solid #333';
      //   labelStyle.color = '#333';
      //   label.innerHTML = '加载数据中,请稍后';

      //   mask.appendChild(label);
      // }
      // mask.style.display = (show ? 'block' : 'none');
    }
  }, {
    key: 'drawLine',
    value: function drawLine(x1, y1, x2, y2, lineWidth, style) {
      var ctx = this.ctx;
      ctx.beginPath();
      // ctx.lineWidth = lineWidth;
      ctx.setLineWidth(lineWidth * this.pixelRadio);
      // ctx.strokeStyle = style;
      ctx.setStrokeStyle(style);
      ctx.moveTo(this.normalizeDrawLinePoint(x1), this.normalizeDrawLinePoint(y1));
      ctx.lineTo(this.normalizeDrawLinePoint(x2), this.normalizeDrawLinePoint(y2));
      ctx.stroke();
    }

    //绘制虚线

  }, {
    key: 'drawLineDash',
    value: function drawLineDash(x1, y1, x2, y2, lineWidth, style) {
      var ctx = this.ctx;
      ctx.setStrokeStyle(style);
      var step = 10;
      var x = x2 - x1,
          y = y2 - y1,
          count = Math.floor(Math.sqrt(x * x + y * y) / step),
          xv = x / count,
          yv = y / count;
      ctx.beginPath();
      for (var i = 0; i < count; i++) {
        if (i % 2 === 0) {
          ctx.moveTo(x1, y1);
        } else {
          ctx.lineTo(x1, y1);
        }
        x1 += xv;
        y1 += yv;
      }
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }, {
    key: 'drawText',
    value: function drawText(text, pointX, pointY, fontSize, fontStyle) {
      var backgroundStyle = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

      var ctx = this.ctx;
      var textWidth = this.measureText(text);
      var x = Math.min(Math.max(pointX, 0), this.canvasWidth - textWidth);
      var y = pointY;
      if (backgroundStyle) {
        // 背景边框
        // ctx.fillStyle = backgroundStyle;
        ctx.setFillStyle(backgroundStyle);
        // ctx.fillRect(x - 2, y + 2, textWidth + 4, -(fontSize + 4));
        ctx.rect(x - 2, y + 2, textWidth + 4, -(fontSize + 4));
        ctx.fill();
      }

      ctx.beginPath();
      // ctx.font = `${fontSize}px Arial`;
      ctx.setFontSize(fontSize);
      // ctx.fillStyle = fontStyle;
      ctx.setFillStyle(fontStyle);
      ctx.fillText(text, x, y);
    }
  }, {
    key: 'fillPath',
    value: function fillPath(points, y0, strokeColor, fillStyle) {
      var lineWidth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

      var ctx = this.ctx;
      ctx.beginPath();
      points.forEach(function (eachPoint, index) {
        if (index === 0) {
          ctx.moveTo(eachPoint[0], eachPoint[1]);
        } else {
          ctx.lineTo(eachPoint[0], eachPoint[1]);
        }
      });
      // ctx.lineWidth = lineWidth;
      ctx.setLineWidth(lineWidth * this.pixelRadio);
      // ctx.strokeStyle = strokeColor;
      ctx.setStrokeStyle(strokeColor);
      // ctx.lineJoin = 'round';
      ctx.setLineJoin('round');
      ctx.stroke();

      if (points.length > 1) {
        // ctx.lineWidth = 0;
        ctx.setLineWidth(0);
        ctx.lineTo(points[points.length - 1][0], y0);
        ctx.lineTo(points[0][0], y0);
        ctx.closePath();
        // ctx.fillStyle = fillStyle;
        ctx.setFillStyle(fillStyle);
        ctx.fill();
      } else {
        ctx.closePath();
      }
    }
  }, {
    key: 'drawPath',
    value: function drawPath(points, color) {
      var lineWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      var ctx = this.ctx;
      ctx.beginPath();
      // ctx.lineJoin = 'round';
      ctx.setLineJoin('round');
      // ctx.lineWidth = lineWidth;
      ctx.setLineWidth(lineWidth * this.pixelRadio);
      // const strokeStyle = ctx.strokeStyle = color = color.toLowerCase();
      ctx.setStrokeStyle(color);
      points.forEach(function (eachPoint, index) {
        // strokeStyle = eachPoint[2] === false ? 'transparent' : color;
        // if (ctx.strokeStyle !== strokeStyle) {
        //   ctx.stroke();
        //   ctx.closePath();
        //   ctx.beginPath();
        //   ctx.strokeStyle = strokeStyle;
        // }
        if (index === 0) {
          ctx.moveTo(eachPoint[0], eachPoint[1]);
        } else {
          ctx.lineTo(eachPoint[0], eachPoint[1]);
        }
      });

      ctx.stroke();
      ctx.closePath();
      //console.log("ctx get line dash",ctx.getLineDash())
    }
  }, {
    key: 'drawRect',
    value: function drawRect(x, y, width, height, fillStyle) {
      //width-=3;
      var ctx = this.ctx;
      // ctx.fillStyle = fillStyle;
      if (x && y && width && height) {
        ctx.beginPath();
        //ctx.globalAlpha=1;
        ctx.setFillStyle(fillStyle);
        ctx.rect(x, y, width, height);
        ctx.fill();
        ctx.closePath();
      }
    }

    //绘制矩形图

  }, {
    key: 'drawRectEmpty',
    value: function drawRectEmpty(x, y, width, height, fillStyle) {
      //console.log("debug ",x, y, width, height)
      width -= 3;
      var ctx = this.ctx;
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = fillStyle;
      //ctx.strokeRect(x, y, width, height);
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x, y);
      ctx.stroke();

      ctx.closePath();
    }
  }, {
    key: 'drawCircle',
    value: function drawCircle(x, y, radius, fillStyle) {
      var lineWidth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var strokeStyle = arguments[5];

      var ctx = this.ctx;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.closePath();
      // ctx.fillStyle = fillStyle;
      ctx.setFillStyle(fillStyle);
      // ctx.lineWidth = lineWidth;
      ctx.setLineWidth(lineWidth * this.pixelRadio);
      // ctx.strokeStyle = strokeStyle;
      ctx.setStrokeStyle(strokeStyle);
      ctx.fill();
    }
  }, {
    key: 'normalizeDrawLinePoint',
    value: function normalizeDrawLinePoint(point) {
      if (this.pixelRadio === 1) {
        var intPoint = parseInt(point, 10);
        return intPoint > point ? intPoint - 0.5 : intPoint + 0.5;
      }
      return point;
    }

    /* eslint class-methods-use-this: 0 */

  }, {
    key: 'measureText',
    value: function measureText(text) {
      // return this.ctx.measureText(text).width;
      // 计算text的半角长度后乘以每个半角字符的宽度
      return text.replace(/[\u0391-\uFFE5]/g, 'aa').length * 5 * this.pixelRadio;
    }
  }]);

  return Canvas;
}();

/* harmony default export */ __webpack_exports__["a"] = (Canvas);

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_util_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_index_js__ = __webpack_require__(18);




/**
 * Created by jiagang on 16/2/18.
 */



var oneMinute = 1 * 60 * 1000;
var oneDay = 1 * 24 * 60 * oneMinute;

// 默认股票交易时间
var defaultTimeInfo = function () {
  var now = new Date();
  var year = now.getFullYear();
  var month = ('0' + (now.getMonth() + 1)).slice(-2);
  var day = ('0' + now.getDate()).slice(-2);
  var date = [year, month, day].join('');
  return {
    RiQi: date,
    JiaoYiShiJianDuan: [{
      KaiShiShiJian: '0930',
      JieShuShiJian: '1130',
      KaiShiRiQi: date,
      JieShuRiQi: date
    }, {
      KaiShiShiJian: '1300',
      JieShuShiJian: '1500',
      KaiShiRiQi: date,
      JieShuRiQi: date
    }],
    JiHeJingJiaDianShu: 15,
    ShiQu: 8,
    ZuoShou: 0
  };
}();

//将2018-05-30 09:30 这种转成 uinx毫秒时间戳
var getTime = function getTime(dateParam, hourMinute, timeZone) {
  var date = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(dateParam);
  var year = parseInt(date.substr(0, 4), 10);
  var month = parseInt(date.substr(4, 2), 10) - 1;
  var day = parseInt(date.substr(6, 2), 10);
  var hour = parseInt(hourMinute / 100, 10) - timeZone;
  var minute = hourMinute % 100;
  return Date.UTC(year, month, day, hour, minute);
};

var DataProvider = function () {

  //指标-分笔行情
  /*
    maDataStore = new DataStore({
      serviceUrl: '/indicator/calc',
      idProperty: ' ',
      otherParams: {
        name: 'MA',
        text: 'MA1:MA(CLOSE,P1);MA2:MA(CLOSE,P2);MA3:MA(CLOSE,P3);MA4:MA(CLOSE,P4);',
        parameter: 'P1=5,P2=10,P3=30,P4=60',
      },
    });*/
  function DataProvider(params) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, DataProvider);

    this.klineDataStore = __WEBPACK_IMPORTED_MODULE_5__store_index_js__["a" /* default */].state.wsobj;
    this.maDataStore = __WEBPACK_IMPORTED_MODULE_5__store_index_js__["a" /* default */].state.wsobj;
    this.minDataStore = __WEBPACK_IMPORTED_MODULE_5__store_index_js__["a" /* default */].state.wsobj;

    this.params = params;
    //this.klineDataStore.dataParser.direct = true;
    //this.maDataStore.dataParser.direct = true;
    //this.minDataStore.dataParser.direct = true;
  }

  //分时走势
  /*
    minDataStore = new DataStore({
      serviceUrl: '/quote/min',
      idProperty: ' ',
    });*/

  //K线-K线服务
  /*
  klineDataStore = new DataStore({
    serviceUrl: '/quote/kline',
    idProperty: ' ',
  });*/


  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(DataProvider, [{
    key: 'getKline',
    value: function getKline(params) {
      var withMA = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var klineQuery = this.klineDataStore.query('/quote/kline', __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, this.params, params)).then(function (data) {
        return data[0] && data[0].Data;
      });
      return [klineQuery, withMA && this.getMA(params)];
    }
  }, {
    key: 'subscribeKline',
    value: function subscribeKline(params) {
      var _this = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : __WEBPACK_IMPORTED_MODULE_4__utils_util_js__["c" /* noop */];

      var request = this.klineDataStore.subscribe('/quote/kline', __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, this.params, { start: -1 }, params), function (data) {
        console.log('kline', params, data);

        if (!(data instanceof Error)) {
          var kline = data[0] && data[0].Data;
          callback(kline);

          _this.getMA(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, { start: -1 }, params)).then(function (ma) {
            if (kline && ma && kline[0] && ma[0] && kline[0].ShiJian === ma[0].ShiJian) {
              var maResult = ma[0].JieGuo;
              __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(kline[0], {
                MA5: maResult[0],
                MA10: maResult[1],
                MA20: maResult[2],
                MA30: maResult[3]
              });
            }
            callback(kline);
          });
        }
      });
      request.cancel = function () {
        _this.klineDataStore.cancel(request.qid);
      };
      return request;
    }
  }, {
    key: 'getMA',
    value: function getMA(params) {
      var _params = { name: 'MA',
        text: 'MA1:MA(CLOSE,P1);MA2:MA(CLOSE,P2);MA3:MA(CLOSE,P3);MA4:MA(CLOSE,P4);',
        parameter: 'P1=5,P2=10,P3=30,P4=60' };

      return this.maDataStore.query('/indicator/calc', __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, this.params, params, _params)).then(function (data) {
        return data[0] && data[0].ShuJu;
      }).catch(function () {
        return [];
      });
    }
  }, {
    key: '_initMinCache',
    value: function _initMinCache(timeInfo) {
      var times = timeInfo.JiaoYiShiJianDuan;
      var timeZone = timeInfo.ShiQu;
      this.minCache = {
        lastClose: timeInfo.ZuoShou
      };
      var minTimes = this.minCache.minTimes = [];
      if (times && times.length > 0) {
        var lastTime = 0;
        var startTime = void 0;
        var endTime = void 0;

        times.forEach(function (eachTime, index) {
          startTime = getTime(eachTime.KaiShiRiQi, eachTime.KaiShiShiJian, timeZone);
          endTime = getTime(eachTime.JieShuRiQi, eachTime.JieShuShiJian, timeZone);

          // 跨天
          if (endTime < startTime) {
            endTime += oneDay;
          }
          if (startTime < lastTime) {
            startTime += oneDay;
            endTime += oneDay;
          }

          // 跳过除第一段时间的开始时间
          if (index > 0) {
            startTime += oneMinute;
          }
          while (startTime <= endTime) {
            minTimes.push(startTime);
            startTime += oneMinute;
          }
          lastTime = endTime;
        });

        // FIXME 默认包含集合进价的数据
        var prefixMinute = 0;
        startTime = minTimes[0];

        for (var i = 1; i <= prefixMinute; i += 1) {
          minTimes.unshift(startTime - i * oneMinute);
        }
      }
    }
  }, {
    key: '_updateMinCache',
    value: function _updateMinCache(time, data) {
      var minTimes = this.minCache.minTimes || [];
      var index = this.minCache.minTimes.indexOf(time);
      if (index >= 0) {
        this.minCache[time] = data;
      } else {
        // 没有对应时间时，认为交易日期有跨越，对应修正交易时间数据
        var firstTime = minTimes[0];
        var overDays = parseInt((time - firstTime) / oneDay, 10);
        var overTime = overDays * oneDay;
        index = minTimes.indexOf(time - overTime);

        // 找到跨越时间点将之后的数据统一修改日期到数据对应的日期
        if (index >= 0) {
          while (index < minTimes.length) {
            var oldTime = minTimes[index];
            oldTime += overTime;
            minTimes[index] = oldTime;
            index += 1;
          }
          this.minCache[time] = data;
        }
      }
    }

    //本地存储

  }, {
    key: 'saveDataLocal',
    value: function saveDataLocal(minData, ckey, callback) {
      var _this2 = this;

      if (!this.minCache || this.minCache === undefined) {
        this._initMinCache(minData.JiaoYiShiJianDuan ? minData : defaultTimeInfo);
      }
      minData = minData.Data;
      if (minData && minData.length > 0) {
        minData.forEach(function (eachData) {
          var time = eachData.ShiJian * 1000;
          _this2._updateMinCache(time, eachData);
        });
      }
      //console.log('minCache',this.minCache);
      callback(this.minCache);
      var temp = this.minCache;
      this.minCache = null;
      wx.setStorage({
        key: ckey,
        data: temp,
        success: function success() {},
        fail: function fail() {}
      });
    }

    /* eslint no-underscore-dangle: 0 */

  }, {
    key: 'subscribeMin',
    value: function subscribeMin() {
      var _this3 = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __WEBPACK_IMPORTED_MODULE_4__utils_util_js__["c" /* noop */];

      this.minCache = null;

      var request = this.minDataStore.subscribe('/quote/min', this.params, function (data) {
        console.log('subscribeMin', data);
        if (data && !(data instanceof Error) && data.length > 0) {
          var minData = data[0];

          // 清盘
          if (minData.QingPan === 1) {
            _this3.minCache = null;
            callback(_this3.minCache);
            return;
          }

          var ckey = "stock-min";
          var that = _this3;

          wx.getStorage({
            key: ckey,
            success: function success(result) {
              that.minCache = result.data;
              that.saveDataLocal(minData, ckey, callback);
            },
            fail: function fail() {
              that.saveDataLocal(minData, ckey, callback);
            }
          });
          //console.log("minCache getSync is ",this.minCache)
        }
      });
      request.cancel = function () {
        _this3.minDataStore.cancel(request.qid);
      };
      return request;
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.klineDataStore.cancel();
      this.maDataStore.cancel();
      this.minDataStore.cancel();
    }
  }]);

  return DataProvider;
}();

/* harmony default export */ __webpack_exports__["a"] = (DataProvider);

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_math_sign__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_math_sign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_math_sign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_get__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__charts_Chart_js__ = __webpack_require__(104);











var KlineChart = function (_Chart) {
  __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits___default()(KlineChart, _Chart);

  function KlineChart() {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, KlineChart);

    return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn___default()(this, (KlineChart.__proto__ || __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default()(KlineChart)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default()(KlineChart, [{
    key: 'initData',
    value: function initData() {
      var _this2 = this;

      __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_get___default()(KlineChart.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default()(KlineChart.prototype), 'initData', this).call(this);

      // 初始化数据,取options中data字段作为初始数据
      this.data = this.options.data || [];
      this.cache = [].concat(this.data);

      this.period = this.options.period || '1day';
      this.split = this.options.split != null ? this.options.split : 1;

      // 最大显示条数(理论数值,不能大于重画时计算出的最大条数)
      this.maxCount = this.options.maxCount || Number.MAX_VALUE;

      // 最小显示条数
      this.minCount = this.options.minCount || 10;

      // 最大预加载数据条数,默认200,预加载数据条数取当前显示条数和最大预加载数据条数中较小的一个值
      this.maxPreLoadCount = this.options.maxPreLoadCount || 300;

      // 位置表示显示数据在缓存中开始位置
      this.position = 0;

      this.hasMoreData = true;

      // 初始需要展示的数据条数,默认80
      this.reCalculate(0, this.options.initCount || 80);

      // 订阅K线数据变化(更新最新的1条数据)
      var subscribe = this.dataProvider.subscribeKline({
        period: this.period,
        split: this.split
      }, function (data) {
        // chart 移除则停止订阅
        if (!_this2.canvas.hasChart(_this2)) {
          subscribe.cancel();
          return;
        }

        if (data && data.length > 0) {
          if (_this2.cache.length > 0) {
            _this2.cache[_this2.cache.length - 1] = data[0];
          }
          _this2.reCalculate();
        }
      });
    }
  }, {
    key: 'redraw',
    value: function redraw() {
      if (this.data) {
        __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_get___default()(KlineChart.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default()(KlineChart.prototype), 'redraw', this).call(this);
      }
    }
  }, {
    key: 'initChart',
    value: function initChart() {
      __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_get___default()(KlineChart.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default()(KlineChart.prototype), 'initChart', this).call(this);

      // 根据画板宽度调整显示数据个数,最多1像数显示一条数据(单条数据小于1像数时,需要调整显示个数),间隙和影线宽度都是固定的1像数
      var count = this.data.length;

      // FIXME count = 0
      var pixelPerWithSeparator = this.canvas.canvasWidth / count;

      var pixelPer = Math.max(pixelPerWithSeparator - 1, 0.5);
      if (pixelPerWithSeparator < 1) {
        pixelPerWithSeparator = 1;
        count = this.canvas.canvasWidth;
        this.data = this.data.slice(0, count);
        this.maxCount = count;
      } else if (pixelPer > 50) {
        // 超过最大值50,则取最大值
        pixelPer = 50;
      }

      this.pixelPer = pixelPer;
      this.pixelPerWithSeparator = pixelPerWithSeparator;

      // 计算最大和最小值
      var MAX_VALUE = Number.MAX_VALUE;
      var MIN_VALUE = Number.MIN_VALUE;
      var min = MAX_VALUE;
      var max = 0;
      var maxVolume = 0;
      this.data.forEach(function (eachData) {
        max = Math.max(max, eachData.ZuiGaoJia || MIN_VALUE, eachData.MA5 || MIN_VALUE, eachData.MA10 || MIN_VALUE, eachData.MA20 || MIN_VALUE, eachData.MA30 || MIN_VALUE);
        min = Math.min(min, eachData.ZuiDiJia || MAX_VALUE, eachData.MA5 || MAX_VALUE, eachData.MA10 || MAX_VALUE, eachData.MA20 || MAX_VALUE, eachData.MA30 || MAX_VALUE);
        maxVolume = Math.max(maxVolume, eachData.ChengJiaoLiang);
      });

      // 最大值和最小值范围增加10%
      this.max = max > min ? max + (max - min) * 0.1 : max * 1.1;
      this.min = max > min ? min - (max - min) * 0.1 : max * 0.9;
      this.maxVolume = maxVolume;

      this.candleChartHeight = this.mainChartHeight;
      this.candleYPixelRadio = this.candleChartHeight / (this.max - this.min);
      this.volumeYPixelRadio = this.volumeChartHeight / maxVolume;
    }
  }, {
    key: 'formatXAxisLabel',
    value: function formatXAxisLabel(text) {
      var hasDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var date = new Date(text);
      return hasDay ? __WEBPACK_IMPORTED_MODULE_9__charts_Chart_js__["a" /* default */].formatDate(date, 'yyyyMMdd') : __WEBPACK_IMPORTED_MODULE_9__charts_Chart_js__["a" /* default */].formatDate(date, 'yyyy-MM');
    }

    /* eslint class-methods-use-this: 0 */

  }, {
    key: 'isUp',
    value: function isUp(open, close, lastClose) {
      // FIXME 还需要考虑当天收盘和昨收相同的情况
      return open !== close ? close > open : close > lastClose;
    }
  }, {
    key: 'drawChart',
    value: function drawChart() {
      var _this3 = this;

      var maPoints = [[], [], [], []];
      var color = ['#222222', '#e78512', '#2e8ae6', '#cc2996'];
      var pixelPerWithSeparator = this.pixelPerWithSeparator;
      var pixelPer = this.pixelPer;
      var halfPixelPer = pixelPer / 2;
      var hasVolume = this.hasVolume;
      var candleYPixelRadio = this.candleYPixelRadio;
      var max = this.max;
      var canvas = this.canvas;
      var lastLabel = void 0;

      var lastDrawIndex = 0;

      // 画出每根k线和量
      /* eslint no-param-reassign: 0 */

      var timeArr = [];
      this.data.forEach(function (eachData, index) {
        var lastClose = eachData.lastClose;

        // 添加数据附加属性
        if (!lastClose) {
          lastClose = eachData.lastClose = index > 0 ? _this3.data[index - 1].ShouPanJia : 0;
          eachData.time = eachData.ShiJian * 1000;
          eachData.isUp = _this3.isUp(eachData.KaiPanJia, eachData.ShouPanJia, lastClose);
          eachData.xAxisLabel = _this3.formatXAxisLabel(eachData.time, true);
        }

        timeArr.push(eachData.xAxisLabel);

        //console.log("label is ",currentLabel)

        // 满足条件画x轴坐标(跨月的第一交易日并且两个坐标点之间的距离不小于指定大小)
        /*      if (currentLabel !== lastLabel) {
                lastLabel = currentLabel;
                if ((index - lastDrawIndex) * pixelPerWithSeparator > pix) {
                   // -30 修复时间轴最右侧日期显示一半的问题
                  this.drawXAxisGridLine((pixelPerWithSeparator * index) + halfPixelPer-30, currentLabel);
                  lastDrawIndex = index;
                }
              }*/

        _this3.drawCandle(index, eachData.KaiPanJia, eachData.ShouPanJia, eachData.ZuiGaoJia, eachData.ZuiDiJia, eachData.isUp);
        if (hasVolume) {
          _this3.drawVolume(index, eachData.ChengJiaoLiang, eachData.isUp);
        }

        // MA
        if (eachData.MA5) {
          var x = pixelPerWithSeparator * index + halfPixelPer;
          if (index === 0) {
            x -= halfPixelPer;
          } else if (index === _this3.data.length - 1) {
            x += halfPixelPer;
          }
          maPoints[0].push([x, candleYPixelRadio * (max - eachData.MA5)]);
          maPoints[1].push([x, candleYPixelRadio * (max - eachData.MA10)]);
          maPoints[2].push([x, candleYPixelRadio * (max - eachData.MA20)]);
          maPoints[3].push([x, candleYPixelRadio * (max - eachData.MA30)]);
        }
      });

      var pix = this.canvas.canvasWidth / 2;

      for (var i = 0; i < 3; i++) {
        if (i == 0) {
          this.drawXAxisGridLine(i * pix + 21 * this.canvas.pixelRadio, timeArr[0], '#dddddd');
        } else if (i == 1) {
          this.drawXAxisGridLine(i * pix, timeArr[Math.round(timeArr.length / 2)], '#dddddd', 'middle');
        } else if (i == 2) {
          this.drawXAxisGridLine(i * pix - 29 * this.canvas.pixelRadio, timeArr[timeArr.length - 1], '#dddddd');
        }
      }
      timeArr = null;

      maPoints.forEach(function (eachPoints, index) {
        canvas.drawPath(eachPoints, color[index]);
      });

      // 按压时显示十字光标
      if (this.pressPoint) {
        var _pressPoint = this.pressPoint,
            x = _pressPoint.x,
            y = _pressPoint.y;

        var index = parseInt(x / pixelPerWithSeparator, 10);
        var data = this.data[index] || {};

        // x
        this.drawXAxisGridLine(pixelPerWithSeparator * index + pixelPerWithSeparator / 2, this.formatXAxisLabel(data.time, true), this.pointerLineColor, undefined, true, true);

        // y
        if (y < this.candleChartHeight && y > 0) {
          this.drawYAxisGridLine(y, this.max - y / this.candleYPixelRadio, this.pointerLineColor, y > this.candleChartHeight / 2 ? 'top' : 'bottom', true);
        }

        // 显示详细信息
        this.drawTooltip(data);
      }
    }

    //k线时间轴显示和竖线

  }, {
    key: 'drawXAxisGridLine',
    value: function drawXAxisGridLine(x, text) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.gridLineColor;
      var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'middle';
      var withBackground = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var full = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var tickColor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : this.tickColor;

      //不显示竖线
      //this.canvas.drawLine(x, 0, x, full ? this.canvas.canvasHeight : this.mainChartHeight, this.gridLineWidth, color);
      if (text) {
        var textWidth = this.canvas.measureText(text);
        var fontSize = this.fontSize;
        var textX = position === 'middle' ? x - textWidth / 2 : x;
        var textY = this.mainChartHeight + fontSize + 2;

        this.canvas.drawText(text, textX, textY, fontSize, tickColor, withBackground && this.tickBackgroundColor);
      }
    }
  }, {
    key: 'drawTooltip',
    value: function drawTooltip(data) {
      var _this4 = this;

      var startX = 50;
      var fontSize = this.fontSize;
      var y = fontSize + 2;
      var color = this.getColor(this.isUp(data.KaiPanJia, data.ShouPanJia, data.lastClose));

      [{ label: '\u65E5\u671F:' + this.formatXAxisLabel(data.time, true), labelColor: '#555555' }, { label: '\u5F00:' + __WEBPACK_IMPORTED_MODULE_9__charts_Chart_js__["a" /* default */].formatNumber(data.KaiPanJia, 2) }, { label: '\u6536:' + __WEBPACK_IMPORTED_MODULE_9__charts_Chart_js__["a" /* default */].formatNumber(data.ShouPanJia, 2) }, { label: '\u9AD8:' + __WEBPACK_IMPORTED_MODULE_9__charts_Chart_js__["a" /* default */].formatNumber(data.ZuiGaoJia, 2) }, { label: '\u4F4E:' + __WEBPACK_IMPORTED_MODULE_9__charts_Chart_js__["a" /* default */].formatNumber(data.ZuiDiJia, 2) }, { label: '\u6DA8\u8DCC:' + __WEBPACK_IMPORTED_MODULE_9__charts_Chart_js__["a" /* default */].formatNumber((data.ShouPanJia - data.lastClose) / data.lastClose, 2, '%'), labelColor: this.getColor(data.ShouPanJia >= data.lastClose) }, { label: '\u91CF:' + __WEBPACK_IMPORTED_MODULE_9__charts_Chart_js__["a" /* default */].formatNumber(data.ChengJiaoLiang, 2, 'K/M') }].forEach(function (_ref) {
        var label = _ref.label,
            _ref$labelColor = _ref.labelColor,
            labelColor = _ref$labelColor === undefined ? color : _ref$labelColor;

        _this4.canvas.drawText(label, startX, y, fontSize, labelColor);
        startX += _this4.canvas.measureText(label) + 10;
      });
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground() {
      // 画出纵坐标和网格线
      var max = this.max;
      var min = this.min;
      this.drawYAxisGridLine(0, max, undefined, 'bottom');
      this.drawYAxisGridLine(this.candleChartHeight, min, undefined, 'bottom', undefined, undefined, 12 * this.canvas.pixelRadio);

      this.drawYAxisGridLine(this.candleChartHeight / 2, max - (max - min) / 2);
      this.drawYAxisGridLine(this.candleChartHeight / 4, max - (max - min) / 4);
      this.drawYAxisGridLine(this.candleChartHeight * (3 / 4), max - (max - min) * (3 / 4));
      this.drawYAxisGridLine(this.canvas.canvasHeight - this.volumeChartHeight, this.maxVolume, null, 'bottom');

      //0坐标 不显示
      //this.drawYAxisGridLine(this.canvas.canvasHeight, '0');
    }
  }, {
    key: 'drawYAxisGridLine',
    value: function drawYAxisGridLine(y, text) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.gridLineColor;
      var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'top';
      var withBackground = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var tickColor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : this.tickColor;
      var textMove = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;


      if (position == 'bottom') {
        this.canvas.drawLine(0, y, this.canvas.canvasWidth, y, this.gridLineWidth, color);
      } else {
        this.canvas.drawLineDash(0, y, this.canvas.canvasWidth, y, this.gridLineWidth, color);
      }

      if (text) {
        textMove > 0 && (y -= textMove);
        // 记录Y轴坐标位置
        var yAxisTicks = this.yAxisTicks;
        yAxisTicks.push({
          text: this.formatYAxisLabel(text),
          x: 2 * this.canvas.pixelRadio,
          y: position === 'top' ? y - 2 : y + this.fontSize + 2,
          tickColor: tickColor,
          withBackground: withBackground
        });
      }
    }
  }, {
    key: 'drawCandle',
    value: function drawCandle(index, open, close, top, low, isUp) {
      var width = this.pixelPer;
      var x = this.pixelPerWithSeparator * index + this.pixelPerWithSeparator / 2 - width / 2;
      var y = this.candleYPixelRadio * (this.max - open);
      var height = open === close ? 1 : this.candleYPixelRadio * (this.max - close) - y;
      height = Math.abs(height) < 1 ? __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_math_sign___default()(height) : height;
      var color = this.getColor(isUp);

      if (width > 1) {
        if (isUp) {
          this.canvas.drawRectEmpty(x, y, width, height, color);
        } else {
          if (!isUp) {
            color = '#1ca049';
          }
          this.canvas.drawRect(x, y, width, height, color);
        }
      }

      // 上下影线
      var x1 = x + width / 2 - 1;
      var y1 = this.candleYPixelRadio * (this.max - top);
      var y2 = this.candleYPixelRadio * (this.max - low);

      this.canvas.drawLine(x1, y1, x1, y + height, 0.6, color);
      this.canvas.drawLine(x1, y, x1, y2, 0.6, color);
    }
  }, {
    key: 'drawVolume',
    value: function drawVolume(index, volume, isUp) {
      var width = this.pixelPer;
      var x = this.pixelPerWithSeparator * index + this.pixelPerWithSeparator / 2 - width / 2;
      var y = this.canvas.canvasHeight;
      var height = -this.volumeYPixelRadio * volume;
      if (isUp) {
        this.canvas.drawRectEmpty(x, y, width, height, this.getColor(isUp));
      } else {
        this.canvas.drawRect(x, y, width, height, this.getColor(isUp));
      }
    }
  }, {
    key: 'reCalculate',
    value: function reCalculate() {
      var _this5 = this;

      var move = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var count = arguments[1];

      // 重新计算显示数据在缓存数据中的左偏移位置和长度
      var cacheCount = this.cache.length;
      var requestCount = 0;
      var currentCount = this.data.length;
      var leftPosition = this.position;

      // 如果move为正数,表示向左移动,判断缓存数据是否存在,缓存数据不足则加载更多数据,负数表示向右移动直接从缓存中取得数据
      if (move > 0) {
        if (leftPosition < move) {
          if (this.hasMoreData) {
            requestCount = move - leftPosition;
          } else {
            leftPosition = 0;
          }
        } else {
          leftPosition -= move;
        }
      } else if (move < 0) {
        var restCount = cacheCount - leftPosition - currentCount;
        if (restCount > -move) {
          leftPosition += -move;
        } else {
          leftPosition += restCount;
        }
      }

      // count 重设显示数据个数(先重新计算左偏移,再重设count)
      // 限制最小个数
      if (count) {
        count = Math.max(count, this.minCount);
      }

      // 如果count比当前个数小,则直接左偏移向右移动count/2
      if (count < currentCount) {
        leftPosition += parseInt((currentCount - count) / 2, 10);
        currentCount = count;
      } else if (count > currentCount) {
        // 限制显示的最大个数
        count = Math.min(count, this.maxCount);
        var leftOffsetCount = parseInt((count - currentCount) / 2, 10);

        leftOffsetCount += Math.max(leftOffsetCount - (cacheCount - leftPosition - currentCount), 0);

        // 如果缓存数据不足则加载更多数据
        if (leftPosition < leftOffsetCount && this.hasMoreData) {
          requestCount = leftOffsetCount - leftPosition;
        } else {
          leftPosition = Math.max(leftPosition - leftOffsetCount, 0);
          currentCount = count;
        }
      }

      // requestCount不为零则加载数据后再做reCalculate
      if (requestCount > 0) {
        // 计算请求数据的start和count,count需要加上预加载个数(默认等于当前显示的数据个数,但不能超过限制的最大值)
        // 初始currentCount为0时,请求个数为初始显示个数的2倍
        requestCount += Math.min(currentCount || requestCount, this.maxPreLoadCount);
        var start = -(requestCount + cacheCount);
        this.loadMoreData(start, requestCount).then(function () {
          _this5.reCalculate(move, count);
        });
        return;
      }

      // 根据新的左偏移位置和新的数据个数重设显示数据data后重画图形
      this.data = this.cache.slice(leftPosition, leftPosition + currentCount);
      this.position = leftPosition;
      this.redraw();
    }

    /**
     * 动态加载数据,添加到缓存cache中并且修改当前位置
     */

  }, {
    key: 'loadMoreData',
    value: function loadMoreData(start, count) {
      var _this6 = this;

      this.loading = true;
      this.canvas && this.canvas.toggleMask(true);
      var lastDataProvider = this.dataProvider;

      var _dataProvider$getKlin = this.dataProvider.getKline({
        period: this.period,
        split: this.split,
        start: start,
        count: count
      }),
          _dataProvider$getKlin2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default()(_dataProvider$getKlin, 2),
          klinePromise = _dataProvider$getKlin2[0],
          maPromise = _dataProvider$getKlin2[1];

      return klinePromise.then(function (klineData) {
        if (klineData && lastDataProvider === _this6.dataProvider) {
          // 合并数据到缓存中,判断是否还有更多数据(请求到的数据长度小于count大小或者请求到的数据的时间在cache中已经存在)
          if (klineData.length < count) {
            _this6.hasMoreData = false;
          }
          var cacheStartTime = _this6.cache[0] ? _this6.cache[0].ShiJian : Number.MAX_VALUE;
          var eachData = void 0;
          for (var i = klineData.length; i > 0; i -= 1) {
            eachData = klineData[i - 1];
            if (eachData.ShiJian < cacheStartTime) {
              _this6.cache.unshift(eachData);
              _this6.position += 1;
            } else {
              _this6.hasMoreData = false;
              break;
            }
          }
        }
        _this6.loading = false;

        // 再等待MA数据返回后更新缓存后重画chart
        maPromise.then(function (maData) {
          // 合并K线和MA数据
          if (maData) {
            var maIndex = 0;
            var maLength = maData.length;
            klineData.forEach(function (eachKline) {
              var kTime = eachKline.ShiJian;
              while (maIndex < maLength) {
                var eachMA = maData[maIndex];
                var maTime = eachMA.ShiJian;
                var maResult = eachMA.JieGuo;
                if (maTime > kTime) {
                  break;
                } else if (maTime === kTime) {
                  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(eachKline, {
                    MA5: maResult[0],
                    MA10: maResult[1],
                    MA20: maResult[2],
                    MA30: maResult[3]
                  });
                }
                maIndex += 1;
              }
            });

            _this6.redraw();
          }
        });
      });
    }
  }, {
    key: 'panMove',
    value: function panMove(pressed, x, y, deltaX) {
      if (!this.loading) {
        if (pressed) {
          this.pressPoint = { x: x, y: y };
          this.redraw();
        } else if (this.pressPoint) {
          this.pressPoint = null;
          this.redraw();
        } else {
          var size = parseInt(deltaX / this.pixelPerWithSeparator, 10);
          if (size !== 0) {
            this.reCalculate(size);
            return true;
          }
        }
      }
      return false;
    }
  }, {
    key: 'pinchMove',
    value: function pinchMove(scale) {
      if (!this.loading) {
        var deltaX = this.canvas.canvasWidth * scale;
        var offsetCount = parseInt(deltaX / this.pixelPerWithSeparator, 10);
        if (Math.abs(offsetCount) > 1) {
          this.reCalculate(0, this.data.length + offsetCount);
          return true;
        }
      }
      return false;
    }
  }]);

  return KlineChart;
}(__WEBPACK_IMPORTED_MODULE_9__charts_Chart_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (KlineChart);

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__charts_Chart_js__ = __webpack_require__(104);










var MinChart = function (_Chart) {
  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default()(MinChart, _Chart);

  function MinChart() {
    var _ref;

    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, MinChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = MinChart.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(MinChart)).call.apply(_ref, [this].concat(args))), _this), _this.dateArr = ["09:30", "10:30", "11:30", "14:00", "15:00"], _temp), __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(MinChart, [{
    key: 'initData',
    value: function initData() {
      var _this2 = this;

      wx.removeStorage({
        key: "stock-min",
        success: function success() {},
        fail: function fail() {}
      });

      __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(MinChart.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(MinChart.prototype), 'initData', this).call(this);

      this.cache = null;

      this.canvas && this.canvas.toggleMask(true);

      // 订阅数据,有数据推送到达时重画
      var subscribe = this.dataProvider.subscribeMin(function (data) {
        //console.log("data is ",data)
        // chart 移除则停止订阅
        if (!_this2.canvas.hasChart(_this2)) {
          subscribe.cancel();
          return;
        }
        _this2.cache = data;
        _this2.redraw();
      });
    }
  }, {
    key: 'initChart',
    value: function initChart() {
      var _this3 = this;

      __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(MinChart.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(MinChart.prototype), 'initChart', this).call(this);
      // 是否显示均价, 默认true
      this.hasAvgPrice = this.options.hasAvgPrice !== false;

      var lastClose = this.cache.lastClose;

      // 计算最大和最小值
      var MAX_VALUE = Number.MAX_VALUE;
      var MIN_VALUE = Number.MIN_VALUE;
      var min = MAX_VALUE;
      var max = 0;
      var maxVolume = 0;
      if (lastClose) {
        // 昨收价存在,取距离昨收价最大偏移量作为最大绝对值
        var maxOffset = 0;
        var eachData = void 0;
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(this.cache).forEach(function (key) {
          eachData = _this3.cache[key];
          if (eachData && eachData.ChengJiaoJia) {
            maxOffset = Math.max(maxOffset, Math.abs(eachData.ChengJiaoJia - lastClose));
            maxVolume = Math.max(maxVolume, eachData.ChengJiaoLiang);
          }
        });
        max = lastClose + maxOffset;
        min = lastClose - maxOffset;
      } else {
        // 昨收价不存在时
        var _eachData = void 0;
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(this.cache).forEach(function (key) {
          _eachData = _this3.cache[key];
          if (_eachData && _eachData.ChengJiaoJia) {
            max = Math.max(max, _eachData.ChengJiaoJia || MIN_VALUE);
            min = Math.min(min, _eachData.ChengJiaoJia || MAX_VALUE);
            maxVolume = Math.max(maxVolume, _eachData.ChengJiaoLiang);
          }
        });
      }

      // 最大值和最小值范围增加10%
      this.max = max > min ? max + (max - min) * 0.1 : max * 1.1;
      this.min = max > min ? min - (max - min) * 0.1 : max * 0.9;
      this.maxVolume = maxVolume;

      this.minChartHeight = this.mainChartHeight;
      this.minYPixelRadio = this.minChartHeight / (this.max - this.min);
      this.volumeYPixelRadio = this.volumeChartHeight / maxVolume;
      this.pixelPer = this.canvas.canvasWidth / this.cache.minTimes.length;
    }

    /* eslint class-methods-use-this: 0 */

  }, {
    key: 'formatXAxisLabel',
    value: function formatXAxisLabel(text) {
      var hasDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var date = new Date(text);
      return hasDate ? __WEBPACK_IMPORTED_MODULE_8__charts_Chart_js__["a" /* default */].formatDate(date, 'yyyy-MM-dd hh:mm') : __WEBPACK_IMPORTED_MODULE_8__charts_Chart_js__["a" /* default */].formatDate(date, 'hh:mm');
    }
  }, {
    key: 'redraw',
    value: function redraw() {
      if (this.cache) {
        __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(MinChart.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(MinChart.prototype), 'redraw', this).call(this);
      }
      this.cache = null;
    }
  }, {
    key: 'drawChart',
    value: function drawChart() {
      var _this4 = this;

      var minTimes = this.cache.minTimes;
      var pixelPer = this.pixelPer;
      var pricePoints = [];
      var avgPricePoints = [];
      var hasAvgPrice = this.hasAvgPrice;
      var lastPrice = this.cache.lastClose;

      var timeArr = [];
      minTimes.forEach(function (time, index) {
        //console.log("time is ",time)
        var minData = _this4.cache[time];
        if (minData) {
          var isUp = minData.isUp = minData.ChengJiaoJia >= lastPrice;
          var x1 = pixelPer * index;
          var x2 = x1 + pixelPer / 2;
          minData.ChengJiaoJia && pricePoints.push([x2, (_this4.max - minData.ChengJiaoJia) * _this4.minYPixelRadio]);
          hasAvgPrice && minData.JunJia && avgPricePoints.push([x2, (_this4.max - minData.JunJia) * _this4.minYPixelRadio, !(minData.JunJia > _this4.max || minData.JunJia < _this4.min)]);
          _this4.hasVolume && _this4.drawVolume(index, minData.ChengJiaoLiang, isUp);
          lastPrice = minData.ChengJiaoJia;
        }

        var timeFormat = _this4.formatXAxisLabel(minTimes[index]);
        timeArr.push(timeFormat);

        //console.log("pix is ",pix,"------",pixelPer,"typeof ",typeof pix);
        /*      if (tickIndex && (tickIndex - lastTickIndex) * pixelPer > 50) {
        
                //A股单独计算时间坐标网格
                if(this.options.IsAstock != undefined && this.options.IsAstock){
                  let pix = this.canvas.canvasWidth/4;
                  if(this.dateArr.indexOf(timeFormat) != -1){
                     this.drawXAxisGridLine(((tickIndex-15)/60) * pix, timeFormat, '#dddddd');
                  }
                }else{
                  this.drawXAxisGridLine((pixelPer * tickIndex) + (pixelPer / 2), timeFormat, '#dddddd');
                }
                lastTickIndex = tickIndex;
              }*/
      });

      var pix = this.canvas.canvasWidth / 4;

      for (var i = 0; i < 5; i++) {
        if (i == 0) {

          if (__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(this.options.stock) != undefined) {
            var stock2bit = this.options.stock.substr(0, 2);
            if ((stock2bit == 'SH' || stock2bit == 'SZ') && timeArr[0] < '09:30') {
              timeArr[0] = '09:30';
            }
          }
          this.drawXAxisGridLine(i * pix, timeArr[0], '#dddddd', 'first');
        } else if (i == 2) {
          this.drawXAxisGridLine(i * pix, timeArr[Math.round(timeArr.length / 2)], '#dddddd', 'middle');
        } else if (i == 4) {
          this.drawXAxisGridLine(i * pix, timeArr[timeArr.length - 1], '#dddddd', 'end');
        } else {
          this.drawXAxisGridLine(i * pix, false, '#dddddd');
        }
      }
      timeArr = null;

      this.canvas.fillPath(pricePoints, this.minChartHeight, '#3e6ac5', 'rgba(230,239,254, 0.8)', 1);
      hasAvgPrice && this.canvas.drawPath(avgPricePoints, '#EB5F15');

      // 按压时显示十字光标
      if (this.pressPoint) {
        var _pressPoint = this.pressPoint,
            x = _pressPoint.x,
            y = _pressPoint.y;

        var index = parseInt(x / pixelPer, 10);
        var minTime = minTimes[index];
        var data = this.cache[minTime];
        if (data) {
          // x
          x = pixelPer * index + pixelPer / 2;
          this.drawXAxisGridLine(x, this.formatXAxisLabel(minTime), this.pointerLineColor, undefined, true, true);

          // y
          var price = data.ChengJiaoJia;
          y = (this.max - price) * this.minYPixelRadio;
          this.drawYAxisGridLine(y, price, this.pointerLineColor, y > this.minChartHeight / 2 ? 'top' : 'bottom', true, this.getColor(data.ChengJiaoJia >= this.cache.lastClose));
          this.canvas.drawCircle(x, y, 3, 'rgba(230, 100, 100, 0.8)');

          // 显示详细信息
          this.drawTooltip(data);
        }
      }
    }
  }, {
    key: 'drawXAxisGridLine',
    value: function drawXAxisGridLine(x, text) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.gridLineColor;
      var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'middle';
      var withBackground = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var full = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var tickColor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : this.tickColor;

      if (position == 'first') this.canvas.drawLine(x, 0, x, full ? this.canvas.canvasHeight : this.mainChartHeight, this.gridLineWidth, color);else this.canvas.drawLineDash(x, 0, x, full ? this.canvas.canvasHeight : this.mainChartHeight, this.gridLineWidth, color);
      if (text) {
        var textWidth = this.canvas.measureText(text);
        var fontSize = this.fontSize;
        var textX = void 0;
        if (position === 'middle') {
          textX = x - textWidth / 2;
        } else if (position == 'first') {
          textX = x + 2 * this.canvas.pixelRadio;
        } else if (position == 'end') {
          textX = x - 28 * this.canvas.pixelRadio;
        } else {
          textX = x;
        }
        var textY = this.mainChartHeight + fontSize + 2;

        this.canvas.drawText(text, textX, textY, fontSize, tickColor, withBackground && this.tickBackgroundColor);
      }
    }
  }, {
    key: 'drawVolume',
    value: function drawVolume(index, volume, isUp) {
      var x = this.pixelPer * index;
      var y = this.canvas.canvasHeight;
      var width = Math.max(0.5, this.pixelPer - 1);
      var height = -this.volumeYPixelRadio * volume;

      var color = isUp ? '#ee2c2c' : '#1ca049';
      this.canvas.drawRect(x, y, width, height, color);
    }
  }, {
    key: 'drawTooltip',
    value: function drawTooltip(data) {
      var _this5 = this;

      var fontSize = this.fontSize;
      var y = fontSize + 2;
      var lastClose = this.cache.lastClose;
      var startX = 50;
      [{ label: '\u65F6\u95F4:' + this.formatXAxisLabel(data.ShiJian * 1000), labelColor: '#555555' }, { label: '\u4EF7\u683C:' + __WEBPACK_IMPORTED_MODULE_8__charts_Chart_js__["a" /* default */].formatNumber(data.ChengJiaoJia, 2), labelColor: '#0095D9' }, this.hasAvgPrice && data.JunJia <= this.max && data.JunJia >= this.min ? {
        label: '\u5747\u4EF7:' + __WEBPACK_IMPORTED_MODULE_8__charts_Chart_js__["a" /* default */].formatNumber(data.JunJia, 2),
        labelColor: '#EB5F15'
      } : undefined, {
        label: '\u6DA8\u8DCC:' + __WEBPACK_IMPORTED_MODULE_8__charts_Chart_js__["a" /* default */].formatNumber((data.ChengJiaoJia - lastClose) / lastClose, 2, '%'),
        labelColor: this.getColor(data.ChengJiaoJia >= lastClose)
      }, { label: '\u6210\u4EA4\u91CF:' + __WEBPACK_IMPORTED_MODULE_8__charts_Chart_js__["a" /* default */].formatNumber(data.ChengJiaoLiang, 2, 'K/M'), labelColor: this.getColor(data.isUp) }].forEach(function () {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            label = _ref2.label,
            labelColor = _ref2.labelColor;

        if (label) {
          _this5.canvas.drawText(label, startX, y, fontSize, labelColor);
          startX += _this5.canvas.measureText(label) + 10;
        }
      });
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground() {
      var lastClose = this.cache.ZuoShou;
      var max = this.max;
      var min = this.min;

      // 画出纵坐标和网格线
      this.drawYAxisGridLine(0, max, undefined, 'bottom', undefined, this.getColor(true));
      this.drawYAxisGridLine(this.minChartHeight, min, undefined, 'bottom', undefined, this.getColor(false), 10 * this.canvas.pixelRadio);

      this.drawYAxisGridLine(this.minChartHeight / 2, lastClose || max - (max - min) / 2, undefined, 'bottom');
      this.drawYAxisGridLine(this.minChartHeight / 4, max - (max - min) / 4, undefined, undefined, undefined, this.getColor(true));
      this.drawYAxisGridLine(this.minChartHeight * (3 / 4), max - (max - min) * (3 / 4), undefined, undefined, undefined, this.getColor(false));

      //super.drawYAxisGridLine(this.canvas.canvasHeight, '0');
      __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(MinChart.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(MinChart.prototype), 'drawYAxisGridLine', this).call(this, this.canvas.canvasHeight - this.volumeChartHeight, this.maxVolume, null, 'bottom');
    }
  }, {
    key: 'drawYAxisGridLine',
    value: function drawYAxisGridLine(y, text) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.gridLineColor;
      var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'top';
      var withBackground = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var tickColor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : this.tickColor;
      var textMove = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

      __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(MinChart.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(MinChart.prototype), 'drawYAxisGridLine', this).call(this, y, text, color, position, withBackground, tickColor, textMove);

      if (text) {
        var yAxisTicks = this.yAxisTicks;
        var rightText = __WEBPACK_IMPORTED_MODULE_8__charts_Chart_js__["a" /* default */].formatNumber((text - this.cache.lastClose) / this.cache.lastClose, 2, '%', false);
        if (textMove > 0) y -= textMove;
        yAxisTicks.push({
          text: rightText,
          x: this.canvas.canvasWidth - this.canvas.measureText(rightText) - 5 * this.canvas.pixelRadio,
          y: position === 'top' ? y - 2 : y + this.fontSize + 2,
          tickColor: tickColor,
          withBackground: withBackground
        });
      }
    }
  }, {
    key: 'panMove',
    value: function panMove(pressed, x, y) {
      if (pressed) {
        this.pressPoint = { x: x, y: y };
      } else {
        this.pressPoint = null;
      }
      this.redraw();
    }
  }]);

  return MinChart;
}(__WEBPACK_IMPORTED_MODULE_8__charts_Chart_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (MinChart);

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(151);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    navigationBarTitleText: '大智慧行情'
  }
});

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_util_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_stockManager_js__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_index_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__charts_DataProvider_js__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__charts_Canvas_js__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__charts_MinChart_js__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__charts_KlineChart_js__ = __webpack_require__(162);


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
            code: 'SH601519', //jsonUrl
            YunDzhObj: '', //云平台行情源对象
            subHqD: '', //订阅行情数据对象
            zsHqd: '', //订阅指数行情
            fenbiHqD: '', //分笔行情数据
            chartType: 'min',
            period: 'min',
            dynaData: this.formatDyanData({}), //同步数据
            zsDynaData: '', //指数行情数据
            chartDataProvider: '', //数据集
            chartWidth: '', //图宽
            chartHeight: '', //图高
            chartWidth2: '', //图宽
            chartHeight2: '', //图高
            canvas: {}, //画布
            isPortfolio: false, //是否是自选股
            removePortListener: '', //删除自选监听
            pankou: false, //盘口
            stockNewsList: [], //个股新闻
            newsCurPage: 1, //新闻当前页
            AlterShowFlag: 0,
            AlterTxt: '',
            fromApp: false, //是否app打开
            isFoldUp: false,
            fiveOrFenbi: true, //显示 分笔还是 五档 =true是五档 =false是分笔
            fenbiList: [],
            stocktype: 1, //股票类型 1=上证指数 2=A股 3=港股 4=美股
            IsAstock: false
        };
    },

    computed: {
        FontClass: function FontClass() {
            var _class = '';
            if (this.dynaData.ZhangFu > 0) {
                _class = 'font-red';
            } else if (this.dynaData.ZhangFu < 0) {
                _class = 'font-green';
            } else {
                _class = 'font-gray';
            }
            return _class;
        }
    },
    onLoad: function onLoad(options) {
        var self = this;

        self.code = this.$root.$mp.query.code;

        this.chkStockType(self.code);
        //this.chartDataProvider = new DataProvider({obj:this.code});
        this.YunDzhObj = __WEBPACK_IMPORTED_MODULE_4__store_index_js__["a" /* default */].state.wsobj;
        this.loadDyanData();

        if (this.stocktype == 1) {
            this.loadZsDyanData(self.code);
        }

        this.loadFenbiData();
        this.loadChart();

        this.chkPortfolio();

        this.removeListener = __WEBPACK_IMPORTED_MODULE_3__utils_stockManager_js__["a" /* default */].onPortfolioChanged(function () {
            console.log('change stock');
            self.AlterShowFlag = 1;
            if (self.isPortfolio) {
                self.AlterTxt = '删除';
            } else {
                self.AlterTxt = '添加';
            }
            self.chkPortfolio();
            setTimeout(function () {
                self.AlterShowFlag = 0;
                self.AlterTxt = '';
            }, 700);
        });
    },
    onShow: function onShow() {
        var self = this;

        if (this.stockNewsList.length == 0) {
            this.stocknews();
        }
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

    methods: {
        preventTouchMove: function preventTouchMove() {
            return 0;
        },
        chkStockType: function chkStockType(code) {
            if (['SH000001', 'SZ399001', 'SZ399006'].includes(code)) {
                this.stocktype = 1;
            } else if (code.substr(0, 4) == 'SH60' || code.substr(0, 4) == 'SZ00' || code.substr(0, 4) == 'SZ30') {
                this.stocktype = 2;
                this.IsAstock = true;
            } else if (code.substr(0, 2) == 'HK') {
                this.stocktype = 3;
            } else if (code.substr(0, 2) == 'NY' || code.substr(0, 2) == 'NS') {
                this.stocktype = 4;
            } else {
                this.stocktype = 5;
            }
        },
        launchAppError: function launchAppError(e) {
            wx.showModal({
                title: '小帖士',
                content: "请前往APP商城下载大智慧 \n 为您提供更专业的服务",
                success: function success(res) {
                    if (res.confirm) {
                        console.log('点击确定');
                    } else {
                        console.log('点击取消');
                    }
                }
            });
        },
        chgfiveorfenbi: function chgfiveorfenbi() {
            this.fiveOrFenbi = !this.fiveOrFenbi;
        },
        gohome: function gohome() {
            wx.switchTab({
                url: '/pages/dzh/main'
            });
        },
        chgFoldUp: function chgFoldUp() {
            this.isFoldUp = !this.isFoldUp;
        },
        fmtNum: function fmtNum(num) {
            if (num > 10000 * 10000 * 10000) {
                return (num / (10000 * 10000 * 10000)).toFixed(2) + '万亿';
            } else if (num > 10000 * 10000) {
                return (num / (10000 * 10000)).toFixed(2) + '亿';
            } else if (num > 10000) {
                return (num / 10000).toFixed(2) + '万';
            } else {
                return num;
            }
        },
        chkPortfolio: function chkPortfolio() {
            var self = this;
            __WEBPACK_IMPORTED_MODULE_3__utils_stockManager_js__["a" /* default */].inPortfolio(self.code).then(function (result) {
                self.isPortfolio = result;
            });
        },
        chgPortfolio: function chgPortfolio() {
            if (this.isPortfolio) {
                //isPortfolio = true 删自选
                __WEBPACK_IMPORTED_MODULE_3__utils_stockManager_js__["a" /* default */].removePortfolio(this.code);
            } else {
                //isPortfolio = false 加自选
                __WEBPACK_IMPORTED_MODULE_3__utils_stockManager_js__["a" /* default */].addPortfolio(this.code);
            }
        },
        chkpankou: function chkpankou() {
            this.pankou = !this.pankou;
        },
        chgchart: function chgchart(ctype) {
            if (ctype == this.chartType) {
                return 0;
            }

            if (ctype == 'min') {
                this.chartType = ctype;
            } else {
                this.chartType = 'kline';
            }

            this.period = ctype;
            this.chartDataProvider.cancel(); //切换图，停止订阅之前的图
            this.loadChart();
        },
        formatDyanData: function formatDyanData(data) {
            console.log('formatDyanData', data);
            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({}, data, {
                upDown: data.ZhangDie > 0 ? 1 : data.ZhangDie < 0 ? 2 : 0,
                ShiJian: data.ShiJian ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_util_js__["a" /* formatDate */])(data.ShiJian * 1000, 'yyyy-MM-dd hh:mm:ss') : '--',
                ZuiXinJia: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_util_js__["b" /* formatNumber */])(data.ZuiXinJia),
                ZhangDie: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_util_js__["b" /* formatNumber */])(data.ZhangDie),
                ZhangFuTxt: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_util_js__["b" /* formatNumber */])(data.ZhangFu / 100, 2, '%'),
                KaiPanJia: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_util_js__["b" /* formatNumber */])(data.KaiPanJia),
                ZuoShou: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_util_js__["b" /* formatNumber */])(data.ZuoShou),
                ZuiGaoJia: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_util_js__["b" /* formatNumber */])(data.ZuiGaoJia),
                ZuiDiJia: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_util_js__["b" /* formatNumber */])(data.ZuiDiJia),
                ChengJiaoLiang: !data.ChengJiaoLiang ? '--' : this.fmtNum(data.ChengJiaoLiang),
                HuanShou: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_util_js__["b" /* formatNumber */])(data.HuanShou),
                ShiYingLv: !data.ShiYingLv ? '--' : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_util_js__["b" /* formatNumber */])(data.ShiYingLv),
                JingTaiShiYingLv: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_util_js__["b" /* formatNumber */])(data.JingTaiShiYingLv),
                ZongShiZhi: !data.ZongShiZhi ? '--' : this.fmtNum(data.ZongShiZhi * 10000),
                ChengJiaoE: !data.ChengJiaoE ? '--' : this.fmtNum(data.ChengJiaoE),
                LiuTongShiZhi: !data.LiuTongShiZhi ? '--' : this.fmtNum(data.LiuTongShiZhi * 10000),
                WaiPan: !data.WaiPan ? '--' : data.WaiPan / 100,
                NeiPan: !data.NeiPan ? '--' : Math.abs(data.NeiPan) / 100,
                WeiTuoMaiChuJia1Txt: !data.WeiTuoMaiChuJia1 ? '--' : data.WeiTuoMaiChuJia1,
                WeiTuoMaiChuJia2Txt: !data.WeiTuoMaiChuJia2 ? '--' : data.WeiTuoMaiChuJia2,
                WeiTuoMaiChuJia3Txt: !data.WeiTuoMaiChuJia3 ? '--' : data.WeiTuoMaiChuJia3,
                WeiTuoMaiChuJia4Txt: !data.WeiTuoMaiChuJia4 ? '--' : data.WeiTuoMaiChuJia4,
                WeiTuoMaiChuJia5Txt: !data.WeiTuoMaiChuJia5 ? '--' : data.WeiTuoMaiChuJia5,
                WeiTuoMaiChuLiang1Txt: !data.WeiTuoMaiChuLiang1 ? '--' : data.WeiTuoMaiChuLiang1 / 100,
                WeiTuoMaiChuLiang2Txt: !data.WeiTuoMaiChuLiang2 ? '--' : data.WeiTuoMaiChuLiang2 / 100,
                WeiTuoMaiChuLiang3Txt: !data.WeiTuoMaiChuLiang3 ? '--' : data.WeiTuoMaiChuLiang3 / 100,
                WeiTuoMaiChuLiang4Txt: !data.WeiTuoMaiChuLiang4 ? '--' : data.WeiTuoMaiChuLiang4 / 100,
                WeiTuoMaiChuLiang5Txt: !data.WeiTuoMaiChuLiang5 ? '--' : data.WeiTuoMaiChuLiang5 / 100,
                WeiTuoMaiRuJia1Txt: !data.WeiTuoMaiRuJia1 ? '--' : data.WeiTuoMaiRuJia1,
                WeiTuoMaiRuJia2Txt: !data.WeiTuoMaiRuJia2 ? '--' : data.WeiTuoMaiRuJia2,
                WeiTuoMaiRuJia3Txt: !data.WeiTuoMaiRuJia3 ? '--' : data.WeiTuoMaiRuJia3,
                WeiTuoMaiRuJia4Txt: !data.WeiTuoMaiRuJia4 ? '--' : data.WeiTuoMaiRuJia4,
                WeiTuoMaiRuJia5Txt: !data.WeiTuoMaiRuJia5 ? '--' : data.WeiTuoMaiRuJia5,
                WeiTuoMaiRuLiang1Txt: !data.WeiTuoMaiRuLiang1 ? '--' : data.WeiTuoMaiRuLiang1 / 100,
                WeiTuoMaiRuLiang2Txt: !data.WeiTuoMaiRuLiang2 ? '--' : data.WeiTuoMaiRuLiang2 / 100,
                WeiTuoMaiRuLiang3Txt: !data.WeiTuoMaiRuLiang3 ? '--' : data.WeiTuoMaiRuLiang3 / 100,
                WeiTuoMaiRuLiang4Txt: !data.WeiTuoMaiRuLiang4 ? '--' : data.WeiTuoMaiRuLiang4 / 100,
                WeiTuoMaiRuLiang5Txt: !data.WeiTuoMaiRuLiang5 ? '--' : data.WeiTuoMaiRuLiang5 / 100,
                LiuTongAGu: !data.LiuTongAGu ? '--' : this.fmtNum(data.LiuTongAGu * 10000),
                ZongGuBen: !data.ZongGuBen ? '--' : this.fmtNum(data.ZongGuBen * 10000),
                WeiBi: !data.WeiBi ? '--' : data.WeiBi,
                JunJia: !data.JunJia ? '--' : data.JunJia,
                ShiJingLv: !data.ShiJingLv ? '--' : data.ShiJingLv.toFixed(2),
                ZhenFu: !data.ZhenFu ? '--' : data.ZhenFu,
                LiangBi: !data.LiangBi ? '--' : data.LiangBi,
                XianShou: !data.XianShou ? '--' : (data.XianShou / 1000000).toFixed(2)
            });
        },

        // 加载指数 相关 动态行情 数据
        loadZsDyanData: function loadZsDyanData(code) {
            var _block = '';
            var self = this;

            if (code == 'SH000001') {
                _block = '市场/沪深市场/上证A股';
            } else if (code == 'SZ399001') {
                _block = '市场/沪深市场/深证A股';
            } else if (code == 'SZ399006') {
                _block = '市场/沪深市场/创业板';
            }

            var params = {
                gql: 'block=' + _block,
                field: 'LiuTongShiZhi,ZongShiZhi'
            };
            self.zsDynaData = '';

            self.zsHqD = self.YunDzhObj.query("/blockstat", params, function (res) {
                var _res = res[0];
                _res.LiuTongShiZhi = self.fmtNum(_res.LiuTongShiZhi * 10000);
                _res.ZongShiZhi = self.fmtNum(_res.ZongShiZhi * 10000);

                self.zsDynaData = _res;
            });
        },

        // 加载动态行情
        loadDyanData: function loadDyanData() {
            var self = this;
            var _params = {
                obj: self.code,
                field: 'XianShou,ZuoShou,ChengJiaoE,ShiJingLv,LiuTongShiZhi,NeiPan,WaiPan,JunJia,JingTaiShiYingLv,ShiYingLv,ZongGuBen,LiuTongAGu,WeiBi,ZhenFu,ZhangTing,DieTing,ZuiXinJia,ZhongWenJianCheng,ZhangDie,ZhangFu,ShiJian,KaiPanJia,ZuoShou,ZuiGaoJia,ZuiDiJia,ChengJiaoLiang,HuanShou,ShiYingLv,LiangBi,ZongShiZhi,WeiTuoMaiRuJia1,WeiTuoMaiRuJia2,WeiTuoMaiRuJia3,WeiTuoMaiRuJia4,WeiTuoMaiRuJia5,WeiTuoMaiRuLiang1,WeiTuoMaiRuLiang2,WeiTuoMaiRuLiang3,WeiTuoMaiRuLiang4,WeiTuoMaiRuLiang5,WeiTuoMaiChuJia1,WeiTuoMaiChuJia2,WeiTuoMaiChuJia3,WeiTuoMaiChuJia4,WeiTuoMaiChuJia5,WeiTuoMaiChuLiang1,WeiTuoMaiChuLiang2,WeiTuoMaiChuLiang3,WeiTuoMaiChuLiang4,WeiTuoMaiChuLiang5',
                mode: 2
            };

            self.subHqD = self.YunDzhObj.subscribe('/stkdata', _params, function (data) {
                self.dynaData = self.formatDyanData(data[0]);
                console.log(self.dynaData);
                wx.setNavigationBarTitle({
                    title: self.dynaData.ZhongWenJianCheng + ' - ' + self.dynaData.Obj.substr(2)
                });
            });
        },
        loadFenbiData: function loadFenbiData() {
            var self = this;
            var _params = {
                obj: self.code,
                field: 'ShiJian,ChengJiaoJia,DanCiChengJiaoLiang,MaiMaiFangXiang',
                start: -12
            };

            self.subHqD = self.YunDzhObj.subscribe('/quote/tick', _params, function (data) {
                var _res = [];

                if (data[0].hasOwnProperty('Data') && Array.isArray(data[0].Data)) {
                    _res = data[0].Data;
                }

                _res.forEach(function (eachObj) {
                    eachObj.DanCiChengJiaoLiang = eachObj.DanCiChengJiaoLiang / 100;
                    eachObj.ShiJian = new Date(eachObj.ShiJian * 1000).toString().substr(16, 5);
                });

                if (self.fenbiList.length + _res.length <= 12) {
                    self.fenbiList = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(self.fenbiList), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(_res));
                } else {
                    self.fenbiList.shift(); //分笔
                    self.fenbiList = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(self.fenbiList), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(_res));
                }
            });
        },

        //加载走时图
        loadChart: function loadChart() {
            var self = this;

            // 请求系统信息，得到宽高
            wx.getSystemInfo({
                success: function success(systemInfo) {
                    self.chartDataProvider = new __WEBPACK_IMPORTED_MODULE_5__charts_DataProvider_js__["a" /* default */]({ obj: self.code, prefix: 0 });
                    var chartWidth = systemInfo.windowWidth;
                    var chartHeight = systemInfo.windowHeight - 210;

                    var pixelRadio = systemInfo.pixelRatio;
                    //股票类的图像大小
                    self.chartWidth = chartWidth * 0.66;
                    self.chartHeight = self.chartWidth * 1.23;
                    //指数类的图像大小
                    self.chartWidth2 = chartWidth;
                    self.chartHeight2 = self.chartWidth * 0.8;

                    if (self.period != 'min') {
                        //k的时候隐藏 分时成交
                        self.chartWidth = chartWidth;
                    }

                    if (self.IsAstock) {
                        self.canvas[self.chartType] = new __WEBPACK_IMPORTED_MODULE_6__charts_Canvas_js__["a" /* default */]({
                            pixelRadio: pixelRadio,
                            canvasId: 1,
                            width: self.chartWidth,
                            height: self.chartHeight
                        });
                    } else {
                        self.canvas[self.chartType] = new __WEBPACK_IMPORTED_MODULE_6__charts_Canvas_js__["a" /* default */]({
                            pixelRadio: pixelRadio,
                            canvasId: 2,
                            width: self.chartWidth2,
                            height: self.chartHeight
                        });
                    }

                    self.showChart();
                }
            });
        },
        showChart: function showChart() {
            var currentChart = void 0;

            if (this.chartType === 'min') {
                //currentChart = this.minChart = this.minChart || new MinChart(this.chartDataProvider);
                currentChart = new __WEBPACK_IMPORTED_MODULE_7__charts_MinChart_js__["a" /* default */](this.chartDataProvider, { "IsAstock": this.IsAstock, "upColor": "#fe6b6d", "downColor": "#67b883", "stock": this.code });
            } else {
                var klineChartName = 'klineChart' + this.period;
                //currentChart = this[klineChartName] = this[klineChartName] || new KlineChart(this.chartDataProvider, { period: this.period });
                currentChart = new __WEBPACK_IMPORTED_MODULE_8__charts_KlineChart_js__["a" /* default */](this.chartDataProvider, { period: this.period, "stock": this.code });
            }

            console.log('currentChart', currentChart);
            this.canvas[this.chartType].show(currentChart);
        },
        cancel: function cancel() {
            this.IsAstock = false;
            this.pankou = false;
            this.canvas = {};
            this.chartType = 'min';
            this.period = 'min';
            this.subHqD.cancel();
            this.chartDataProvider.cancel();
            this.removeListener();
            this.stockNewsList = [];
            this.subHqD.cancel();
            this.fenbiList = [];
            this.zsHqd && this.zsHqd.cancel();
        },
        stocknews: function stocknews() {
            var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var self = this;
            var obj = self.code;
            var jsonurl = "";
            //https://mnews.gw.com.cn/wap/data/ipad/stock/SH/05/600005/list/1.json
            if (obj.substr(0, 2) == 'NY' || obj.substr(0, 2) == 'NS') {
                jsonurl = 'https://mnews.gw.com.cn/wap/data/ipad/stock/' + obj.substring(0, 2) + "/" + obj + "/list/" + start + ".json";
            } else {
                jsonurl = 'https://mnews.gw.com.cn/wap/data/ipad/stock/' + obj.substr(0, 2) + '/' + obj.substr(-2) + '/' + obj.substr(2) + '/list/' + start + '.json';
            }

            console.log(jsonurl);
            wx.request({ url: jsonurl,
                data: {},
                header: { 'content-type': 'application/json' },
                success: function success(res) {
                    if (typeof res.data != 'string') {
                        var _resNewsList = self.fmtData(res.data[0].data);

                        _resNewsList.forEach(function (d) {
                            if (d.url.substr(0, 5) != 'https') {
                                d.url = 'https' + d.url.substr(4);
                            }
                        });

                        self.stockNewsList = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(self.stockNewsList), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(_resNewsList));
                    }
                },
                fail: function fail(error) {
                    console.log(error);
                }
            });
        },
        lower: function lower() {
            if (this.newsCurPage > 4) {
                return 0;
            } else {
                this.newsCurPage++;
            }

            this.stocknews(this.newsCurPage);
        },
        fmtData: function fmtData(paraList) {
            //格式化时间
            paraList.forEach(function (eachObj) {
                return eachObj.shortTime = eachObj.otime.substr(14);
            });
            return paraList;
        }
    },
    onHide: function onHide() {
        console.log('i am onHide...');
    },
    onUnload: function onUnload() {
        this.cancel();
        console.log('i am onUnload...');
    },
    onShareAppMessage: function onShareAppMessage() {
        var code = this.code;
        var dynaData = this.dynaData;
        return {
            title: dynaData.ZhongWenJianCheng + ' - ' + dynaData.Obj.substr(2),
            desc: '\u6700\u65B0\u4EF7:' + dynaData.ZuiXinJia + ' \u6DA8\u8DCC\u5E45:' + dynaData.ZhangFu,
            path: '/pages/stock/main?code=' + code
        };
    }
});

/***/ }),

/***/ 289:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('header', {
    staticClass: "header",
    attrs: {
      "eventid": '0'
    },
    on: {
      "tap": _vm.chkpankou
    }
  }, [_c('div', {
    staticClass: "header-index"
  }, [_c('span', {
    class: _vm.FontClass
  }, [_vm._v(_vm._s(_vm.dynaData.ZuiXinJia))]), _vm._v(" "), _c('p', {
    class: _vm.FontClass
  }, [_c('span', [_vm._v(_vm._s(_vm.dynaData.ZhangDie))]), _c('span', [_vm._v(_vm._s(_vm.dynaData.ZhangFuTxt))])])], 1), _vm._v(" "), _c('div', {
    staticClass: "header-info"
  }, [_c('p', [_vm._v("最高：")]), _c('p', [_vm._v(_vm._s(_vm.dynaData.ZuiGaoJia))]), _vm._v(" "), _c('p', [_vm._v("最低：")]), _c('p', [_vm._v(_vm._s(_vm.dynaData.ZuiDiJia))])], 1), _vm._v(" "), _c('div', {
    staticClass: "header-info"
  }, [_c('p', [_vm._v("成交量：")]), _c('p', [_vm._v(_vm._s(_vm.dynaData.ChengJiaoLiang))]), _vm._v(" "), _c('p', [_vm._v("成交额：")]), _c('p', [_vm._v(_vm._s(_vm.dynaData.ChengJiaoE))])], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.IsAstock),
      expression: "IsAstock"
    }],
    staticClass: "header-info"
  }, [_c('p', [_vm._v("总市值：")]), _c('p', [_vm._v(_vm._s(_vm.dynaData.ZongShiZhi))]), _vm._v(" "), _c('p', [_vm._v("量比：")]), _c('p', [_vm._v(_vm._s(_vm.dynaData.LiangBi))])], 1), _vm._v(" "), _c('span', {
    staticClass: "header-btn",
    class: {
      'up': _vm.pankou
    }
  }, [_vm._v("盘口")]), _vm._v(" "), (_vm.stocktype == 1) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.pankou),
      expression: "pankou"
    }],
    staticClass: "header-info-more",
    attrs: {
      "catchtouchmove": "preventTouchMove"
    }
  }, [_c('div', {
    staticClass: "header-info-more-w"
  }, [_c('ul', {
    staticClass: "more-block"
  }, [_c('li', [_vm._v("涨停"), _c('span', {
    staticClass: "font-red"
  }, [_vm._v(_vm._s(_vm.dynaData.ZhangTing))])]), _vm._v(" "), _c('li', [_vm._v("今开"), _c('span', {
    class: _vm.FontClass
  }, [_vm._v(_vm._s(_vm.dynaData.KaiPanJia))])]), _vm._v(" "), _c('li', [_vm._v("振幅"), _c('span', [_vm._v(_vm._s(_vm.dynaData.ZhenFu))])]), _vm._v(" "), _c('li', [_vm._v("委比"), _c('span', {
    class: {
      'font-red': _vm.dynaData.WeiBi > 0, 'font-green': _vm.dynaData.WeiBi < 0, 'font-gray': _vm.dynaData.WeiBi == 0
    }
  }, [_vm._v(_vm._s(_vm.dynaData.WeiBi))])]), _vm._v(" "), _c('li', [_vm._v("总市值："), _c('span', [_vm._v(_vm._s(_vm.zsDynaData.ZongShiZhi))])])], 1), _vm._v(" "), _c('ul', {
    staticClass: "more-block"
  }, [_c('li', [_vm._v("跌停"), _c('span', {
    staticClass: "font-green"
  }, [_vm._v(_vm._s(_vm.dynaData.DieTing))])]), _vm._v(" "), _c('li', [_vm._v("昨收"), _c('span', [_vm._v(_vm._s(_vm.dynaData.ZuoShou))])]), _vm._v(" "), _c('li', [_vm._v("现手"), _c('span', [_vm._v(_vm._s(_vm.dynaData.XianShou))])]), _vm._v(" "), _c('li', [_vm._v("量比"), _c('span', {
    class: _vm.FontClass
  }, [_vm._v(_vm._s(_vm.dynaData.LiangBi))]), _c('p')], 1), _c('li', [_vm._v("流通值"), _c('span', [_vm._v(_vm._s(_vm.zsDynaData.LiuTongShiZhi))])])], 1)], 1)]) : (_vm.stocktype == 2) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.pankou),
      expression: "pankou"
    }],
    staticClass: "header-info-more",
    attrs: {
      "catchtouchmove": "preventTouchMove"
    }
  }, [_c('div', {
    staticClass: "header-info-more-w"
  }, [_c('ul', {
    staticClass: "more-block"
  }, [_c('li', [_vm._v("涨停"), _c('span', {
    staticClass: "font-red"
  }, [_vm._v(_vm._s(_vm.dynaData.ZhangTing))])]), _vm._v(" "), _c('li', [_vm._v("振幅"), _c('span', [_vm._v(_vm._s(_vm.dynaData.ZhenFu))])]), _vm._v(" "), _c('li', [_vm._v("委比"), _c('span', {
    class: {
      'font-red': _vm.dynaData.WeiBi > 0, 'font-green': _vm.dynaData.WeiBi < 0, 'font-gray': _vm.dynaData.WeiBi == 0
    }
  }, [_vm._v(_vm._s(_vm.dynaData.WeiBi))])]), _vm._v(" "), _c('li', [_vm._v("流通股"), _c('span', [_vm._v(_vm._s(_vm.dynaData.LiuTongAGu))])]), _vm._v(" "), _c('li', [_vm._v("总股本"), _c('span', [_vm._v(_vm._s(_vm.dynaData.ZongGuBen))])]), _vm._v(" "), _c('li', [_vm._v("市盈率(动)"), _c('span', [_vm._v(_vm._s(_vm.dynaData.ShiYingLv))])]), _vm._v(" "), _c('li', [_vm._v("市盈率(静)"), _c('span', [_vm._v(_vm._s(_vm.dynaData.JingTaiShiYingLv))])])], 1), _vm._v(" "), _c('ul', {
    staticClass: "more-block"
  }, [_c('li', [_vm._v("跌停"), _c('span', {
    staticClass: "font-green"
  }, [_vm._v(_vm._s(_vm.dynaData.DieTing))])]), _vm._v(" "), _c('li', [_vm._v("均价"), _c('span', [_vm._v(_vm._s(_vm.dynaData.JunJia))])]), _vm._v(" "), _c('li', [_vm._v("今开"), _c('span', {
    class: _vm.FontClass
  }, [_vm._v(_vm._s(_vm.dynaData.KaiPanJia))])]), _vm._v(" "), _c('li', [_vm._v("外盘"), _c('span', {
    staticClass: "font-red"
  }, [_vm._v(_vm._s(_vm.dynaData.WaiPan))])]), _vm._v(" "), _c('li', [_vm._v("内盘"), _c('span', {
    staticClass: "font-green"
  }, [_vm._v(_vm._s(_vm.dynaData.NeiPan))])]), _vm._v(" "), _c('li', [_vm._v("流通值"), _c('span', [_vm._v(_vm._s(_vm.dynaData.LiuTongShiZhi))])]), _vm._v(" "), _c('li', [_vm._v("市净率"), _c('span', [_vm._v(_vm._s(_vm.dynaData.ShiJingLv))])])], 1)], 1)]) : (_vm.stocktype == 3 || _vm.stocktype == 4) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.pankou),
      expression: "pankou"
    }],
    staticClass: "header-info-more",
    attrs: {
      "catchtouchmove": "preventTouchMove"
    }
  }, [_c('div', {
    staticClass: "header-info-more-w"
  }, [_c('ul', {
    staticClass: "more-block"
  }, [_c('li', [_vm._v("振幅"), _c('span', [_vm._v(_vm._s(_vm.dynaData.ZhenFu))])]), _vm._v(" "), _c('li', [_vm._v("今开"), _c('span', {
    class: _vm.FontClass
  }, [_vm._v(_vm._s(_vm.dynaData.KaiPanJia))])]), _vm._v(" "), _c('li', [_vm._v("外盘"), _c('span', {
    staticClass: "font-red"
  }, [_vm._v(_vm._s(_vm.dynaData.WaiPan))])]), _vm._v(" "), _c('li', [_vm._v("委比"), _c('span', {
    class: {
      'font-red': _vm.dynaData.WeiBi > 0, 'font-green': _vm.dynaData.WeiBi < 0, 'font-gray': _vm.dynaData.WeiBi == 0
    }
  }, [_vm._v(_vm._s(_vm.dynaData.WeiBi))])])], 1), _vm._v(" "), _c('ul', {
    staticClass: "more-block"
  }, [_c('li', [_vm._v("均价"), _c('span', [_vm._v(_vm._s(_vm.dynaData.JunJia))])]), _vm._v(" "), _c('li', [_vm._v("昨收"), _c('span', [_vm._v(_vm._s(_vm.dynaData.ZuoShou))])]), _vm._v(" "), _c('li', [_vm._v("内盘"), _c('span', {
    staticClass: "font-green"
  }, [_vm._v(_vm._s(_vm.dynaData.NeiPan))])])], 1)], 1)]) : _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.pankou),
      expression: "pankou"
    }],
    staticClass: "header-info-more",
    attrs: {
      "catchtouchmove": "preventTouchMove"
    }
  }, [_c('div', {
    staticClass: "header-info-more-w"
  }, [_c('ul', {
    staticClass: "more-block"
  }, [_c('li', [_vm._v("涨停"), _c('span', {
    staticClass: "font-red"
  }, [_vm._v(_vm._s(_vm.dynaData.ZhangTing))])]), _vm._v(" "), _c('li', [_vm._v("今开"), _c('span', {
    class: _vm.FontClass
  }, [_vm._v(_vm._s(_vm.dynaData.KaiPanJia))])])], 1), _vm._v(" "), _c('ul', {
    staticClass: "more-block"
  }, [_c('li', [_vm._v("跌停"), _c('span', {
    staticClass: "font-green"
  }, [_vm._v(_vm._s(_vm.dynaData.DieTing))])]), _vm._v(" "), _c('li', [_vm._v("昨收"), _c('span', [_vm._v(_vm._s(_vm.dynaData.ZuoShou))])])], 1)], 1)])]), _vm._v(" "), _c('nav', {
    staticClass: "nav nav-tab4"
  }, [_c('span', {
    class: {
      'cur': _vm.period == 'min'
    },
    attrs: {
      "eventid": '1'
    },
    on: {
      "tap": function($event) {
        _vm.chgchart('min')
      }
    }
  }, [_vm._v("分时")]), _vm._v(" "), _c('span', {
    class: {
      'cur': _vm.period == '1day'
    },
    attrs: {
      "eventid": '2'
    },
    on: {
      "tap": function($event) {
        _vm.chgchart('1day')
      }
    }
  }, [_vm._v("日k")]), _vm._v(" "), _c('span', {
    class: {
      'cur': _vm.period == 'week'
    },
    attrs: {
      "eventid": '3'
    },
    on: {
      "tap": function($event) {
        _vm.chgchart('week')
      }
    }
  }, [_vm._v("周k")]), _vm._v(" "), _c('span', {
    class: {
      'cur': _vm.period == 'month'
    },
    attrs: {
      "eventid": '4'
    },
    on: {
      "tap": function($event) {
        _vm.chgchart('month')
      }
    }
  }, [_vm._v("月k")])]), _vm._v(" "), _c('main', {
    staticClass: "main"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.pankou),
      expression: "!pankou"
    }],
    class: {
      'main-l': _vm.IsAstock && _vm.period == 'min'
    }
  }, [(_vm.IsAstock) ? _c('canvas', {
    style: ({
      width: _vm.chartWidth + 'px',
      height: _vm.chartHeight + 'px'
    }),
    attrs: {
      "canvas-id": "1"
    }
  }) : _c('canvas', {
    style: ({
      width: _vm.chartWidth2 + 'px',
      height: _vm.chartHeight + 'px'
    }),
    attrs: {
      "canvas-id": "2"
    }
  })]), _vm._v(" "), (_vm.IsAstock && _vm.period == 'min') ? _c('div', {
    staticClass: "main-r"
  }, [_c('div', {
    staticClass: "main-r-tab"
  }, [_c('span', {
    class: {
      'cur': _vm.fiveOrFenbi
    },
    attrs: {
      "eventid": '5'
    },
    on: {
      "tap": _vm.chgfiveorfenbi
    }
  }, [_vm._v("五档")]), _c('span', {
    class: {
      'cur': !_vm.fiveOrFenbi
    },
    attrs: {
      "eventid": '6'
    },
    on: {
      "tap": _vm.chgfiveorfenbi
    }
  }, [_vm._v("明细")])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.fiveOrFenbi),
      expression: "fiveOrFenbi"
    }],
    staticClass: "main-r-content",
    attrs: {
      "eventid": '7'
    },
    on: {
      "tap": _vm.chgfiveorfenbi
    }
  }, [_c('div', {
    staticClass: "flevel flevel-sell"
  }, [_c('p', [_c('span', [_vm._v("卖五")]), _c('span', {
    class: {
      'font-red': _vm.dynaData.WeiTuoMaiChuJia5 > _vm.dynaData.ZuoShou, 'font-green': _vm.dynaData.WeiTuoMaiChuJia5 < _vm.dynaData.ZuoShou, 'font-gray': _vm.dynaData.WeiTuoMaiChuJia5 == _vm.dynaData.ZuoShou
    }
  }, [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiChuJia5Txt))]), _c('span', [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiChuLiang5Txt))])]), _vm._v(" "), _c('p', [_c('span', [_vm._v("卖四")]), _c('span', {
    class: {
      'font-red': _vm.dynaData.WeiTuoMaiChuJia4 > _vm.dynaData.ZuoShou, 'font-green': _vm.dynaData.WeiTuoMaiChuJia4 < _vm.dynaData.ZuoShou, 'font-gray': _vm.dynaData.WeiTuoMaiChuJia4 == _vm.dynaData.ZuoShou
    }
  }, [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiChuJia4Txt))]), _c('span', [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiChuLiang4Txt))])]), _vm._v(" "), _c('p', [_c('span', [_vm._v("卖三")]), _c('span', {
    class: {
      'font-red': _vm.dynaData.WeiTuoMaiChuJia3 > _vm.dynaData.ZuoShou, 'font-green': _vm.dynaData.WeiTuoMaiChuJia3 < _vm.dynaData.ZuoShou, 'font-gray': _vm.dynaData.WeiTuoMaiChuJia3 == _vm.dynaData.ZuoShou
    }
  }, [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiChuJia3Txt))]), _c('span', [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiChuLiang3Txt))])]), _vm._v(" "), _c('p', [_c('span', [_vm._v("卖二")]), _c('span', {
    class: {
      'font-red': _vm.dynaData.WeiTuoMaiChuJia2 > _vm.dynaData.ZuoShou, 'font-green': _vm.dynaData.WeiTuoMaiChuJia2 < _vm.dynaData.ZuoShou, 'font-gray': _vm.dynaData.WeiTuoMaiChuJia2 == _vm.dynaData.ZuoShou
    }
  }, [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiChuJia2Txt))]), _c('span', [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiChuLiang2Txt))])]), _vm._v(" "), _c('p', [_c('span', [_vm._v("卖一")]), _c('span', {
    class: {
      'font-red': _vm.dynaData.WeiTuoMaiChuJia1 > _vm.dynaData.ZuoShou, 'font-green': _vm.dynaData.WeiTuoMaiChuJia1 < _vm.dynaData.ZuoShou, 'font-gray': _vm.dynaData.WeiTuoMaiChuJia1 == _vm.dynaData.ZuoShou
    }
  }, [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiChuJia1Txt))]), _c('span', [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiChuLiang1Txt))])])], 1), _vm._v(" "), _c('div', {
    staticClass: "flevel flevel-buy"
  }, [_c('p', [_c('span', [_vm._v("买一")]), _c('span', {
    class: {
      'font-red': _vm.dynaData.WeiTuoMaiRuJia1 > _vm.dynaData.ZuoShou, 'font-green': _vm.dynaData.WeiTuoMaiRuJia1 < _vm.dynaData.ZuoShou, 'font-gray': _vm.dynaData.WeiTuoMaiRuJia1 == _vm.dynaData.ZuoShou
    }
  }, [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiRuJia1Txt))]), _c('span', [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiRuLiang1Txt))])]), _vm._v(" "), _c('p', [_c('span', [_vm._v("买二")]), _c('span', {
    class: {
      'font-red': _vm.dynaData.WeiTuoMaiRuJia2 > _vm.dynaData.ZuoShou, 'font-green': _vm.dynaData.WeiTuoMaiRuJia2 < _vm.dynaData.ZuoShou, 'font-gray': _vm.dynaData.WeiTuoMaiRuJia2 == _vm.dynaData.ZuoShou
    }
  }, [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiRuJia2Txt))]), _c('span', [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiRuLiang2Txt))])]), _vm._v(" "), _c('p', [_c('span', [_vm._v("买三")]), _c('span', {
    class: {
      'font-red': _vm.dynaData.WeiTuoMaiRuJia3 > _vm.dynaData.ZuoShou, 'font-green': _vm.dynaData.WeiTuoMaiRuJia3 < _vm.dynaData.ZuoShou, 'font-gray': _vm.dynaData.WeiTuoMaiRuJia3 == _vm.dynaData.ZuoShou
    }
  }, [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiRuJia3Txt))]), _c('span', [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiRuLiang3Txt))])]), _vm._v(" "), _c('p', [_c('span', [_vm._v("买四")]), _c('span', {
    class: {
      'font-red': _vm.dynaData.WeiTuoMaiRuJia4 > _vm.dynaData.ZuoShou, 'font-green': _vm.dynaData.WeiTuoMaiRuJia4 < _vm.dynaData.ZuoShou, 'font-gray': _vm.dynaData.WeiTuoMaiRuJia4 == _vm.dynaData.ZuoShou
    }
  }, [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiRuJia4Txt))]), _c('span', [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiRuLiang4Txt))])]), _vm._v(" "), _c('p', [_c('span', [_vm._v("买五")]), _c('span', {
    class: {
      'font-red': _vm.dynaData.WeiTuoMaiRuJia5 > _vm.dynaData.ZuoShou, 'font-green': _vm.dynaData.WeiTuoMaiRuJia5 < _vm.dynaData.ZuoShou, 'font-gray': _vm.dynaData.WeiTuoMaiRuJia5 == _vm.dynaData.ZuoShou
    }
  }, [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiRuJia5Txt))]), _c('span', [_vm._v(_vm._s(_vm.dynaData.WeiTuoMaiRuLiang5Txt))])])], 1)]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.fiveOrFenbi),
      expression: "!fiveOrFenbi"
    }],
    staticClass: "main-r-content",
    attrs: {
      "eventid": '8'
    },
    on: {
      "tap": _vm.chgfiveorfenbi
    }
  }, [_c('div', {
    staticClass: "r-trade"
  }, _vm._l((_vm.fenbiList), function(fenbi, index) {
    return _c('p', [_c('span', [_vm._v(_vm._s(fenbi.ShiJian))]), _vm._v(" "), _c('span', {
      staticClass: "font-green"
    }, [_vm._v(_vm._s(fenbi.ChengJiaoJia))]), _vm._v(" "), _c('span', {
      staticClass: "font-green"
    }, [_vm._v(_vm._s(fenbi.DanCiChengJiaoLiang))])])
  }))])]) : _vm._e()]), _vm._v(" "), _c('section', {
    staticClass: "news"
  }, [_c('h2', {
    staticClass: "news-tit"
  }, [_vm._v("相关新闻")]), _vm._v(" "), (_vm.stockNewsList.length > 0) ? _c('div', {
    staticClass: "news-list"
  }, [_vm._l((_vm.stockNewsList), function(news, index) {
    return _c('div', {
      staticClass: "item"
    }, [_c('a', {
      attrs: {
        "href": '/pages/newsdetail/main?jsonurl=' + news.url
      }
    }, [_c('h3', [_vm._v(_vm._s(news.title))]), _vm._v(" "), _c('p', [_c('span', {
      staticClass: "fl"
    }, [_vm._v(_vm._s(news.source))]), _vm._v(" "), _c('span', {
      staticClass: "fr"
    }, [_vm._v(_vm._s(news.otime))])])], 1)])
  }), _vm._v(" "), _c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.newsCurPage <= 4),
      expression: "newsCurPage<=4"
    }],
    staticClass: "load-more",
    attrs: {
      "eventid": '9'
    },
    on: {
      "tap": function($event) {
        _vm.lower()
      }
    }
  }, [_vm._v("点击加载更多")])], 2) : _c('div', {
    staticClass: "blank"
  }, [_c('p', [_vm._v("暂无数据")])], 1)], 1), _vm._v(" "), _c('footer', {
    staticClass: "footer"
  }, [(_vm.isPortfolio) ? _c('span', {
    staticClass: "ft-btn ft-btn-minus",
    attrs: {
      "eventid": '11'
    },
    on: {
      "tap": _vm.chgPortfolio
    }
  }, [_c('i'), _vm._v("删自选")], 1) : _c('span', {
    staticClass: "ft-btn",
    attrs: {
      "eventid": '10'
    },
    on: {
      "tap": _vm.chgPortfolio
    }
  }, [_c('i'), _vm._v("加自选")], 1)]), _vm._v(" "), _c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.AlterShowFlag),
      expression: "AlterShowFlag"
    }],
    staticClass: "pop-alert"
  }, [_vm._v(_vm._s(_vm.AlterTxt) + "自选股成功")]), _vm._v(" "), _c('aside', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.fromApp),
      expression: "fromApp"
    }],
    staticClass: "side-bar",
    class: {
      'foldUp': _vm.isFoldUp
    }
  }, [_c('button', {
    staticClass: "right-bar right-bar1",
    attrs: {
      "open-type": "launchApp",
      "app-parameter": 'dzh_browser_url&goto=0&type=2970&code=' + _vm.code + '&kind=1',
      "eventid": '12'
    },
    on: {
      "error": _vm.launchAppError
    }
  }, [_vm._v("打开"), _c('br'), _vm._v("APP")], 1), _vm._v(" "), _c('button', {
    staticClass: "right-bar right-bar2",
    attrs: {
      "app-parameter": "",
      "eventid": '13'
    },
    on: {
      "tap": _vm.gohome
    }
  }, [_vm._v("去首页")]), _vm._v(" "), _c('span', {
    staticClass: "side-bar-icon",
    attrs: {
      "eventid": '14'
    },
    on: {
      "tap": _vm.chgFoldUp
    }
  })], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-468de450", esExports)
  }
}

/***/ })

},[179]);
//# sourceMappingURL=main.js.map