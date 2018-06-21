import VueSocketio from 'vue-socket.io';
import ConstantUtil from '../utils/constant';

export default ({ Vue }) => {
  Vue.use(VueSocketio, ConstantUtil.SERVER_PREFIX);
};
