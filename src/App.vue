<script>
import store from '@/store/index.js'
import {Dzhyun, formatNumber, formatDate, noop , yunToken} from '@/utils/util.js'

export default {

  created () {
    console.log('app created and cache logs by setStorageSync');
    let token = yunToken().generateToken()._v;
    token = '00000003:1528795034:963610bce2383f91e33f3a49cee9a1ad410bd91f';
    
    if (store.state.wsobj == '') {
      const wsObj = new Dzhyun({
            address: 'wss://gw.yundzh.com/ws',
            dataType: 'json',
            token: token
      });

      store.commit('getNoVolumeStock',wsObj)
      store.commit('setws',wsObj);
      store.commit('settoken',token);
    }
  },
  onShow(options) {
    wx.setStorage({
        key: 'wx.scene',
        data: options.scene
    });
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
