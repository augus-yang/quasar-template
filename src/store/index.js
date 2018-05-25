import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistedstate from 'vuex-persistedstate';

import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';
import constant from '../constant';
import badge from './badge';
import user from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user,
    badge,
  },
  plugins: [
    VuexPersistedstate({
      key: constant.STORAGE_KEY,
    }),
  ],
});

export default store;
