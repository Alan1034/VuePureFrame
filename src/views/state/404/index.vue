<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-10 18:18:24
 * @LastEditTime: 2023-12-13 11:54:24
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 404页面
 * @FilePath: \deal-front-end\src\views\state\404\index.vue
 * 
-->
<template>
  <div class="content">
    <img :src="img" alt="404" class="state-img" />
    <div class="tips-box">
      <div class="title">未找到相关页面</div>
      <div class="font">抱歉，您访问的页面不存在</div>
      <el-button type="primary" size="large" @click="() => push({ path: '/home' })"
        >返回首页</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import img from '@/assets/img/404.png'
import { useRouter } from 'vue-router'
const push = inject('push') as Function
</script>


<style lang="less" scoped>
@import url('../style.less');
</style>