<template>
  <div class="main-view window-height window-width column items-center justify-center">
    <q-card class="main-card bg-white shadow-4">
      <q-card-title class="text-center text-primary">{{ title }}</q-card-title>
      <q-card-main>
        <q-btn color="primary" @click="$router.push('/login')"
          class="full-width main-btn">手机号登录</q-btn>
        <q-btn color="primary" @click="$router.push('/register')"
          class="full-width main-btn">注册</q-btn>
        <q-btn flat color="primary" @click="$router.push('/forgetPwd')"
          class="full-width main-btn">忘记密码?</q-btn>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
import PackageJson from '../../package.json';

export default {
  created() {
    const { token } = this.$store.state;
    // 自动登录
    if (token) {
      this.$router.replace('/home/dashboard');
    }
  },
  data() {
    return {
      title: PackageJson.productName,
    };
  },
};
</script>

<style scoped lang="stylus">
  .main-view
    background url('../statics/bgs/login.jpg') no-repeat
    background-size cover
    .main-card
      padding 1rem
      width 70%
      .main-btn
        margin-top 16px
</style>
