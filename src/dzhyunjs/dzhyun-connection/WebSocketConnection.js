import BaseConnection from './BaseConnection';
import WebSocket from './WebSocket';

class WebSocketConnection extends BaseConnection {
  /**
   * @param address
   * @param {{deferred: boolean}} options
   *  deferred: false 创建连接时马上连接websocket，默认
   *            true  延时在第一次请求时连接websocket
   * @param handler
   * @param secure
   */
  constructor(address, options, handler, secure) {
    super(address, options, handler, secure);

    this._protocol = 'ws';
    this._ws = null;

    const deferred = (options && options.deferred === true) || false;

    if (deferred === false) {
      this._connect();
    }
  }

  getStatus() {
    return this._ws ? this._ws.readyState : WebSocket.CLOSED;
  }

  _connect() {
    // 连接创建websocket
    if (typeof WebSocket !== 'undefined') {
      this._ws = new WebSocket(this.getAddress());

      // 避免WebSocket上没有状态静态值
      if (WebSocket.OPEN === undefined) {
        WebSocket.CONNECTING = this._ws.CONNECTING;
        WebSocket.OPEN = this._ws.OPEN;
        WebSocket.CLOSING = this._ws.CLOSING;
        WebSocket.CLOSED = this._ws.CLOSED;
      }
      this._ws.binaryType =
        this.options.binaryType || this.options.dataType || 'arraybuffer';

      this._ws.addEventListener('open', () => {
        this.trigger(BaseConnection.EVENT_OPEN);
      });
      this._ws.addEventListener('error', err => {
        this.trigger(BaseConnection.EVENT_ERROR, err);
      });
      this._ws.addEventListener('close', () => {
        this.trigger(BaseConnection.EVENT_CLOSE);
      });
      this._ws.addEventListener('message', message => {
        this.trigger(BaseConnection.EVENT_MESSAGE, message.data);
        this.trigger(BaseConnection.EVENT_RESPONSE, message.data);
      });
    } else {
      throw Error("Don't support WebSocket");
    }
  }

  request(message) {
    const msg = message || '';
    if (this.getStatus() === WebSocket.CLOSED) {
      this._connect();
    }

    if (this.getStatus() !== WebSocket.OPEN) {
      this._ws.addEventListener('open', () => {
        this._ws.send(msg);
        this.trigger(BaseConnection.EVENT_SEND, msg);
        this.trigger(BaseConnection.EVENT_REQUEST, msg);
      });
    } else {
      this._ws.send(msg);
      this.trigger(BaseConnection.EVENT_SEND, msg);
      this.trigger(BaseConnection.EVENT_REQUEST, msg);
    }
    return this;
  }

  close() {
    if (this.getStatus() !== WebSocket.CLOSED) {
      this._ws.close();
      this._ws = null;
    }
    return this;
  }
}

BaseConnection.ws = function ws(url, options, handler) {
  return new WebSocketConnection(url, options, handler, false);
};

BaseConnection.wss = function wss(url, options, handler) {
  return new WebSocketConnection(url, options, handler, true);
};

export default BaseConnection;
