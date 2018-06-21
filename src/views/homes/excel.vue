<template>
  <q-page class="flex flex-center">
    <q-btn color="primary" @click="exportExcel">导出</q-btn>
  </q-page>
</template>

<script>
import { date } from 'quasar';

export default {
  methods: {
    exportExcel() {
      const time = date.formatDate(Date.now(), 'YYYY_MM_DD_HH_mm_ss');

      const data = ['SheetJS'.split(''), '1234567'.split('')];
      const ws = this.$excel.utils.aoa_to_sheet(data);
      const wb = this.$excel.utils.book_new();
      this.$excel.utils.book_append_sheet(wb, ws, 'SheetJS');
      this.$excel.writeFile(wb, `sheetjs_${time}.xlsx`);
    },
  },
};
</script>

<style scoped lang="stylus"></style>
