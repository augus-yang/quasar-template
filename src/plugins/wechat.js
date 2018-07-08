import wx from 'weixin-js-sdk';

import WechatApi from '../apis/wechat';

export default ({ Vue }) => {
  // wechat
  Vue.prototype.$wechat = (config, ready) => {
    WechatApi.jsConfig(config, (data) => {
      wx.config(data);

      wx.ready(() => {
        ready(wx);
      });

      wx.error((res) => {
        // eslint-disable-next-line
        console.log(res);
      });
    });
  };
};
