<template>
   <aside-menu v-model:activeIndex="activeIndex" />
   <header-menu v-model:activeIndex="activeIndex" />
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

</style>