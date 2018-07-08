import HttpUtil from '../utils/http';

export default {
  jsConfig(data, success) {
    HttpUtil.use({
      url: '/wechat/jsConfig',
      method: 'POST',
      data,
      success,
    });
  },
};
