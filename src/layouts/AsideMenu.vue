<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-02-13 17:02:16
 * @LastEditTime: 2023-02-14 11:33:41
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \VuePureFrame\src\layouts\AsideMenu.vue
 * 
-->
<template>
  <router-link to="/home">HOME</router-link>
  <br />
  <router-link to="/colorlibrary">colorlibrary</router-link>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  props: {
    // 如果使用 TypeScript，请添加 @ts-ignore
    ...RouterLink.props,
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