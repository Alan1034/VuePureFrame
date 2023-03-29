<template>
  <aside-menu v-model:activeIndex="activeIndex" />
  <header-menu v-model:activeIndex="activeIndex" />
  <slot />
</template>

<script>
import HeaderMenu from "./HeaderMenu.vue";
import AsideMenu from "./AsideMenu.vue";

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
</style>