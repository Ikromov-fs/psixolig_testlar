<template>
  <Header />
  <div class="container mx-auto">
    <!-- <div class="flex gap-4">
      <router-link to="/" class="cursor-pointer">Home</router-link>
      <router-link to="/about" class="cursor-pointer">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>
<script setup>
import Header from "@/components/header/Header.vue";
</script>
