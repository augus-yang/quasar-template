function loadView(view) {
  return () => import(`src/views/${view}.vue`);
}

export default [
  // home
  {
    path: '/home',
    component: loadView('homes/layout'),
    children: [
      // dashboard
      { path: 'dashboard', component: loadView('homes/dashboard'), meta: { title: '主页' } },
      // news
      { path: 'news', component: loadView('homes/news'), meta: { title: '资讯' } },
      // user
      { path: 'user', component: loadView('homes/user/user'), meta: { title: '账号' } },
      // user point
      { path: 'user/point', component: loadView('homes/user/point'), meta: { title: '积分' } },
      // data table
      { path: 'dataTable', component: loadView('homes/dataTable'), meta: { title: '数据表格' } },
      // list
      { path: 'list', component: loadView('homes/list'), meta: { title: '列表' } },
      // blank
      { path: 'blank', component: loadView('homes/blank'), meta: { keepAlive: true, title: '空白' } },
      // excel
      { path: 'excel', component: loadView('homes/excel'), meta: { title: 'Excel' } },
    ],
  },
  // login
  { path: '/login', component: loadView('login'), meta: { title: '手机号登录' } },
  // register
  { path: '/register', component: loadView('register'), meta: { title: '注册' } },
  // // forgetPwd
  { path: '/forgetPwd', component: loadView('forgetPwd'), meta: { title: '忘记密码' } },
  // main
  { path: '/main', component: loadView('main') },
  // 404（ Always leave this as last one ）
  { path: '*', component: loadView('404') },
];
