/** 通用表格组件 使用方法：
<GeneralBasicTable
  :getList="getList"
  :tableList="tableList"
  :total="total"
  :tableColumn="tableColumn"
  :size="size"
>
     ...一些传入插槽的内容
    </GeneralBasicTable>

数据格式样例： tableColumn: [ { key: 1, type: "selection", width: "55" }, { key:
2, prop: "name", label: "款式序号" }, { key: 3, prop: "name", label: "款式图片"
}, { key: 99, label: "操作", template: (scope) => { return `${scope.row.name}`;
}, }, ] */
<template>
  <el-table v-loading="loading" :data="tableList" :size="size">
    <el-table-column
      v-for="column in tableColumn"
      :key="column.key"
      v-bind="column"
    >
      <template #default="scope" v-if="column.template">
        {{ column.template(scope) }}
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
  <pagination
    v-show="total > 0"
    :total="total"
    :current-page="pageNum"
    :page-size="pageSize"
    @pagination="getList"
  />
</template>

<script>
export default {
  name: "GeneralBasicTable",
  data() {
    return {
      pageNum: Number(this.$route.query.page) || 1,
      pageSize: Number(this.$route.query.limit) || 10,
    };
  },
  props: {
    tableList: {
      type: Array,
      default: [],
    },
    tableColumn: {
      type: Array,
      default: [],
    },
    total: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default: "medium",
    },
  },
  methods: {
    /** 查询列表 */
    getList(params = {}) {
      console.log(params);
      // const { page = this.pageNum, limit = this.pageSize } = params;
      const { page = this.pageNum, limit = this.pageSize } = params;
      // this.loading = true;
      console.log(this.$router);
      this.$router.push({ query: { page, limit } });
      // listOrder(this.queryParams).then((response) => {
      //   this.orderList = response.data;
      //   this.total = Number(response.totalCount || 0);
      //   this.loading = false;
      // });
    },
  },
};
</script>

<style></style>
