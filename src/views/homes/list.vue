<template>
  <q-page padding>
    <q-list highlight separator>
      <q-list-header>列表</q-list-header>
      <q-collapsible icon="list" label="基本信息" opened>
        <q-item>
          <q-item-side>id</q-item-side>
          <q-item-main :label="item.id"/>
        </q-item>
        <q-item>
          <q-item-side>title</q-item-side>
          <q-item-main>
            <q-item-tile>{{ item.title }}</q-item-tile>
          </q-item-main>
        </q-item>
      </q-collapsible>
      <q-collapsible icon="list" label="其他信息">
        <q-item>
          <q-item-side>其他</q-item-side>
          <q-item-main :label="item.other"/>
        </q-item>
      </q-collapsible>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      item: {
        id: '11111',
        title: '22222',
        other: '33333',
      },
    };
  },
};
</script>

<style lang="stylus"></style>
