import xhr2 from 'xhr2';

let xhr;
// 判断环境，浏览器环境存在window对象
if (typeof window !== 'undefined') {
  // 不考虑IE6以下的ActiveX方式
  if (window.XMLHttpRequest) {
    xhr = window.XMLHttpRequest;
  } else {
    console.warn('当前浏览器不支持XMLHttpRequest');
    xhr = xhr2.XMLHttpRequest || xhr2;
  }
} else if (typeof XMLHttpRequest !== 'undefined') {
  // eslint-disable-next-line no-undef
  xhr = XMLHttpRequest;
} else {
  // nodejs中使用xhr2模块
  xhr = xhr2.XMLHttpRequest || xhr2;
}
export default xhr;
