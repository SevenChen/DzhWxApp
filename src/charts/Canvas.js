// import Hammer from '../../bower_components/hammerjs/hammer.js';

export default class Canvas {

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
  pixelRadio = 2;

  constructor({ width, height, eventListener, pixelRadio, canvasId } = {}) {
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

  initCanvas() {
    const ctx = this.ctx = wx.createCanvasContext(this.canvasId); // this.ctx = wx.createContext();

    // TODO 初始化ctx缩放比例，canvas大小
    const ratio = this.pixelRadio;
    this.canvasWidth = this.width * ratio;
    this.canvasHeight = this.height * ratio;
    ctx.scale(1 / ratio, 1 / ratio);
  }

  redraw(chart) {
    this.initCanvas();
    //const currentChart = this.getCurrentChart();
    //currentChart && currentChart.redraw();
    //chart && chart.redraw();
  }

  getCurrentChart() {
    return this.charts[this.currentChartIndex];
  }

  show(chart) {
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

  hasChart(chart) {
    return true;      //debug
    return this.charts.indexOf(chart) >= 0;
  }

  addChart(chart) {
    //debug
    /*
    const index = this.charts.indexOf(chart);
    if (index < 0) {
      this.charts.push(chart);
      chart.setCanvas(this);
    }*/
    chart.setCanvas(this);
  }

  removeChart(chart) {
    let index;
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

  reset() {
    this.charts = [];
    this.currentChartIndex = 0;
    this.clear();
  }

  clear() {
    // this.ctx && this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // 微信小程序画了一次后状态还原，需要重新设置ctx比例
    this.initCanvas();
  }

  drawCanvas() {
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

  touchstart(event) {
    this.lastX = event.changedTouches[0].x * this.pixelRadio;
  }

  touchmove(event) {
    const chart = this.getCurrentChart();
    const touch = event.changedTouches[0];
    const moveToX = touch.x * this.pixelRadio;
    const moveToY = touch.y * this.pixelRadio;
    const deltaX = moveToX - this.lastX;
    const result = chart && chart.panMove(this.pressed, moveToX, moveToY, deltaX);
    result && (this.lastX = moveToX);
  }

  touchend() {
    this.pressed = false;
    this.lastX = 0;
    const chart = this.getCurrentChart();
    chart && chart.panMove(this.pressed);
  }

  longtap(event) {
      this.pressed = true;
      const chart = this.getCurrentChart();
      const touch = event.changedTouches[0];
      const moveToX = touch.pageX * this.pixelRadio;
      const moveToY = (touch.pageY - event.target.offsetTop) * this.pixelRadio;
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
  toggleMask(show) {
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

  drawLine(x1, y1, x2, y2, lineWidth, style) {
    const ctx = this.ctx;
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
  drawLineDash(x1, y1, x2, y2, lineWidth, style) {
    const ctx = this.ctx;
    ctx.setStrokeStyle(style);
    let step = 10
    const x = x2 - x1,
      y = y2 - y1,
      count = Math.floor(Math.sqrt(x * x + y * y) / step),
      xv = x / count,
      yv = y / count;
    ctx.beginPath();
    for (let i = 0; i < count; i ++) {
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

  drawText(text, pointX, pointY, fontSize, fontStyle, backgroundStyle = null) {
    const ctx = this.ctx;
    const textWidth = this.measureText(text);
    const x = Math.min(Math.max(pointX, 0), this.canvasWidth - textWidth);
    const y = pointY;
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

  fillPath(points, y0, strokeColor, fillStyle, lineWidth = 1) {
    const ctx = this.ctx;
    ctx.beginPath();
    points.forEach((eachPoint, index) => {
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

  drawPath(points, color, lineWidth = 1) {
    const ctx = this.ctx;
    ctx.beginPath();
    // ctx.lineJoin = 'round';
    ctx.setLineJoin('round');
    // ctx.lineWidth = lineWidth;
    ctx.setLineWidth(lineWidth * this.pixelRadio);
    // const strokeStyle = ctx.strokeStyle = color = color.toLowerCase();
    ctx.setStrokeStyle(color);
    points.forEach((eachPoint, index) => {
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

  drawRect(x, y, width, height, fillStyle) {
    //width-=3;
    const ctx = this.ctx;
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
  drawRectEmpty(x, y, width, height,fillStyle){
    //console.log("debug ",x, y, width, height)
    width-=3;
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = fillStyle;
    //ctx.strokeRect(x, y, width, height);
    ctx.moveTo(x,y);
    ctx.lineTo(x,y+height);
    ctx.lineTo(x+width,y+height);
    ctx.lineTo(x+width,y);
    ctx.lineTo(x,y);
    ctx.stroke();

    ctx.closePath();
  }

  drawCircle(x, y, radius, fillStyle, lineWidth = 0, strokeStyle) {
    const ctx = this.ctx;
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

  normalizeDrawLinePoint(point) {
    if (this.pixelRadio === 1) {
      const intPoint = parseInt(point, 10);
      return intPoint > point ? intPoint - 0.5 : intPoint + 0.5;
    }
    return point;
  }

  /* eslint class-methods-use-this: 0 */
  measureText(text) {
    // return this.ctx.measureText(text).width;
    // 计算text的半角长度后乘以每个半角字符的宽度
    return text.replace(/[\u0391-\uFFE5]/g, 'aa').length * 5 * this.pixelRadio;
  }
}
