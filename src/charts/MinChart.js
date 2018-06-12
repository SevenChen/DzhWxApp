import Chart from '@/charts/Chart.js';

export default class MinChart extends Chart {

  initData() {
    wx.removeStorage({
      key: "stock-min",
      success: () => {

      },
      fail: () => {
      },
    });

    super.initData();

    this.cache = null;

    this.canvas && this.canvas.toggleMask(true);

    // 订阅数据,有数据推送到达时重画
    const subscribe = this.dataProvider.subscribeMin((data) => {
      //console.log("data is ",data)
      // chart 移除则停止订阅
      if (!this.canvas.hasChart(this)) {
        subscribe.cancel();
        return;
      }
      this.cache = data;
      this.redraw();
    });
  }

  initChart() {
    super.initChart();
    // 是否显示均价, 默认true
    this.hasAvgPrice = this.options.hasAvgPrice !== false;

    const lastClose = this.cache.lastClose;

    // 计算最大和最小值
    const MAX_VALUE = Number.MAX_VALUE;
    const MIN_VALUE = Number.MIN_VALUE;
    let min = MAX_VALUE;
    let max = 0;
    let maxVolume = 0;
    if (lastClose) {
      // 昨收价存在,取距离昨收价最大偏移量作为最大绝对值
      let maxOffset = 0;
      let eachData;
      Object.keys(this.cache).forEach((key) => {
        eachData = this.cache[key];
        if (eachData && eachData.ChengJiaoJia) {
          maxOffset = Math.max(maxOffset, Math.abs(eachData.ChengJiaoJia - lastClose));
          maxVolume = Math.max(maxVolume, eachData.ChengJiaoLiang);
        }
      });
      max = lastClose + maxOffset;
      min = lastClose - maxOffset;
    } else {
      // 昨收价不存在时
      let eachData;
      Object.keys(this.cache).forEach((key) => {
        eachData = this.cache[key];
        if (eachData && eachData.ChengJiaoJia) {
          max = Math.max(max, eachData.ChengJiaoJia || MIN_VALUE);
          min = Math.min(min, eachData.ChengJiaoJia || MAX_VALUE);
          maxVolume = Math.max(maxVolume, eachData.ChengJiaoLiang);
        }
      });
    }

    // 最大值和最小值范围增加10%
    this.max = max > min ? max + ((max - min) * 0.1) : max * 1.1;
    this.min = max > min ? min - ((max - min) * 0.1) : max * 0.9;
    this.maxVolume = maxVolume;

    this.minChartHeight = this.mainChartHeight;
    this.minYPixelRadio = this.minChartHeight / (this.max - this.min);
    this.volumeYPixelRadio = this.volumeChartHeight / maxVolume;
    this.pixelPer = (this.canvas.canvasWidth / this.cache.minTimes.length);
  }

  /* eslint class-methods-use-this: 0 */
  formatXAxisLabel(text, hasDate = false) {
    const date = new Date(text);
    return hasDate ? Chart.formatDate(date, 'yyyy-MM-dd hh:mm') : Chart.formatDate(date, 'hh:mm');
  }

  redraw() {
    if (this.cache) {
      super.redraw();
    }
    this.cache = null
  }

  dateArr = ["09:30","10:30","11:30","14:00","15:00"];

