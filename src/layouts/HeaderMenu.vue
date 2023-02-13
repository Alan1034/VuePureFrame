<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-02-13 17:02:16
 * @LastEditTime: 2023-02-13 17:20:26
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \VuePureFrame\src\layouts\HeaderMenu.vue
 * 
-->
<template>处理中心</template>

<script>
export default {
  props: {
    activeIndex: String,
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$emit("update:activeIndex", key);
    },
  },
};
</script>

<style>
</style>