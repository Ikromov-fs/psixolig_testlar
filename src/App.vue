<template>
  <div class="bg-[#fafcf5]">
    <Header class="fixed z-50 w-[100%]" />
    <router-view />
    <Footer />
  </div>
</template>
<script setup lang="ts">
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
</script>
