<template>
  <q-page padding>
    <q-table :data="data" :columns="columns" row-key="name" :filter="filter">
      <template slot="top-left" slot-scope="props">
        <q-search hide-underline v-model="filter" />
      </template>
      <q-td slot='body-cell-action' slot-scope="props" :props="props">
        <q-btn color="primary" @click='handleEdit(props.row)'>编辑</q-btn>
        <q-btn color="negative" @click='handleDelete(props.row)'>删除</q-btn>
      </q-td>
    </q-table>
  </q-page>
</template>

<script>
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      data: [],
      columns: [
        {
          label: '名称',
          field: row => row.name,
          name: 'name',
          align: 'left',
        },
        {
          label: '回调地址',
          field: 'notifyUrl',
          name: 'notifyUrl',
          align: 'left',
        },
        {
          label: 'ticket',
          field: 'ticket',
          name: 'ticket',
          align: 'left',
        },
        {
          label: '创建时间',
          field: 'createdAt',
          name: 'createdAt',
          align: 'left',
        },
        {
          label: '操作',
          field: 'action',
          name: 'action',
          align: 'left',
        },
      ],
      filter: '',
    };
  },
  methods: {
    getData() {
      // 模拟数据
      this.$data.data = [
        {
          id: 'f32162fec485464fb46be95ff6fdd52b',
          name: 'local',
          notifyUrl: 'http://localhost:3020/api/test',
          ticket: '87e6c799a40145b18cc204345e11222c',
          createdAt: '2017-12-26 22:31:59',
        },
      ];
    },
    handleEdit(row) {
      // eslint-disable-next-line
      console.log(row);
    },
    handleDelete(row) {
      this.$q.dialog({
        title: '提示',
        message: '确定要删除吗？',
        ok: '确定',
        cancel: '取消',
      }).then(() => {
        // eslint-disable-next-line
        console.log(row);
      }).catch(() => {});
    },
  },
};
</script>

<style lang="stylus"></style>
