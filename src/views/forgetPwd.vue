<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" glossy>
        <q-btn flat dense @click="$router.back()">
          <q-icon name="keyboard_arrow_left"/>
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
            @input="$v.form.mobile.$touch" placeholder="输入手机号">
            <q-btn color="primary" :disable="sendCaptchaDisabled" size="xs" @click="sendCaptcha"
                   v-if="form.mobile && !$v.form.mobile.$error">{{ sendCaptchaButtonText }}</q-btn>
          </q-input>
        </q-field>
        <q-field icon="card_travel" :error="$v.form.captcha.$error" error-label="验证码不正确">
          <q-input v-model="form.captcha" placeholder="输入验证码" @input="$v.form.captcha.$touch" />
        </q-field>
        <q-field icon="lock" :error="$v.form.pwd.$error" error-label="密码不少于6位">
          <q-input type="password" v-model="form.pwd"
            placeholder="输入密码，不少于6位" @input="$v.form.pwd.$touch" />
        </q-field>
        <q-field icon="lock" :error="$v.form.pwdSubmit.$error" error-label="两次密码不一致">
          <q-input type="password" v-model="form.pwdSubmit"
            placeholder="输入确认密码" @input="$v.form.pwdSubmit.$touch" />
        </q-field>
        <q-btn color="primary" push @click="forgetPwd" class="full-width form-btn">提交</q-btn>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  numeric,
  sameAs,
} from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      form: {
        mobile: '',
        captcha: '',
        pwd: '',
        pwdSubmit: '',
      },
      sendCaptchaButtonText: '发送',
      sendCaptchaDisabled: false,
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
      captcha: {
        required,
        numeric,
        minLength: minLength(4),
        maxLength: maxLength(4),
      },
      pwd: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
      pwdSubmit: {
        sameAsPwd: sameAs('pwd'),
      },
    },
  },
  methods: {
    forgetPwd() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        this.$api.user.forgetPwd({
          mobile: this.form.mobile,
          captcha: this.form.captcha,
          pwd: this.form.pwd,
        }, () => {
          this.$q.notify({
            type: 'positive',
            message: '修改密码成功',
          });

          this.$router.replace('/main');
        });
      }
    },
    sendCaptcha() {
      this.sendCaptchaButtonText = 60;
      this.sendCaptchaDisabled = true;

      this.$api.user.captcha({
        mobile: this.form.mobile,
      }, () => {
        this.$q.notify({
          type: 'positive',
          message: '发送成功',
        });
      });

      const interval = setInterval(() => {
        if (this.sendCaptchaButtonText === 0) {
          this.sendCaptchaButtonText = '发送';
          this.sendCaptchaDisabled = false;
          clearInterval(interval);
        } else {
          this.sendCaptchaButtonText -= 1;
        }
      }, 1000);
    },
  },
};
</script>

<style scoped lang="stylus"></style>
