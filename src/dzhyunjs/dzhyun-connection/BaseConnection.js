// Object.assign polyfill
if (typeof Object.assign !== 'function') {
  Object.assign = function assign(target, ...args) { // .length of function is 2
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    const to = Object(target);

    for (let index = 0; index < args.length; index += 1) {
      const nextSource = args[index];

      if (nextSource != null) { // Skip over if undefined or null
        for (const nextKey in nextSource) { // eslint-disable-line no-restricted-syntax
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

/**
 * connection基类
 */
class BaseConnection {

  /**
   * 构造方法
   * @param {!string} address 连接地址
   * @param {!object} options 设置参数
   * @param {object=} handler 事件处理对象
   * @param {boolean=} [secure=false]
   */
  constructor(address, options, handler, secure) {
    if (typeof address !== 'string') {
      throw new Error('address is incorrect');
    }
    if (this.constructor === BaseConnection) {
      // eslint-disable-next-line no-use-before-define
      return getInstance(address, options, handler);
    }
    this._address = address;
    this.options = options || {};

    if (typeof handler === 'boolean') {
      this._secure = handler;
      this._handler = null;
    } else {
      this._secure = secure || false;
      this._handler = handler;
    }

    // 默认协议
    this._protocol = 'http';

    this._listenerMap = {};
  }

  getAddress() {
    return `${this.getProtocol()}://${this._address.replace(/^(\w+:\/\/)?/, '')}`;
  }

  getProtocol() {
    return this._protocol + (this._secure ? 's' : '');
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  request(message, options) {
  }

  send(message, options) {
    return this.request(message, options);
  }

  // eslint-disable-next-line class-methods-use-this
  close() {
  }

  /**
   * 事件监听接口
   */
  on(type, listener) {
    if (typeof listener === 'function') {
      const listeners = this._listenerMap[type] || (this._listenerMap[type] = []);
      if (listeners.indexOf(listener) < 0) {
        listeners.push(listener);
      }
    }
    return this;
  }

  off(type, listener) {
    if (typeof listener === 'function') {
      const listeners = this._listenerMap[type] || (this._listenerMap[type] = []);
      const index = listeners.indexOf(listener);
      if (index >= 0) listeners.splice(index, 1);
    }
    return this;
  }

  trigger(type, ...args) {
    const listeners = this._listenerMap[type];
    if (listeners) listeners.forEach(listener => listener.apply(this, args));

    // 同时触发handler中对应方法
    if (this._handler && typeof this._handler[type] === 'function') this._handler[type](...args);
    return this;
  }
}

BaseConnection.EVENT_OPEN = 'open';
BaseConnection.EVENT_CLOSE = 'close';
BaseConnection.EVENT_ERROR = 'error';
BaseConnection.EVENT_REQUEST = 'request';
BaseConnection.EVENT_SEND = 'send';
BaseConnection.EVENT_RESPONSE = 'response';
BaseConnection.EVENT_MESSAGE = 'message';
BaseConnection.EVENT_PROGRESS = 'progress';

function getInstance(url, options, handler) {
  const [, , protocol = 'http', urlWithoutProtocol] = /^((\w+):\/\/)?(.*)/.exec(url);

  const func = BaseConnection[protocol];
  if (!func) {
    throw new Error(`protocol "${protocol}" no support`);
  }
  return func(urlWithoutProtocol, options, handler);
}

export default BaseConnection;
