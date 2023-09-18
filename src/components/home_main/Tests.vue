<template>
  <div
    class="bg-[#f6c899] pb-20 pt-8 rounded-xl sm:rounded-none sm:rounded-tl-[50px] sm:rounded-br-[50px] mx-2"
  >
    <div data-aos="fade-up" class="relative">
      <img :src="style" alt="style" class="absolute top-[-50px ] sx:hidden mmd:block" />
      <img :src="style2" alt="style" class="absolute right-0 bottom-[-80px] sx:hidden mmd:block h-[200px]" />
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
            class="relative flex items-center text-left px-10 h-full bg-[#fafcf5] sx:py-0 mmd:p-2 mt-5 box-w rounded-bl-[18px] rounded-tr-[18px] rounded-[2px] cursor-pointer"
          >
             <i
              class="fa-solid fa-arrow-up-short-wide absolute text-[20px] top-3 right-3"
            ></i>
            <h1 class="sx:text-[15px] mmd:text-[17px] mr-8">{{ item?.title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import style from "@/assets/image/style_psix.png";
import style2 from "@/assets/image/style2.png";
import axios from "@/plugins/axios.js";
const dataTests = ref();
async function topTests() {
  try {
    const tests = await axios.get(`/test/get/bestsellers`);
    dataTests.value = tests.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  topTests();
});
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
