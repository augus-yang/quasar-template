# quasar-template

> A Quasar Framework app

## Build Setup

``` bash
# install dependencies
$ npm install
 
# serve with hot reload at localhost:8080
$ quasar dev
 
# build for production with minification
$ quasar build
 
# lint code
$ npm run lint
```

## Cordova

``` bash
# development
$ quasar dev -m cordova -T [android|ios] -t [mat|ios]
 
# production
$ quasar build -m cordova -T [android|ios] -t [mat|ios]
 
# hot code push
$ cordova-hcp build
```

### 内置浏览器

#### 定制按钮不显示

* 手动拷贝`src-cordova/plugins/cordova-plugin-themeablebrowser/src/ios/Resources`目录下所有文件
* 打开Xcode，复制到`Resources`文件夹中

### 热更新

#### 操作步骤

* 需要额外搭建静态服务器(推荐nginx)
* 打包cordova项目

``` bash
$ quasar build -m cordova -T [android|ios] -t [mat|ios]
 
// for example
$ quasar build -m cordova -T ios -t ios
```

* 重新生成版本

``` bash
$ cd src-cordova
$ cordova-hcp build
```

* 拷贝`src-cordova/www`文件夹到静态服务器上
* 重新启动App（第一次启动的时候检查更新并下载更新，第二次启动的时候就会使用更新的版本）

#### 修改静态服务器地址

* 修改`src-cordova/config.xml`内`<chcp>`标签下的`<config-file>`标签内的`url`的值
* 修改`src-cordova/cordova-hcp.json`文件内的`content_url`字段值
* 修改好后重新执行生成版本命令（必须要`src-cordova`目录下）

``` bash
$ cordova-hcp build
```
