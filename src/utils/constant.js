let PREFIX = 'http://localhost:8081';
// 后台请求前缀
let SERVER_PREFIX = 'http://localhost:8082';

if (process.env.NODE_ENV === 'production') {
  PREFIX = 'http://localhost:8081';
  SERVER_PREFIX = 'http://localhost:8082';
}

export default {
  PREFIX,
  SERVER_PREFIX,
  // 后台api请求前缀
  SERVER_API_PREFIX: `${SERVER_PREFIX}/api`,
  // 后台静态资源请求前缀
  SERVER_STATIC_PREFIX: `${SERVER_PREFIX}/static`,
  // 存储到storage的key
  STORAGE_KEY: 'quasar-template',
  // 后台登录超时失败code
  SERVER_LOGIN_TIMEOUT_ERROR_CODE: 'token_error',
  // 不需要token的路由地址
  UNTOKEN_ROUTE_PATHS: [
    '/login',
    '/register',
    '/forgetPwd',
    '/main',
  ],
};
