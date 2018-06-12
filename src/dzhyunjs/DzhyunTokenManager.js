/* eslint camelcase: 0 */
import DzhyunConnection from './dzhyun-connection/index.js';
import JSSHA from 'jssha/src/sha1';

const oneDayDuration = 24 * 60 * 60;
const tokenAccessServiceUrl = '/token/access';

class InternalTokenManager {

  constructor({ address, appid, secret_key, shortid }) {
    this.address = address;
    this.appid = appid;
    this.secret_key = secret_key;
    this.shortid = shortid;
  }

  getToken = (duration = oneDayDuration) => {
    if (!this._promise) {

      // 先判断如果有缓存的token，否则先尝试本地生成，失败则再尝试请求远程接口
      this._promise = Promise.resolve(this.getCacheToken())
      .catch(() => this.generateToken(duration))
      .catch(() => this.access())
      .then((token) => {
        this._promise = null;
        this._token = token;
        return token;
      });
    }
    return this._promise;
  };

  generateToken = (duration = oneDayDuration) => {
    if (!this.appid || !this.secret_key || !this.shortid) {
      return Promise.reject('缺少信息，无法生成token');
    }
    return new Promise((resolve) => {
      const expiredTime = parseInt(Date.now() / 1000, 10) + duration;
      const rawMask = `${this.appid}_${expiredTime}_${this.secret_key}`;
      const shaObj = new JSSHA('SHA-1', 'TEXT');
      shaObj.setHMACKey(this.secret_key, 'TEXT');
      shaObj.update(rawMask);
      const hexMask = shaObj.getHMAC('HEX');
      const token = [this.shortid, expiredTime, hexMask].join(':');
      resolve(token);
    });
  };

  access() {
    if (!this.address || !this.appid || !this.secret_key) {
      return Promise.reject('缺少信息，无法请求token');
    }
    return new Promise((resolve, reject) => {
      new DzhyunConnection(this.address, { dataType: 'json' }, {
        response: (result) => {
          if (result.Err !== 0) {
            const err = new Error(result.Data.desc);
            err.code = result.Data.code;
            reject(err);
          } else if (result.Data && result.Data.RepDataToken) {
            resolve(result.Data.RepDataToken[0].token);
          }
        },
        error: reject,
      }).request(`${tokenAccessServiceUrl}?appid=${this.appid}&secret_key=${this.secret_key}`);
    });
  }

  getCacheToken() {
    return new Promise((resolve, reject) => {
      if (this._token) {

        // 判断保留的token是否过期
        const expireTime = `${this._token.split(':')[1]}000`;
        if (parseInt(expireTime, 10) > Date.now()) {
          return resolve(this._token);
        }
      }
      return reject();
    });
  }
}

/**
 * 云平台Token管理
 */
export default class DzhyunTokenManager {

  /**
   * @param {Object} param
   * @param {string=} param.address 服务器地址
   * @param {!string} param.appid
   * @param {!string} param.secret_key
   * @param {!string} param.shortid
   */
  constructor({ address, appid, secret_key, shortid } = {}) {
    const tokenManager = new InternalTokenManager({ address, appid, secret_key, shortid });
    this.getToken = tokenManager.getToken;
    this.generateToken = tokenManager.generateToken;
  }
}

// 避免 export default 导出的模块需要通过.default调用
//module.exports = DzhyunTokenManager;
