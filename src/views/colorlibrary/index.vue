<template>
  <main-layout> HELLO MY FRIEND </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import { api } from "@/api";
export default {
  components: {
    MainLayout,
  },
  mounted(){
    const post = api().post;
  }
};
</script>

<style></style>
