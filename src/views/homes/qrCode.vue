<template>
  <q-page padding>
    <qriously :value="qrCode" />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      qrCode: 'Hello World',
    };
  },
};
</script>

<style scoped lang="stylus"></style>
