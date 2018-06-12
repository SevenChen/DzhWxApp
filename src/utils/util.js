import DzhyunTokenManager from '@/dzhyunjs/DzhyunTokenManager.js';
import Dzhyun from '@/dzhyunjs/Dzhyun.js';

// 请求token
const yunToken = ()=>{return new DzhyunTokenManager({
									appid: '**',
									secret_key: '**',
									shortid: '**'
						})};
//
function noop() {};

/**
 * 格式化文本，将输入的数字参数格式化为指定精度的字符串
 * @param {!number|string|null} data      需要格式化的数字，可以是数字，字符串或者null对象
 * @param {?number} precision             保留小数精度，null则默认取2位小数
 * @param {?''|'K'|'M'|'K/M'|'%'} unit    单位，按自定的单位格式化数据，null则为''为不加单位
 * @param {boolean|string=} useDefault    是否使用默认值，默认显示--，字符串类型表示需要显示的默认值
 * @returns {string}
 */
 /* eslint no-param-reassign: 0 */
function formatNumber(data = 0, precision = 2, unit = '', useDefault) {
  let n = Number(data);
  if ((isNaN(n)) && useDefault !== false) {
    return useDefault || '--';
  }

  if (unit.indexOf('B') >= 0 && n >= 10 * 1000 * 1000 * 1000) {
    unit = 'B';
    n /= (1000 * 1000 * 1000);
  } else if (unit.indexOf('亿') >= 0 && n >= 10 * 10000 * 10000) {
    unit = '亿';
    n /= (10000 * 10000);
  } else if (unit.indexOf('M') >= 0 && n >= 10 * 1000 * 1000) {
    unit = 'M';
    n /= (1000 * 1000);
  } else if (unit.indexOf('万') >= 0 && n >= 10 * 10000) {
    unit = '万';
    n /= 10000;
  } else if (unit.indexOf('K') >= 0 && n >= 10 * 1000) {
    unit = 'K';
    n /= 1000;
  } else if (unit === 100) {
    unit = '';
    n /= 100;
  } else if (unit === '%') {
    n *= 100;
  } else {
    unit = '';
  }

  return n.toFixed(precision) + unit;
}

function formatDate(time, format) {
  const date = new Date(time);
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  let d;
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  Object.keys(o).forEach((k) => {
    d = o[k];
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? d : (`00${d}`).substr((JSON.stringify(d)).length));
    }
  });
  return format;
}

export { Dzhyun, formatNumber, formatDate, noop , yunToken};
