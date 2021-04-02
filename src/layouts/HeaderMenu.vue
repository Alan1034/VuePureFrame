<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-menu-item index="2">消息中心</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: {
      activeIndex: String
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$emit('update:activeIndex',key)
    },
  },
};
</script>

<style>
</style>