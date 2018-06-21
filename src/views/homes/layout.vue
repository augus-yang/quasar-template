<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-layout-header>
      <q-toolbar color="primary" glossy>
        <q-btn flat dense @click="leftDrawerOpen = !leftDrawerOpen">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title class="text-center">
          {{ $route.meta.title }}
          <div slot="subtitle" v-if="$route.meta.subtitle">{{ $route.meta.subtitle }}</div>
        </q-toolbar-title>

        <q-btn flat dense>
          <q-icon name="more_vert" />
          <q-popover>
            <q-list link separator style="min-width: 150px;">
              <q-item>
                <q-item-side icon="supervisor account" />
                <q-item-main :label="mobile" />
              </q-item>
              <q-item v-close-overlay @click.native="loginOut">
                <q-item-side icon="exit to app" />
                <q-item-main label="退出登录" />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <!-- Left Side Panel -->
    <q-layout-drawer v-model="leftDrawerOpen" content-class="bg-grey-2">
      <q-list no-border link inset-delimiter>
        <q-list-header>Home</q-list-header>
        <q-item exact to="/home/dashboard">
          <q-item-side icon="school" />
          <q-item-main label="主页" sublabel="dashboard" />
        </q-item>
        <q-item exact to="/home/news">
          <q-item-side icon="list" />
          <q-item-main label="资讯" sublabel="news" />
        </q-item>
        <q-item exact to="/home/user">
          <q-item-side icon="account box" />
          <q-item-main label="账号" sublabel="user" />
        </q-item>
        <q-item exact to="/home/dataTable">
          <q-item-side icon="list" />
          <q-item-main label="数据表格" sublabel="dataTable" />
        </q-item>
        <q-item exact to="/home/list">
          <q-item-side icon="inbox" />
          <q-item-main label="列表页" sublabel="list" />
        </q-item>
        <q-item exact to="/home/excel">
          <q-item-side icon="explicit" />
          <q-item-main label="Excel" sublabel="excel" />
        </q-item>
        <q-item exact to="/home/blank">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="空白页" sublabel="blank" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <!-- Main -->
    <q-page-container>
      <router-view/>
    </q-page-container>

    <!-- Footer -->
    <q-layout-footer>
      <q-tabs>
        <q-route-tab slot="title" icon="home" to="/home/dashboard" replace label="主页" />
        <q-route-tab slot="title" icon="list" to="/home/news" replace label="资讯">
          <q-chip floating color="red" v-if="newsBadgeIncrement > 0">{{newsBadgeIncrement}}</q-chip>
        </q-route-tab>
        <q-route-tab slot="title" icon="account box" to="/home/user" replace label="账号" />
      </q-tabs>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import {
  mapState,
  mapMutations,
} from 'vuex';

export default {
  computed: {
    ...mapState({
      mobile: state => state.user.mobile || '159xxxx8250',
      newsBadgeIncrement: state => state.badge.news.increment,
    }),
  },
  data() {
    return {
      leftDrawerOpen: false,
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
  },
};
</script>

<style scoped lang="stylus"></style>
