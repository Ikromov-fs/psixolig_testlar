<template>
  <div class="bg-[#363636] py-5 mmd:pb-10">
    <div
      class="container grid sx:grid-cols-1 ss:grid-cols-2 mmd:grid-cols-4 sx:text-center gap-5 mmd:text-left text-white font-[600]"
    >
      <ul>
        <li>
          <img :src="logo" alt="iconka sayt" class="sx:mx-auto mmd:m-0 max-w-[100px]" />
        </li>
      </ul>
      <ul class="flex flex-col gap-1">
        <li class="text-[19px]">Bizni kuzating !</li>
        <li class="cursor-pointer hover:text-[#fdf001]">
          <i class="fa-brands fa-telegram mr-2"></i>
          <a target="_blank" href="https://t.me/psixolog_rozaliya">Telegram</a>
        </li>
        <li class="cursor-pointer hover:text-[#fdf001]">
          <i class="fa-brands fa-instagram mr-2"></i>
          <a target="_blank" href="https://www.instagram.com/psixolog_rozaliya/">Instagiram</a>
        </li>
        <li class="cursor-pointer hover:text-[#fdf001]">
          <i class="fa-brands fa-youtube mr-2"></i>
          <a target="_blank" href="https://www.youtube.com/@PsixologRozaliyaGabdulhakova"
            >Youtube</a
          >
        </li>
      </ul>
      <ul class="flex flex-col gap-1">
        <li class="text-[19px]">Top testlar</li>
          <li class="hover:text-[#fdf001] cursor-pointer"><router-link to="/tests">Bolalar uchun</router-link> </li>
        <li class="hover:text-[#fdf001] cursor-pointer"><router-link to="/tests">Ayyollar uchun</router-link> </li>
        <li class="hover:text-[#fdf001] cursor-pointer"><router-link to="/tests">O'smirlar uchun</router-link> </li>
      </ul>
      <ul class="flex flex-col gap-1">
        <li class="text-[19px]">Bog'lanish</li>
        <li class="hover:text-[#fdf001] cursor-pointer">
          <i class="fa-solid fa-phone mr-2 text-[18px]"></i> <a href="tel:903334141">(90) 333-41-41</a>
        </li>
        <li class="hover:text-[#fdf001] cursor-pointer">
          <i class="fa-solid fa-headset mr-2 text-[18px]"></i>
          <a target="_blank" href="https://t.me/psixolog_rozaliya_admin">
            psixolog_rozaliya admini</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import logo from "@/assets/image/psix-logo.png";
</script>
<style scoped>
.ok {
  color: rgb(14, 14, 14);
}
</style>
