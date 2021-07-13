/** 通用基本表单。用在表单页面搜索栏 */
<template>
  <el-form
    :model="queryParams"
    ref="queryFormRef"
    v-show="showSearch"
    inline
    label-position="left"
    :label-width="labelWidth"
  >
    <el-form-item
      v-for="item in formItem"
      :label="item.label"
      :prop="item.prop"
      :key="item.prop"
    >
      <el-input
        v-if="item.type === 'input'"
        @keydown.enter="getList"
        v-model="queryParams[item.prop]"
        :size="size"
        v-bind="inputSetting"
      ></el-input>
      <el-select
        v-else-if="item.type === 'select'"
        v-model="queryParams[item.prop]"
        :size="size"
        v-bind="selectSetting"
      >
        <el-option
          v-for="dict in item.option || []"
          :key="dict.value"
          :label="dict.desc"
          :value="dict.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        :size="size"
        @click="handleQuery"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh" :size="size" @click="resetQuery"
        >重置</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "GeneralBasicForm",
  props: {
    showSearch: {
      type: Boolean,
      default: true,
    },
    getList: {
      type: Function,
      default: () => {},
    },
    formItem: {
      type: Array,
      default: [],
    },
    size: {
      // 控制按钮大小
      type: String,
      default: "medium",
    },
  },
  data() {
    return {
      queryParams: {},
      selectSetting: {
        placeholder: "请选择",
        clearable: true,
        style: "width: 200px",
      },
      inputSetting: {
        placeholder: "请输入",
        style: "width: 200px",
        clearable: true,
      },
      labelWidth: "90px",
    };
  },
  // setup(props) {
  //设置默认值
  //   console.log(props);
  //   // const { formItem } = toRefs(props);
  //   const { formItem } = props;
  //   console.log(formItem);
  //   const queryParams = {};
  //   formItem.forEach((item) => {
  //     queryParams[item.prop] = "";
  //   });
  //   return {
  //     queryParams,
  //   };
  // },
  methods: {
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList(1);
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$refs.queryFormRef.resetFields();
      this.handleQuery();
    },
  },
};
</script>

<style lang="scss" scoped>
:deep {
  .el-form-item {
    margin-bottom: 3px;
  }
}
</style>