  drawChart() {
    const minTimes = this.cache.minTimes;
    const pixelPer = this.pixelPer;
    const pricePoints = [];
    const avgPricePoints = [];
    const hasAvgPrice = this.hasAvgPrice;
    let lastPrice = this.cache.lastClose;

    let timeArr = [];
    minTimes.forEach((time, index) => {
      //console.log("time is ",time)
      const minData = this.cache[time];
      if (minData) {
        const isUp = minData.isUp = minData.ChengJiaoJia >= lastPrice;
        const x1 = pixelPer * index;
        const x2 = x1 + (pixelPer / 2);
        minData.ChengJiaoJia && pricePoints.push([
          x2, (this.max - minData.ChengJiaoJia) * this.minYPixelRadio]);
        hasAvgPrice && minData.JunJia && avgPricePoints.push([
          x2,
          (this.max - minData.JunJia) * this.minYPixelRadio,
          (!(minData.JunJia > this.max || minData.JunJia < this.min)),
        ]);
        this.hasVolume && this.drawVolume(index, minData.ChengJiaoLiang, isUp);
        lastPrice = minData.ChengJiaoJia;
      }

      let timeFormat = this.formatXAxisLabel(minTimes[index])
      timeArr.push(timeFormat)


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


    let pix = this.canvas.canvasWidth/4;

    for(let i =0 ;i<5;i++){
      if(i ==0){

        if(typeof this.options.stock != undefined){
            let stock2bit =  this.options.stock.substr(0,2)
            if((stock2bit == 'SH' || stock2bit =='SZ') && timeArr[0] < '09:30'){
                timeArr[0]  =  '09:30'
            }
        }
        this.drawXAxisGridLine(i * pix, timeArr[0], '#dddddd','first');
      }else if(i==2){
        this.drawXAxisGridLine(i * pix, timeArr[Math.round(timeArr.length/2)], '#dddddd','middle');
      }else if(i==4){
        this.drawXAxisGridLine(i * pix, timeArr[timeArr.length-1], '#dddddd','end');
      }else{
        this.drawXAxisGridLine(i * pix, false, '#dddddd');
      }
    }
    timeArr = null;

    this.canvas.fillPath(pricePoints, this.minChartHeight, '#3e6ac5', 'rgba(230,239,254, 0.8)',1);
    hasAvgPrice && this.canvas.drawPath(avgPricePoints, '#EB5F15');


    // 按压时显示十字光标
    if (this.pressPoint) {
      let { x, y } = this.pressPoint;
      const index = parseInt(x / (pixelPer), 10);
      const minTime = minTimes[index];
      const data = this.cache[minTime];
      if (data) {
        // x
        x = ((pixelPer) * index) + (pixelPer / 2);
        this.drawXAxisGridLine(x, this.formatXAxisLabel(minTime), this.pointerLineColor,
          undefined, true, true);

        // y
        const price = data.ChengJiaoJia;
        y = (this.max - price) * this.minYPixelRadio;
        this.drawYAxisGridLine(y, price, this.pointerLineColor, (y > this.minChartHeight / 2) ? 'top' : 'bottom', true, this.getColor(data.ChengJiaoJia >= this.cache.lastClose));
        this.canvas.drawCircle(x, y, 3, 'rgba(230, 100, 100, 0.8)');

        // 显示详细信息
        this.drawTooltip(data);
      }
    }
  }


  drawXAxisGridLine(x, text, color = this.gridLineColor, position = 'middle', withBackground = false, full = false, tickColor = this.tickColor) {
    if(position == 'first')
      this.canvas.drawLine(x, 0, x, full ? this.canvas.canvasHeight : this.mainChartHeight, this.gridLineWidth, color);
    else
      this.canvas.drawLineDash(x, 0, x, full ? this.canvas.canvasHeight : this.mainChartHeight, this.gridLineWidth, color);
    if (text) {
      const textWidth = this.canvas.measureText(text);
      const fontSize = this.fontSize;
      let textX
      if(position === 'middle'){
         textX = x - (textWidth / 2);
      }else if(position == 'first'){
        textX = x+2*this.canvas.pixelRadio
      }else if(position == 'end'){
        textX = x-28*this.canvas.pixelRadio
      } else {
         textX = x
      }
      const textY = this.mainChartHeight + fontSize + 2;

      this.canvas.drawText(text, textX, textY, fontSize, tickColor,
        withBackground && this.tickBackgroundColor);
    }
  }

  drawVolume(index, volume, isUp) {
    const x = this.pixelPer * index;
    const y = this.canvas.canvasHeight;
    const width = Math.max(0.5, this.pixelPer - 1);
    const height = -this.volumeYPixelRadio * volume;

    let color = isUp ? '#ee2c2c':'#1ca049';
    this.canvas.drawRect(x, y, width, height, color);
  }

  drawTooltip(data) {
    const fontSize = this.fontSize;
    const y = fontSize + 2;
    const lastClose = this.cache.lastClose;
    let startX = 50;
    [
      { label: `时间:${this.formatXAxisLabel(data.ShiJian * 1000)}`, labelColor: '#555555' },
      { label: `价格:${Chart.formatNumber(data.ChengJiaoJia, 2)}`, labelColor: '#0095D9' },
      this.hasAvgPrice && (data.JunJia <= this.max && data.JunJia >= this.min) ? {
        label: `均价:${Chart.formatNumber(data.JunJia, 2)}`,
        labelColor: '#EB5F15',
      } : undefined,
      {
        label: `涨跌:${Chart.formatNumber((data.ChengJiaoJia - lastClose) / lastClose, 2, '%')}`,
        labelColor: this.getColor(data.ChengJiaoJia >= lastClose),
      },
      { label: `成交量:${Chart.formatNumber(data.ChengJiaoLiang, 2, 'K/M')}`, labelColor: this.getColor(data.isUp) },
    ].forEach(({ label, labelColor } = {}) => {
      if (label) {
        this.canvas.drawText(label, startX, y, fontSize, labelColor);
        startX += (this.canvas.measureText(label) + 10);
      }
    });
  }

  drawBackground() {
    const lastClose = this.cache.ZuoShou;
    const max = this.max;
    const min = this.min;

    // 画出纵坐标和网格线
    this.drawYAxisGridLine(0, max, undefined, 'bottom', undefined, this.getColor(true));
    this.drawYAxisGridLine(this.minChartHeight, min, undefined, 'bottom', undefined,
      this.getColor(false),10*this.canvas.pixelRadio);

    this.drawYAxisGridLine(this.minChartHeight / 2, lastClose || (max - ((max - min) / 2)),undefined,'bottom');
    this.drawYAxisGridLine(this.minChartHeight / 4, max - ((max - min) / 4), undefined,
      undefined, undefined, this.getColor(true));
    this.drawYAxisGridLine(this.minChartHeight * (3 / 4), max - ((max - min) * (3 / 4)),
      undefined, undefined, undefined, this.getColor(false));

    //super.drawYAxisGridLine(this.canvas.canvasHeight, '0');
    super.drawYAxisGridLine(this.canvas.canvasHeight - this.volumeChartHeight, this.maxVolume, null, 'bottom');
  }

  drawYAxisGridLine(y, text, color = this.gridLineColor, position = 'top', withBackground = false, tickColor = this.tickColor,textMove = 0) {
    super.drawYAxisGridLine(y, text, color, position, withBackground, tickColor,textMove);

    if (text) {
      const yAxisTicks = this.yAxisTicks;
      const rightText = Chart.formatNumber((text - this.cache.lastClose) / this.cache.lastClose, 2, '%', false);
      if(textMove >0 )
         y-=textMove
      yAxisTicks.push({
        text: rightText,
        x: this.canvas.canvasWidth - this.canvas.measureText(rightText) - 5*this.canvas.pixelRadio,
        y: (position === 'top' ? y - 2 : y + this.fontSize + 2),
        tickColor,
        withBackground,
      });
    }
  }

  panMove(pressed, x, y) {
    if (pressed) {
      this.pressPoint = { x, y };
    } else {
      this.pressPoint = null;
    }
    this.redraw();
  }
}
