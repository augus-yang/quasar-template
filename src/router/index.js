import Vue from 'vue';
import VueRouter from 'vue-router';
import { Loading } from 'quasar';

import store from '../store';
import routes from './routes';
import ConstantUtil from '../utils/constant';

Vue.use(VueRouter);

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

Router.beforeEach((to, from, next) => {
  Loading.show();

  // 判断跳转路由是否需要验证token
  const unTokenIndex = ConstantUtil.UNTOKEN_ROUTE_PATHS.findIndex(path => path === to.path);
  if (unTokenIndex > -1) {
    next();
    return;
  }

  // 判断用户是否登录
  const tokenValue = store.state.token;
  if (tokenValue) {
    next();
    return;
  }

  // 因为next函数如果指定了path，则不会执行router的afterEach方法，所以需手动关闭Loading
  Loading.hide();
  next('/main');
});

Router.afterEach(() => {
  Loading.hide();
});

export default Router;
