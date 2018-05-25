import VueSocketio from 'vue-socket.io';
import constant from '../constant';

export default ({ Vue }) => {
  Vue.use(VueSocketio, constant.SERVER_PREFIX);
};
