// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'api',
      'cordova',
      'excel',
      'i18n',
      'qrCode',
      'socket',
      'validator',
      'vuelidate',
      'wechat',
    ],
    css: [
      'app.styl',
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      ctx.theme.ios ? 'ionicons' : null,
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: true,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'hash',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/,
        });
      },
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
    },
    framework: 'all', // --- includes everything; for dev only!
    // framework: {
    //   components: [
    //     'QAjaxBar',
    //     'QCard',
    //     'QCardTitle',
    //     'QCardMain',
    //     'QBtn',
    //     'QLayout',
    //     'QLayoutHeader',
    //     'QLayoutDrawer',
    //     'QLayoutFooter',
    //     'QToolbar',
    //     'QToolbarTitle',
    //     'QIcon',
    //     'QPageContainer',
    //     'QPage',
    //     'QField',
    //     'QInput',
    //     'QTabs',
    //     'QRouteTab',
    //     'QPopover',
    //     'QList',
    //     'QItem',
    //     'QItemTile',
    //     'QListHeader',
    //     'QItemSide',
    //     'QItemMain',
    //     'QTable',
    //     'QTd',
    //     'QCollapsible',
    //     'QChip',
    //     'QItemSeparator',
    //     'QModal',
    //     'QOptionGroup',
    //     'QInnerLoading',
    //     'QPullToRefresh',
    //     'QTab',
    //     'QTabPane',
    //   ],
    //   directives: [
    //     'Ripple',
    //     'CloseOverlay',
    //   ],
    //   // Quasar plugins
    //   plugins: [
    //     'Loading',
    //     'Notify',
    //     'Dialog',
    //   ],
    //   iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons',
    // },
    animations: 'all', // --- includes all animations
    // animations: [
    // ],
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      // eslint-disable-next-line
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      },
    },
  };
};
