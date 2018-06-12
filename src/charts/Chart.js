import { formatNumber, formatDate } from '@/utils/util.js'
import store from '@/store/index.js'

export default class Chart {

  static formatNumber = formatNumber;
  static formatDate = formatDate;

  constructor(dataProvider, options = {}) {
    this.dataProvider = dataProvider;
    this.options = options;
  }

  initData() {
    // // 设置画详细提示框方法,设置为false则为不显示
    // let drawTooltip = this._options.drawTooltip;
    // this.drawTooltip = drawTooltip === false ? noop : ((typeof drawTooltip === 'function') ? drawTooltip : this.drawTooltip);

    // 图表通用参数配置
    //this.hasVolume = this.options.hasVolume != null ? this.options.hasVolume : true;
    this.hasVolume = store.state.volumeObj.indexOf(this.options.stock) == -1 ? true :false;
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

  setCanvas(canvas) {
    if (!this.canvas) {
      // 初始数据
      this.canvas = canvas;
      this.initData();
    }
  }

  show() {
    this.canvas && this.canvas.show(this);
  }

  remove() {
    this.canvas && this.canvas.remove(this);
  }

  redraw() {
    //if (this.canvas && this.canvas.getCurrentChart() === this &&  //debug
    if(this.canvas && this.canvas.canvasWidth && this.canvas.canvasHeight) {
      this.canvas.clear();
      this.initChart();
      this.drawBackground();
      this.drawChart();
      this.drawAxisTicks();
      this.canvas && this.canvas.toggleMask(false);
      this.canvas.drawCanvas();
    }
  }

  initChart() {
    this.yAxisTicks = [];
    const timeAxisHeight = this.timeAxisHeight;
    const hasVolume = this.hasVolume;

    // 默认主图和量图的比例为7 : 3
    const height = this.canvas.canvasHeight - timeAxisHeight;
    if (hasVolume) {
      this.mainChartHeight = height * 0.7;
      this.volumeChartHeight = height * 0.3;
    } else {
      this.mainChartHeight = height;
      this.volumeChartHeight = 0;
    }
  }

  /* eslint class-methods-use-this: 0 */
  drawBackground() {
    console.warn('not implemented');
  }

  /* eslint class-methods-use-this: 0 */
  drawChart() {
    console.warn('not implemented');
  }

  drawAxisTicks() {
    const yAxisTicks = this.yAxisTicks;
    if (yAxisTicks) {
      const canvas = this.canvas;
      const fontSize = this.fontSize;
      const tickBackgroundColor = this.tickBackgroundColor;
      yAxisTicks.forEach((eachTick) => {
        canvas.drawText(eachTick.text, eachTick.x, eachTick.y, fontSize,
          eachTick.tickColor, eachTick.withBackground && tickBackgroundColor);
      });
    }
  }

  formatYAxisLabel(text) {
    return Chart.formatNumber(text, 2, 'K/M', false);
  }

  formatXAxisLabel(text) {
    return text;
  }

  getColor(isUp) {
    return isUp ? this.upColor : this.downColor;
  }

  drawYAxisGridLine(y, text, color = this.gridLineColor, position = 'top', withBackground = false, tickColor = this.tickColor,textMove = 0) {
    if(position == 'bottom'){
      this.canvas.drawLine(0, y, this.canvas.canvasWidth, y, this.gridLineWidth, color);
    }else{
      this.canvas.drawLineDash(0, y, this.canvas.canvasWidth, y, this.gridLineWidth, color);
    }

    if (text) {
      // 记录Y轴坐标位置
      const yAxisTicks = this.yAxisTicks;
      if(textMove >0 )
        y-=textMove
      yAxisTicks.push({
        text: this.formatYAxisLabel(text),
        x: 2*this.canvas.pixelRadio,
        y: (position === 'top' ? y - 2 : y + this.fontSize + 2),
        tickColor,
        withBackground,
      });
    }
  }

  drawXAxisGridLine(x, text, color = this.gridLineColor, position = 'middle', withBackground = false, full = false, tickColor = this.tickColor) {
    this.canvas.drawLine(x, 0, x, full ? this.canvas.canvasHeight : this.mainChartHeight, this.gridLineWidth, color);
    if (text) {
      const textWidth = this.canvas.measureText(text);
      const fontSize = this.fontSize;
      const textX = position === 'middle' ? x - (textWidth / 2) : x;
      const textY = this.mainChartHeight + fontSize + 2;

      this.canvas.drawText(text, textX, textY, fontSize, tickColor,
        withBackground && this.tickBackgroundColor);
    }
  }

  /* eslint no-unused-vars: 0 */
  panMove(pressed, x, y, deltaX) {
  }

  /* eslint no-unused-vars: 0 */
  pinchMove(scale) {
  }
}
