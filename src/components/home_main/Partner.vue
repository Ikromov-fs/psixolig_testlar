<template>
  <div class="bg-[#02897A]">
    <div data-aos="zoom-in-up">
      <div class="container mx-auto py-10">
        <div class="flex justify-center gap-1 text-lg ">
          <span class="text-[#fff]">04</span>
          <span class="text-[#fff]">|</span>
          <span class="text-[#fdf001]">Hamkorlar</span>
        </div>
        <div
          class="grid sx:grid-cols-1 ss:grid-cols-2 lg:!grid-cols-3 xxl:!grid-cols-4 gap-5 relative"
        >
          <div
            v-for="item in dataTests"
            :key="item?.id"
            class="flex flex-col items-center px-3 py-10 bg-[#00000014] mt-10 box-w rounded-md cursor-pointer"
          >
            <img :src="item?.image" alt="image" class="w-[50px]" />
            <h1 class="text-[20px] text-white">
              {{ item?.title }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import logo from "../../assets/svg/logo-white.svg";

const dataTests = ref([
  {
    image: logo,
    title: "algartim academy",
    id: 1,
  },
  {
    image: logo,
    title: "algartim academy",
    id: 2,
  },
  {
    image: logo,
    title: "algartim academy",
    id: 3,
  },
  {
    image: logo,
    title: "algartim academy",
    id: 4,
  },
  {
    image: logo,
    title: "algartim academy",
    id: 5,
  },
  {
    image: logo,
    title: "algartim academy",
    id: 6,
  },
  {
    image: logo,
    title: "algartim academy",
    id: 7,
  },
  {
    image: logo,
    title: "algartim academy",
    id: 8,
  },
]);
</script>
<style scoped>
.box-w {
  transition: all 0.2s linear;
  box-shadow: 0px 0px 5px #fff;
  transform: scale(0.98);
}
.box-w:hover {
  box-shadow: 0px 0px 20px #fff;
  transition: all 0.2s linear;
  transform: scale(0.99);
}
</style>
