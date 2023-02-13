<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-02-13 17:02:16
 * @LastEditTime: 2023-02-13 17:20:05
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \VuePureFrame\src\layouts\AsideMenu.vue
 * 
-->
<template>导航1</template>

<script>
export default {
  props: {
    activeIndex: String,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  // mounted(){
  //      console.log(this.activeIndex)
  // },
  // updated(){
  //     console.log(this.activeIndex)
  // }
};
</script>

<style>
</style>