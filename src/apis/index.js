import HttpUtil from '../utils/http';

import news from './news';

export default {
  login(data, success) {
    HttpUtil.use({
      url: '/user/login',
      method: 'POST',
      data,
      success,
    });
  },
  register(data, success) {
    HttpUtil.use({
      url: '/user/register',
      method: 'POST',
      data,
      success,
    });
  },
  captcha(data, success) {
    HttpUtil.use({
      url: '/user/captcha',
      method: 'POST',
      data,
      success,
    });
  },
  forgetPwd(data, success) {
    HttpUtil.use({
      url: '/user/forgetPwd',
      method: 'POST',
      data,
      success,
    });
  },
  news,
};
