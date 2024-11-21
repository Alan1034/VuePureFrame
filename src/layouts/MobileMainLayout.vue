<template>
  <div class="main-content" :style="{ height: mainHeight + 'px' }">
    <div class="main-slot" :style="{ height: mainHeight - 48 + 'px' }">
      <slot />
    </div>

  </div>
  <!-- flex-header -->
  <header-menu />
</template>

<script>
import HeaderMenu from "./HeaderMenu.vue";
export default {
  data() {
    return {
      activeIndex: "1",
      mainHeight: window.innerHeight,
    };
  },
  name: "MainLayout",
  components: { HeaderMenu },
};
</script>

<style lang="less" scoped>
.main-content {
  overflow-y: auto;

  .main-slot {
    margin-top: 48px;
  }
}
</style>