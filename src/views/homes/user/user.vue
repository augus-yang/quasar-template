<template>
  <q-page padding>
    <q-list>
      <q-item>
        <q-item-side icon="account box" />
        <q-item-main>
          <q-item-tile label>手机号</q-item-tile>
          <q-item-tile sublabel>{{ mobile }}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item-separator />
      <q-item>
        <q-item-side icon="attach money" />
        <q-item-main @click.native="$router.push('/home/user/point')">
          <q-item-tile label>积分</q-item-tile>
          <q-item-tile sublabel>{{ point }}</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <div class="custom-right">
            <q-btn color="primary" size="xs" @click="chargeModelOpened = true">充值</q-btn>
            <q-icon name="keyboard arrow right" />
          </div>
        </q-item-side>
      </q-item>
      <q-item-separator />
      <q-item>
        <q-item-main>
          <q-btn color="primary" @click="loginOut" class="full-width">退出登录</q-btn>
        </q-item-main>
      </q-item>
    </q-list>

    <q-modal v-model="chargeModelOpened" minimized :content-css="{ padding: '20px' }">
      <q-field label="积分充值" :error="$v.form.chargeValue.$error">
        <q-option-group type="radio" color="secondary" v-model="form.chargeValue"
          :options="[
            { label: '1元=10积分', value: 1 },
            { label: '6元=60积分', value: 6 },
            { label: '12元=120积分', value: 12 },
            { label: '25元=250积分', value: 25 },
            { label: '50元=500积分', value: 50 },
            { label: '108元=1080积分', value: 108 }
          ]" />
      </q-field>
      <q-btn color="primary" @click="charge" class="full-width">支付</q-btn>
      <q-inner-loading :visible="chargeModelLoadingVisible" />
    </q-modal>
  </q-page>
</template>

<script>
import {
  mapState,
  mapMutations,
} from 'vuex';
import {
  required,
  numeric,
} from 'vuelidate/lib/validators';

export default {
  computed: {
    ...mapState({
      mobile: state => state.user.mobile,
    }),
  },
  validations: {
    form: {
      chargeValue: {
        required,
        numeric,
      },
    },
  },
  data() {
    return {
      point: 0,
      chargeModelOpened: false,
      chargeModelLoadingVisible: false,
      form: {
        chargeValue: 1,
      },
    };
  },
  methods: {
    ...mapMutations([
      'setToken',
    ]),
    loginOut() {
      this.$q.dialog({
        title: '提示',
        message: '确定退出当前账号吗？',
        ok: '确定',
        cancel: '取消',
      }).then(() => {
        this.setToken('');
        this.$router.replace('/main');
      }).catch(() => {});
    },
    charge() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        if (this.$q.platform.is.cordova) {
          this.$data.chargeModelLoadingVisible = true;

          // apple支付
          inAppPurchase.getProducts([`charge_number_${this.$data.form.chargeValue}`]).then((products) => {
            inAppPurchase.buy(products[0].productId).then(() => {
              this.$data.chargeModelLoadingVisible = false;
              // 关闭Modal
              this.$data.chargeModelOpened = false;

              this.$q.notify({
                type: 'positive',
                message: '充值成功',
              });
            }).catch((err) => {
              this.$data.chargeModelLoadingVisible = false;
              // eslint-disable-next-line
              console.log(err);
            });
          }).catch((err) => {
            this.$data.chargeModelLoadingVisible = false;
            // eslint-disable-next-line
            console.log(err);
          });
        }

        // eslint-disable-next-line
        console.log(`充值金额：${this.$data.form.chargeValue}`);
      } else {
        this.$q.notify({
          type: 'negative',
          message: '请选择支付金额',
        });
      }
    },
  },
};
</script>

<style scoped lang="stylus">
  .q-option-group
    div
      margin-bottom 10px

  .custom-right
    i
      margin-left 10px
</style>
