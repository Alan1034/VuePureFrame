<template>
  <div
    class="fashions-library-container"
    :style="{ height: screenHeight + 'px' }"
  >
    <!-- 查询 -->
    <GeneralBasicForm
      :showSearch="showSearch"
      :getList="getList"
      :formItem="formItem"
      :size="size"
    />
    <div :style="{ height: 15 + 'px' }" />
    <!-- 页面和表格操作 -->
    <el-row :gutter="10" class="handle">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :size="size"
          @click="handleAdd"
          >新增</el-button
        >
        <el-button
          type="info"
          icon="el-icon-download"
          :size="size"
          @click="exportOrderExcel"
          >批量删除</el-button
        >
        <el-button
          type="warning"
          icon="el-icon-download"
          :size="size"
          @click="exportGoodsExcel"
          >导入</el-button
        >
        <el-button
          type="warning"
          icon="el-icon-download"
          :size="size"
          @click="exportGoodsExcel"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <!-- 表格 -->
    <GeneralBasicTable
      :getList="getList"
      :tableList="tableList"
      :total="total"
      :tableColumn="tableColumn"
      :size="size"
    >
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </GeneralBasicTable>
  </div>
</template>

<script>
import GeneralBasicForm from "@/components/GeneralBasicForm/index.vue";
import GeneralBasicTable from "@/components/GeneralBasicTable/index.vue";
export default {
  name: "fashionslibrary",
  components: { GeneralBasicForm, GeneralBasicTable },
  data() {
    return {
      showSearch: true, // 显示搜索条件
      loading: false,
      size: "small",
      screenHeight: window.innerHeight - 84,
      formItem: [
        { label: "款式名称", prop: "bsName", type: "select", option: [] },
        { label: "款式来源", prop: "bsSource", type: "input" },
        { label: "版型编码", prop: "silSn", type: "input" },
        { label: "外部款式", prop: "relatedStyle", type: "input" },
        { label: "面种/材质", prop: "fabricType", type: "input" },
        { label: "二次工艺", prop: "secordary", type: "select", option: [] },
        { label: "设计师", prop: "designer", type: "input" },
        { label: "创建人", prop: "createBy", type: "input" },
        { label: "品类", prop: "categoryCode", type: "input" },
      ],
      tableColumn: [
        { key: 1, type: "selection", width: "55" },
        { key: 2, prop: "name", label: "款式序号" },
        { key: 3, prop: "name", label: "款式图片" },
        {
          key: 99,
          label: "操作",
          template: (scope) => {
            return `${scope.row.name}`;
          },
        },
      ],
      tableList: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ], //表格内容
      total: 7, //表格总条数
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      console.log("ajax go");
    },
  },
};
</script>

<style lang="scss" scoped>
.fashions-library-container {
  overflow: auto;
  padding: 20px;
  .handle {
    display: flex;
    justify-content: space-between;
  }
}
</style>
