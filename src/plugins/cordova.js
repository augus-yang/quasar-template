import ConstantUtil from '../utils/constant';

export default ({ Vue }) => {
  Vue.prototype.$cordova = {
    // 打开浏览器
    browser(url, opts) {
      opts = opts || {};

      cordova.ThemeableBrowser.open(url, '_blank', {
        statusbar: {
          color: '#ffffffff',
        },
        toolbar: {
          height: 44,
          color: '#f0f0f0ff',
        },
        title: {
          color: '#003264ff',
          showPageTitle: true,
        },
        closeButton: {
          image: 'close',
          imagePressed: 'close_pressed',
          align: 'left',
          event: 'closePressed',
        },
        customButtons: [
          {
            image: 'share',
            imagePressed: 'share_pressed',
            align: 'right',
            event: 'sharePressed',
          },
        ],
        backButtonCanClose: true,
      }).addEventListener('closePressed', () => {
        if (opts.close) {
          opts.close();
        }
      }).addEventListener('sharePressed', () => {
        this.share(url, opts);
      });
    },

    // 分享
    share(url, opts) {
      opts = opts || {};

      Wechat.isInstalled((installed) => {
        if (installed) {
          navigator.notification.confirm(
            '根据需求选择不同的分享场景',
            (buttonIndex) => {
              if (buttonIndex === 3) {
                return;
              }

              let scene;
              if (buttonIndex === 1) {
                scene = Wechat.Scene.SESSION;
              } else if (buttonIndex === 2) {
                scene = Wechat.Scene.TIMELINE;
              }

              Wechat.share({
                message: {
                  title: opts.title || 'title',
                  description: opts.description || 'description',
                  thumb: opts.thumb || `${ConstantUtil.SERVER_STATIC_PREFIX}/share.png`,
                  media: {
                    type: Wechat.Type.WEBPAGE,
                    webpageUrl: url,
                  },
                },
                scene,
              }, () => {
                if (opts.shareSuccess) {
                  opts.shareSuccess();
                }
              });
            },
            '分享',
            ['分享给朋友', '分享到朋友圈', '取消'],
          );
        } else {
          navigator.notification.alert(
            '请安装微信后再操作!',
            () => {},
            '提示',
          );
        }
      });
    },

    // 调用相机
    camera(success) {
      navigator.camera.getPicture((imageData) => {
        success(imageData);
      }, (message) => {
        // eslint-disable-next-line
        console.log(message);
      }, {});
    },

    // 上传图片
    upload(fileURL, params, uploadUrl, success) {
      const options = new FileUploadOptions();
      options.fileKey = 'image';
      options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
      options.mimeType = 'image/jpeg';

      options.params = params;

      const ft = new FileTransfer();
      ft.upload(fileURL, encodeURI(uploadUrl), () => {
        success();
      }, () => {
        // eslint-disable-next-line
        console.log('upload error');
      }, options);
    },
  };
};
