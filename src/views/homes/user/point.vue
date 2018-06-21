<template>
  <q-pull-to-refresh pull-message="下拉刷新" release-message="释放刷新"
    refresh-message="刷新中..." :handler="refresher">
    <q-page padding>
      <blockquote>
        <small>您可以查看积分的获取与消耗详情</small>
      </blockquote>
      <q-tabs color="primary" align="justify">
        <q-tab default name="income" slot="title" icon="insert comment" label="获取" />
        <q-tab name="expenditure" slot="title" icon="bookmark" label="消耗" />

        <q-tab-pane name="income">
          <p v-if="incomeList.length == 0" style="text-align: center">无数据</p>
          <q-list v-for="item in earnList" :key="item.index" v-else>
            <q-list-header class="text-positive">+{{item.header}}</q-list-header>
            <q-item v-for="base in item.bases" :key="base.index">
              <q-item-side>
                <q-item-tile>{{base.label}}</q-item-tile>
              </q-item-side>
              <q-item-main>
                <q-item-tile>{{base.value}}</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-tab-pane>
        <q-tab-pane name="expenditure">
          <p v-if="expenditureList.length == 0" style="text-align: center">无数据</p>
          <q-list v-for="item in costList" :key="item.index" v-else>
            <q-list-header class="text-negative">-{{item.header}}</q-list-header>
            <q-item v-for="base in item.bases" :key="base.index">
              <q-item-side>
                <q-item-tile>{{base.label}}</q-item-tile>
              </q-item-side>
              <q-item-main>
                <q-item-tile>{{base.value}}</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-tab-pane>
      </q-tabs>
    </q-page>
  </q-pull-to-refresh>
</template>

<script>
export default {
  data() {
    return {
      incomeList: [],
      expenditureList: [],
    };
  },
  methods: {
    refresher(done) {
      setTimeout(() => {
        done();
        this.$q.notify({
          type: 'positive',
          message: 'refresh',
        });
      }, 1000);
    },
  },
};
</script>

<style scoped lang="stylus"></style>
