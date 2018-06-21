<template>
  <div class="error-page window-height window-width
    column items-center justify-center text-center text-white">
    <h1 class="window-width">404</h1>
    <h5>Page Not Found</h5>
    <p>oops! page not found</p>
    <q-btn class="bg-white text-black" @click="backOrHome">返回</q-btn>
  </div>
</template>

<script>
export default {
  methods: {
    backOrHome() {
      if (window.history.length > 1) {
        this.$router.back();
        return;
      }

      this.$router.replace('/home/dashboard');
    },
  },
};
</script>

<style scoped lang="stylus">
  .error-page
    background-color #2196F3
    h1
      background url('../statics/404.png') no-repeat center
      text-shadow 6px 6px 7px rgba(0, 0, 0, 0.32)
      padding 70px 0
      font-size 150px
      margin-bottom 0px
    h5
      font-size 23px
    p
      font-size 17px
</style>
