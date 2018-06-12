/* eslint no-underscore-dangle: 0 */

import EventEmitter from 'events';

const _internalStorage = {};

export default class Storage extends EventEmitter {
  static _getKey(key) {
    return `dzhyun-wxapp:${key}`;
  }

  static _getItem(key) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: Storage._getKey(key),
        success: result => resolve(result.data),
        fail: () => reject(),
      });
    });
    // let item = await AsyncStorage.getItem(Storage._getKey(key));
    // try {
    //   return JSON.parse(item);
    // } catch (e) {
    //   return item;
    // }
  }

  static _setItem(key, value) {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key: Storage._getKey(key),
        data: value,
        success: () => resolve(),
        fail: () => reject(),
      });
    });
    // return await AsyncStorage.setItem(Storage._getKey(key), JSON.stringify(value));
  }

  static _removeItem(key) {
    return new Promise((resolve, reject) => {
      wx.removeStorage({
        key: Storage._getKey(key),
        success: () => resolve(),
        fail: () => reject(),
      });
    });
    // return await AsyncStorage.removeItem(Storage._getKey(key));
  }

  constructor(storageKey) {
    super();
    this._storageKey = storageKey || '';
  }

  async getItem() {
    const key = this._storageKey;

    if ({}.hasOwnProperty.call(_internalStorage, key)) {
      return _internalStorage[key];
    }

    return (_internalStorage[key] = await Storage._getItem(key) );
  }

  async setItem(value) {
    const key = this._storageKey;
    _internalStorage[key] = value;
    this.emit('update', value);
    return Storage._setItem(key, value);
  }

  removeItem() {
    const key = this._storageKey;
    delete _internalStorage[key];
    this.emit('remove');
    return Storage._removeItem(key);
  }

  on(eventName, listener) {
    super.on(eventName, listener);
    return () => {
      this.removeListener(eventName, listener);
    };
  }

}