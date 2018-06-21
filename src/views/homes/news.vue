<template>
  <q-page padding>
    <q-list separator v-if="list.length != 0">
      <q-item v-for="item in list" :key="item.index" @click.native="showDetail(item)">
        <q-item-side icon="folder" inverted color="primary" />
        <q-item-main>
          <q-item-tile label>{{item.title}}</q-item-tile>
          <q-item-tile sublabel>{{item.description}}</q-item-tile>
        </q-item-main>
        <q-item-side right icon="info" />
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  created() {
    this.ajax();
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    ...mapMutations('badge', [
      'setNews',
    ]),
    ajax() {
      this.$api.news.findAll((data) => {
        this.list = data;

        this.setNews({
          length: data.length,
          increment: 0,
        });
      });
    },
    showDetail(item) {
      if (this.$q.platform.is.cordova) {
        this.$cordova.browser(item.url, {
          title: item.title,
          description: item.description,
          shareSuccess: () => {
            // 分享成功获取对应积分
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="stylus"></style>
