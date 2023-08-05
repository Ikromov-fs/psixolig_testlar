<template>
  <div class="bg-[#333] pb-20 pt-10">
    <div data-aos="fade-up">
      <div class="container mx-auto">
        <div class="flex justify-center gap-1 text-lg">
          <span class="text-[#fff]">02</span>
          <span class="text-[#fff]">|</span>
          <span class="text-[#fdf001]">Top testlar</span>
        </div>
        <div class="grid mmd:grid-cols-3 gap-10 relative">
          <div
            v-for="item in dataTests"
            :key="item?.id"
            class="flex items-center gap-3 px-10 h-full bg-[#fff] p-2 mt-10 box-w rounded-md cursor-pointer"
          >
            <i :class="item?.icon" class="text-[30px]"></i>
            <h1 class="text-[18px]">{{ item?.title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<i class=""></i>
<script setup lang="ts">
import { ref } from "vue";
const dataTests = ref([
  {
    icon: "fa-solid fa-restroom",
    title: "Ota-onalar uchun",
    id: 1,
  },
  {
    icon: "fa-solid fa-person-dress",
    title: "Ayollar uchun",
  },
  {
    icon: "fa-solid fa-medal",
    title: "Sportchilar uchun",
    id: 3,
  },
  {
    icon: "fa-solid fa-computer",
    title: "Dasturchilar uchun",
    id: 4,
  },
  {
    icon: "fa-solid fa-computer",
    title: "Dasturchilar uchun",
    id: 4,
  },
  {
    icon: "fa-solid fa-computer",
    title: "Dasturchilar uchun",
    id: 4,
  },
  {
    icon: "fa-solid fa-computer",
    title: "Dasturchilar uchun",
    id: 4,
  },
  {
    icon: "fa-solid fa-person-chalkboard",
    title: "Pedagogik qobilyatini aniqlash",
    id: 4,
  },
]);
</script>
<style scoped>
.box-w {
  transition: all 0.2s linear;
  box-shadow: 0px 0px 15px #333;
  transform: scale(0.98);
}
.box-w:hover {
  box-shadow: 0px 0px 20px #333;
  transition: all 0.2s linear;
  transform: scale(0.99);
}
</style>
