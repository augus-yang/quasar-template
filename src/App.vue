<template>
  <div id="q-app">
    <transition v-if="$route.meta.keepAlive">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <transition v-if="!$route.meta.keepAlive">
      <router-view/>
    </transition>
    <q-ajax-bar />
  </div>
</template>

<script>
document.addEventListener('deviceready', () => {
  navigator.splashscreen.hide();
  cordova.plugins.statusbarOverlay.hide();

  window.JPush.init();
  window.JPush.setDebugMode(true);
  window.JPush.resetBadge();
  window.JPush.setApplicationIconBadgeNumber(0);
}, false);

document.addEventListener('jpush.openNotification', (event) => {
  window.JPush.resetBadge();
  window.JPush.setApplicationIconBadgeNumber(0);

  const { adviceUrl } = event;

  if (adviceUrl) {
    this.$cordova.browser(adviceUrl, {
      title: '建議書結果',
      description: '請點擊查看詳情',
    });
  }
}, false);

document.addEventListener('jpush.receiveNotification', () => {
  window.JPush.resetBadge();
  window.JPush.setApplicationIconBadgeNumber(0);
}, false);

document.addEventListener('resume', () => {
  window.JPush.resetBadge();
  window.JPush.setApplicationIconBadgeNumber(0);
}, false);

export default {
  sockets: {
    connect() {
      // eslint-disable-next-line
      console.log('socket connected');
    },
  },
};
</script>

<style lang="stylus"></style>
