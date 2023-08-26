<template>
  <div class="bg-[#f6c899] pb-20 pt-10 rounded-tl-[50px] rounded-br-[50px]">
    <div data-aos="fade-up" class="relative">
      <img :src="style" alt="style" class="absolute top-[-50px  ]" />
      <img :src="style2" alt="style" class="absolute right-0 bottom-[-80px]" />
      <div class="container mx-auto">
        <div class="flex justify-center font-[500] gap-1 text-lg">
          <span class="text-[#fff]">02</span>
          <span class="text-[#fff]">|</span>
          <span class="text-[#000]">Top testlar</span>
        </div>
        <div class="grid mmd:grid-cols-3 sx:gap-4 mmd:gap-10 relative">
          <div
            v-for="item in dataTests"
            :key="item?.id"
            class="relative flex items-center text-left px-10 h-full bg-[#fafcf5] sx:py-0 mmd:p-2 mt-10 box-w rounded-bl-[18px] rounded-tr-[18px] rounded-[2px] cursor-pointer"
          >
            <i
              class="fa-solid fa-arrow-up-short-wide absolute text-[20px] top-3 right-3"
            ></i>
            <h1 class="sx:text-[15px] mmd:text-[18px]">{{ item?.title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import style from "@/assets/image/style_psix.png";
import style2 from "@/assets/image/style2.png";
const dataTests = ref([
  {
    title: "Ota-onalar uchun",
    id: 1,
  },
  {
    title: "Ayollar uchun",
  },
  {
    title: "Sportchilar uchun",
    id: 3,
  },
  {
    title: "Dasturchilar uchun",
    id: 4,
  },
  {
    title: "Dasturchilar uchun",
    id: 4,
  },
  {
    title: "Dasturchilar uchun",
    id: 4,
  },
  {
    title: "Dasturchilar uchun",
    id: 4,
  },
  {
    title: "Pedagogik qobilyatini aniqlash",
    id: 4,
  },
]);
</script>
<style scoped>
.box-w {
  transition: all 0.2s linear;
  box-shadow: 0px 0px 15px #363636;
  transform: scale(0.98);
}
.box-w:hover {
  box-shadow: 0px 0px 20px #fff;
  transition: all 0.2s linear;
  transform: scale(0.99);
  background: #fff;
}
</style>
