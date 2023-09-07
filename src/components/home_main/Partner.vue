<template>
  <div class="bg-[#085344]">
    <div data-aos="zoom-in-up">
      <!-- <img
        :src="style2"
        alt="style"
        class="absolute left-20 top-1 sx:hidden mmd:block"
      />
      <img
        :src="style6"
        alt="style"
        class="absolute right-20 bottom-0 sx:hidden mmd:block"
      /> -->
      <div class="container mx-auto py-10">
        <div class="flex justify-center gap-1 text-lg">
          <span class="text-[#fff]">04</span>
          <span class="text-[#fff]">|</span>
          <span class="text-[#fdf001]">Hamkorlar</span>
        </div>
        <div
          class="grid sx:grid-cols-1 ss:grid-cols-2 lg:!grid-cols-3 xxl:!grid-cols-4 sx:gap-0 mmd:gap-5 relative"
        >
          <div
            v-for="item in dataTests"
            :key="item?.id"
            class="py-2 bg-[#fff] sx:mt-5 mmd:mt-8 box-w rounded-md cursor-pointer"
          >
            <a :href="item?.link" class="flex flex-col items-center justify-center text-center">
              <img
                :src="item?.image?.url"
                alt="image"
                class="w-[130px] h-[100px] object-contain"
              />
              <h1 class="text-[20px] text-black font-medium">
                {{ item?.name }}
              </h1>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
// import logo from "../../assets/svg/logo-white.svg";
// import style2 from "@/assets/image/style5.png";
// import style6 from "@/assets/image/style6.png";
import axios from "@/plugins/axios.js";
import { useRouter } from "vue-router";
const router = useRouter();
const dataTests = ref();
async function partner() {
  try {
    const getPartner = await axios.get(`/partners/get-all`);
    dataTests.value = getPartner.data;
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  partner();
});
</script>
<style scoped>
.box-w {
  transition: all 0.2s linear;
  box-shadow: 0px 0px 5px #333;
  transform: scale(0.98);
}
.box-w:hover {
  box-shadow: 0px 0px 20px #fff;
  transition: all 0.2s linear;
  transform: scale(0.99);
}
</style>
