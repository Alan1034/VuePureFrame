<template>
  <transition name="el-zoom-in-center">
    <el-menu
      v-if="activeIndex === '1'"
      default-active="/home"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <template #title> 导航1 </template>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-document"></i>
        <template #title> 导航2 </template>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <template #title>导航3</template>
      </el-menu-item>
    </el-menu>
  </transition>
  <el-empty v-if="activeIndex !== '1'" description=""></el-empty>
</template>

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