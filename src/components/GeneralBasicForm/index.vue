/** 通用表格组件 使用方法：
现已封装成独立组件，详见https://www.npmjs.com/package/general-basic-table
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
}, { key: 4, prop: "name", label: "款式名称" },{ key: 99, label: "操作", render:
(scope) => { const { name = "按钮" } = scope.row; return
<ElButton>{name}</ElButton>
; }, }, ] */
<template>
  <el-table v-loading="loading" :data="tableList" :size="size">
    <el-table-column
      v-for="column in tableColumn"
      :key="column.key"
      v-bind="column"
    >
      <template #default="scope" v-if="column.render">
        <!-- 第一种方法，定义一个标签和一个组件 -->
        <component
          :is="currentTabComponent(column, scope)"
          :column="column"
          :scope="scope"
        >
        </component>
        <!-- 第二种方法，传入一个组件 -->
        <TableColumn :column="column" :scope="scope" />
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
  <pagination
    v-show="total > 0"
    :total="total"
    :current-page="pageNum"
    :page-size="pageSize"
    @pagination="handleSearch"
  />
</template>

<script>
import TableColumn from "./tableColumn";
export default {
  name: "GeneralBasicTable",
  components: {
    TableColumn,
    TabArchive: (props) => {
      const { column, scope } = props;
      return column.render(scope);
    },
  },
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
    handleSearch(params = {}) {
      console.log(params);
      const { page = this.pageNum, limit = this.pageSize } = params;
      // this.loading = true;
      console.log(this.$router);
      this.$router.push({ query: { page, limit } });
      this.getList(params);
    },
    currentTabComponent(column, scope) {
      return "tab-archive";
    },
  },
};
</script>

<style></style>
