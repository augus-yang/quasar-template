import HttpUtil from '../utils/http';

export default {
  count(success) {
    HttpUtil.use({
      url: '/news/count',
      success,
    });
  },
  findAll(success) {
    HttpUtil.use({
      url: '/news',
      success,
    });
  },
};
