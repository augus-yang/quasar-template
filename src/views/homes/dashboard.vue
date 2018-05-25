<template>
  <q-pull-to-refresh pull-message="下拉刷新" release-message="釋放刷新"
                     refresh-message="刷新中..." :handler="refresher">
    <q-page padding>
      <div class="row">
        <div class="col-6 flex flex-center">
          <div class="custom-advice">
            <img src="statics/advices/aia.png" class="responsive">
            <p class="text-center">友邦</p>
            <q-chip floating color="red">1</q-chip>
          </div>
        </div>
        <div class="col-6 flex flex-center">
          <div class="custom-advice">
            <img src="statics/advices/prudential.png" class="responsive">
            <p class="text-center">保诚</p>
            <q-chip floating color="red">2</q-chip>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6 flex flex-center">
          <div class="custom-advice">
            <img src="statics/advices/axa.png" class="responsive">
            <p class="text-center">安盛</p>
          </div>
        </div>
      </div>
    </q-page>
  </q-pull-to-refresh>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  created() {
    this.$http.use({
      url: this.$constant.api.NEWS_COUNT,
      success: (data) => {
        this.setNews({
          length: data.newsCount,
          increment: data.newsCount - this.$store.state.badge.news.length,
        });
      },
    });
  },
  methods: {
    ...mapMutations('badge', [
      'setNews',
    ]),
    refresher(done) {
      setTimeout(() => {
        done();
      }, 1000);
    },
  },
};
</script>

<style lang="stylus">
  .custom-advice
    padding-top 30px
    position relative
</style>
