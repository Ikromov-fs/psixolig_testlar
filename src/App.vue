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
import {onMounted, watch} from "vue";

import {useAuth} from "@/store/auth.js";

const authStore =  useAuth()


function checkToken(){
    const token = localStorage.getItem('refreshToken')
    if(token){
        console.log("run 1")
        authStore.refreshToken()
    }
    setInterval(()=>{
        if(token){
            console.log("run 2")
           authStore.refreshToken()
        }
    },28*60*1000)
}


watch(() => authStore.isToken,
    (newVal) => {
        console.log("watch ")
        checkToken()
    }
)


onMounted(()=>{
    checkToken()
})
</script>
