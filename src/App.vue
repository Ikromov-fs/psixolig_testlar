<template>
  <div class="flex flex-col justify-between min-h-[100vh] h-full overflow-hidden">
   <div>
       <Header class="relative z-50" />
       <router-view />
   </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import {onMounted} from "vue";

import {useAuth} from "@/store/auth.js";

const authStore =  useAuth()



onMounted(()=>{
    console.log('run')
    authStore.refreshToken()
    setTimeout(()=>{
        authStore.refreshToken()
    },28*60*1000)
})
</script>
