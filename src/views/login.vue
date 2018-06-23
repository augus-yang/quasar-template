<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" glossy>
        <q-btn flat dense @click="$router.back()">
          <q-icon name="keyboard_arrow_left" />
        </q-btn>

        <q-toolbar-title>
          {{ $route.meta.title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <q-page padding>
        <q-field icon="phone" :error="$v.form.mobile.$error" error-label="手机号不正确">
          <q-input type="tel" v-model="form.mobile"
            placeholder="输入手机号" @input="$v.form.mobile.$touch" />
        </q-field>
        <q-field icon="lock" :error="$v.form.pwd.$error" error-label="密码不少于6位">
          <q-input type="password" v-model="form.pwd"
            placeholder="输入密码，不少于6位" @input="$v.form.pwd.$touch" />
        </q-field>
        <q-btn color="primary" @click="submit" class="full-width form-btn">登录</q-btn>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      form: {
        mobile: '',
        pwd: '',
      },
    };
  },
  validations: {
    form: {
      mobile: {
        required,
        isMobile(value) {
          if (!value || !this.$validator.isMobile(value)) {
            return false;
          }

          return true;
        },
      },
      pwd: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
    },
  },
  methods: {
    ...mapMutations([
      'setToken',
    ]),
    ...mapMutations('user', [
      'setUser',
    ]),
    submit() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        this.$api.user.login({
          mobile: this.form.mobile,
          pwd: this.form.pwd,
        }, (data) => {
          this.setToken(data.token);
          this.setUser(data.user);

          if (this.$q.platform.is.cordova) {
            // 设置推送标签
            window.JPush.setAlias({
              sequence: data.user.id,
              alias: data.user.mobile,
            });
          }

          this.$router.replace('/home/dashboard');
        });
      }
    },
  },
};
</script>

<style scoped lang="stylus"></style>
