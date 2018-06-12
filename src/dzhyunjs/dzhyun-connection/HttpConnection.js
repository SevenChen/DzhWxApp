import BaseConnection from './BaseConnection';
import ajax from './ajax';

class HttpConnection extends BaseConnection {
  constructor(...args) {
    super(...args);

    // 用于记录当前未关闭的请求
    this._request = [];
  }

  request(message, options) {
    const ajaxOptions = Object.assign({}, this.options, options);
    let xhr;

    ajaxOptions.success = data => {
      this.trigger(BaseConnection.EVENT_MESSAGE, data);
      this.trigger(BaseConnection.EVENT_RESPONSE, data);
    };

    ajaxOptions.error = (jqXHR, textStatus, errorThrown) => {
      this.trigger(BaseConnection.EVENT_ERROR, errorThrown);
    };

    ajaxOptions.complete = () => {
      const index = this._request.indexOf(xhr);
      this._request.splice(index, 1);
    };

    ajaxOptions.url = this.getAddress() + (message || '');

    xhr = ajax(ajaxOptions);

    if (xhr) {
      xhr.onreadystatechange = (origFun => () => {
        if (xhr.readyState === 2) {
          // 发出了请求
          this.trigger(BaseConnection.EVENT_SEND, message);
          this.trigger(BaseConnection.EVENT_REQUEST, message);
        }
        if (origFun) origFun();
      })(xhr.onreadystatechange);
    }

    // 打开了连接
    this.trigger(BaseConnection.EVENT_OPEN);

    this._request.push(xhr);

    xhr.onprogress = event => {
      this.trigger(BaseConnection.EVENT_PROGRESS, event);
    };

    return this;
  }

  close() {
    // 取消全部未结束的请求
    this._request.forEach((xhr, index) => {
      xhr.abort();
      this._request.splice(index, 1);
    });

    this.trigger(BaseConnection.EVENT_CLOSE);
    return this;
  }
}

BaseConnection.http = function http(url, options, handler) {
  return new HttpConnection(url, options, handler, false);
};

BaseConnection.https = function https(url, options, handler) {
  return new HttpConnection(url, options, handler, true);
};

export default BaseConnection;
