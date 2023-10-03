<template>
  <div
    class="bg-[#fff5ee] pb-20 pt-8 rounded-xl sm:rounded-none sm:rounded-tl-[20px] sm:rounded-br-[20px]"
  >
    <div data-aos="fade-up" class="relative">
      <img
        :src="style"
        alt="style"
        class="absolute top-[-50px ] sx:hidden mmd:block"
      />
      <img
        :src="style2"
        alt="style"
        class="absolute right-0 bottom-[-80px] sx:hidden mmd:block h-[200px]"
      />
      <div class="container mx-auto">
        <div class="flex justify-center font-[500] gap-1 text-lg">
          <span class="text-[#d56603]">02</span>
          <span class="text-[#d56603]">|</span>
          <span class="text-[#000]">Top testlar</span>
        </div>
        <div class="grid mmd:grid-cols-3 sx:gap-4 mmd:gap-10 relative">
          <router-link
            v-for="item in dataTests"
            :key="item?.id"
            :to="`tests/${item?.categoryId}`"
            class="relative flex items-center text-left min-h-[40px] max-h-[70px] h-full bg-[#fafcf5] sx:py-0 sx:px-2 mmd:p-2 mt-5 box-w rounded-bl-[10px] rounded-tr-[10px] rounded-[2px] cursor-pointer"
          >
            <i
              class="fa-solid fa-arrow-up-short-wide absolute text-[20px] top-3 right-3"
            ></i>
            <h1 class="sx:text-[15px] mmd:text-[17px] mr-8">
              {{ item?.title }}
            </h1>
          </router-link>
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
import { useAuth } from "@/store/auth.js";

const authStore = useAuth();
const dataTests = ref();
async function topTests() {
  try {
    const tests = await axios.get(`/test/get/bestsellers`);
    dataTests.value = tests.data;
  } catch (error) {
    console.log(error);
    if (error.response.status === 401 || error.response.status === 500) {
      authStore.refreshToken();
    }
  }
}

onMounted(() => {
  topTests();
});
</script>
<style scoped>
.box-w {
  transition: all 0.2s linear;
  box-shadow: 0px 0px 5px #250200;
  transform: scale(0.98);
}
.box-w:hover {
  box-shadow: 0px 0px 15px #fff;
  transition: all 0.2s linear;
  transform: scale(0.99);
  font-weight: 500;
  background: #fff;
}
</style>
