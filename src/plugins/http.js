import axios from 'axios';
import {
  Loading,
  Notify,
} from 'quasar';

import constant from '../constant';

export default ({ router, store, Vue }) => {
  Vue.prototype.$http = {
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
          opts.error(error.response);
        }
      });
    },

    get(opts) {
      opts = opts || {};
      opts.method = 'get';
      this.ajax(opts);
    },

    post(opts) {
      opts = opts || {};
      opts.method = 'post';
      this.ajax(opts);
    },

    put(opts) {
      opts = opts || {};
      opts.method = 'put';
      this.ajax(opts);
    },

    del(opts) {
      opts = opts || {};
      opts.method = 'delete';
      this.ajax(opts);
    },

    use(opts) {
      opts = opts || {};
      const headers = opts.headers || {};
      headers.Authorization = `Bearer ${store.state.token}`;

      this.ajax({
        url: constant.SERVER_API_PREFIX + (opts.url || ''),
        method: opts.method || 'get',
        headers,
        data: opts.data || {},
        success: (response) => {
          if (opts.success) {
            opts.success(response.data);
          }
        },
        error: (response) => {
          let errorMessage = '请检查网络连接';

          if (response) {
            if (response.data.code === constant.SERVER_LOGIN_TIMEOUT_ERROR_CODE) {
              Notify.create({
                type: 'warning',
                message: '登录超时',
              });
              store.commit('setToken', '');
              router.replace('/main');
              return;
            }

            errorMessage = response.data.message;
          }

          if (opts.error) {
            opts.error(errorMessage);
          } else {
            Notify.create({
              type: 'negative',
              message: errorMessage,
            });
          }
        },
      });
    },
  };
};
