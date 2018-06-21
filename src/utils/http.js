import axios from 'axios';
import {
  Loading,
  Notify,
} from 'quasar';

import store from '../store';
import router from '../router';
import ConstantUtil from './constant';

export default {
  ajax(opts) {
    opts = opts || {};

    const method = opts.method || 'get';
    const config = {
      url: opts.url || '',
      headers: opts.headers || {},
      method,
    };

    if (method === 'get') {
      config.params = opts.data || {};
    } else {
      config.data = opts.data || {};
    }

    Loading.show();

    axios(config).then((response) => {
      Loading.hide();

      if (opts.success) {
        opts.success(response.data);
      }
    }).catch((error) => {
      Loading.hide();

      if (opts.error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          opts.error(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          Notify.create({
            type: 'negative',
            message: '请检查网络连接',
          });
        } else {
          // Something happened in setting up the request that triggered an Error
        }
      }
    });
  },

  use(opts) {
    opts = opts || {};
    const headers = opts.headers || {};
    headers.Authorization = `Bearer ${store.state.token}`;

    this.ajax({
      url: ConstantUtil.SERVER_API_PREFIX + (opts.url || ''),
      method: opts.method || 'get',
      headers,
      data: opts.data || {},
      success: (response) => {
        if (opts.success) {
          opts.success(response.data);
        }
      },
      error: (response) => {
        if (response.code === ConstantUtil.SERVER_LOGIN_TIMEOUT_ERROR_CODE) {
          Notify.create({
            type: 'warning',
            message: '登录超时',
          });
          store.commit('setToken', '');
          router.replace('/main');
          return;
        }

        const errorMessage = response.message;

        Notify.create({
          type: 'negative',
          message: errorMessage,
        });

        if (opts.error) {
          opts.error(errorMessage);
        }
      },
    });
  },
};
