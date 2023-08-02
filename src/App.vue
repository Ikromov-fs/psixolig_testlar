<template>
  <p class="text-green-700">
    Blank template, write your code here.
    <a href="https://github.com/UIC-Group/vue3-powerbuild">GitHub repo</a>
  </p>
  <div class="flex gap-4">
  <router-link to="/" class="cursor-pointer">Home</router-link>
  <router-link to="/about" class="cursor-pointer">About</router-link>
  </div>
  <router-view />
</template>
