<template>
  <el-container>
    <el-aside width="200px">
      <aside-menu v-model:activeIndex="activeIndex" />
    </el-aside>
    <el-container>
      <el-header>
        <header-menu v-model:activeIndex="activeIndex" />
      </el-header>
      <el-main :style="{ height: mainHeight + 'px' }">
        <div>
          <slot />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderMenu from "./HeaderMenu";
import AsideMenu from "./AsideMenu";

export default {
  data() {
    return {
      activeIndex: "1",
      mainHeight: window.innerHeight - 61,
    };
  },
  name: "MainLayout",
  components: { HeaderMenu, AsideMenu },
};
</script>

<style>
.el-header,
.el-footer {
  padding: 0px !important;
}

.el-main {
  padding: 0px !important;
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>