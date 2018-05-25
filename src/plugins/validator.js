// 手机号规则
const MOBILE_PATTERN = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/;

export default ({ Vue }) => {
  Vue.prototype.$validator = {
    // 手机号验证
    isMobile(mobile) {
      return MOBILE_PATTERN.test(mobile);
    },
  };
};
