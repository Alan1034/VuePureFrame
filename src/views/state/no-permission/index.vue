<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-10 18:18:43
 * @LastEditTime: 2023-12-13 11:55:04
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 登陆超时页面
 * @FilePath: \deal-front-end\src\views\state\login-overtime\index.vue
 * 
-->
<template>
  <div class="content">
    <img :src="img" alt="login-overtime" class="state-img" />
    <div class="tips-box">
      <div class="title">无权限</div>
      <div class="font">抱歉，您无法访问此页面</div>
      <el-button type="primary" size="large" @click="() => push({ path: '/home' })"
        >返回首页</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import img from '@/assets/img/permission.png'
import { useRouter } from 'vue-router'
const push = inject('push') as Function
const router = useRouter()
</script>


<style lang="less" scoped>
@import url('../style.less');
</style>