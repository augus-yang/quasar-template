import api from '../apis';

export default ({ Vue }) => {
  Vue.prototype.$api = api;
};
