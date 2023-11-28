<template>
  <main-layout> HELLO MY FRIEND </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import { createApiAction } from "@/api";
export default {
  components: {
    MainLayout,
  },
  mounted(){
    const post = createApiAction().post;
  }
};
</script>

<style></style>
