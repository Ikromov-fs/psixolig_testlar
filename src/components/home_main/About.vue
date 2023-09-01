<template>
  <div class="container mx-auto">
    <div class="flex justify-center gap-1 text-lg sx:my-5 mmd:my-10">
      <span class="text-[#333]">05</span>
      <span class="text-[#333]">|</span>
      <span>Biz haqimizda</span>
    </div>
    <p
      class="flex sx:text-[19px] text-center justify-center mmd:text-[35px] font-[600]"
    >
      <!-- Biz emas - natijalarimiz gapirsin ! -->
      {{ data?.slogan }}
    </p>
    <div class="flex flex-col items-center relative">
      <img :src="style" alt="style" class="absolute right-1 bottom-0 hidden" />
      <img
        :src="data?.image?.url"
        alt="image muallif"
        class="w-[155px] rounded-[50%] sx:mt-5 mmd:mt-10"
      />
      <p class="my-2">Rozaliya Gabdulhakova</p>
      <ul
        class="border-solid border-[2px] rounded-md bg-[#fff] sx:px-2 mmd:px-10 py-5"
      >
        <li
          v-for="(item, index) in data?.achievements"
          :key="index"
          class="my-2 sx:text-[14px] mmd:text-[16px]"
        >
          <input type="radio" checked="true" class="mr-2" />
          {{ item }}
        </li>
      </ul>
    </div>
    <div
      class="grid mmd:grid-cols-3 text-center sx:text-4xl mmd:text-[45px] font-[600] sx:my-5 mmd:mt-20"
    >
      <div data-aos="zoom-in-down" class="sx:my-5">
        <AutoCount :endAmount="statusData?.testsCount" :suffix="'+'" />
        <p class="text-[17px]">Testlarimiz soni</p>
      </div>
      <div data-aos="zoom-in-down" class="sx:my-5">
        <AutoCount :endAmount="statusData?.studentsCount" :suffix="'+'" />
        <p class="text-[17px]">O'quvchilarimiz soni</p>
      </div>
      <div data-aos="zoom-in-down" class="sx:my-5">
        <AutoCount :endAmount="statusData?.usersCount" :suffix="'+'" />
        <p class="text-[17px]">Saytdan foydalanadiganlar soni</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "@/plugins/axios.js";
import { ref, onMounted } from "vue";

import style from "@/assets/image/style4.png";
import AutoCount from "../form/AutoCount.vue";
const data = ref();
const statusData = ref();
async function getAbout() {
  try {
    const dataPart = await axios.get(`/about-me/get`);
    data.value = dataPart.data;
  } catch (error) {
    console.log(error);
  }
}

async function getStatus() {
  try {
    const status = await axios.get(`statistics/get`);
    statusData.value = status.data;
  } catch (error) {
    console.log(error);
  }
}
// const data = [
//   {
//     id: 1,
//     text: "Kurs ustozi va muallif !",
//   },
//   {
//     id: 2,
//     text: "Musulmonlarga mos, ilmiy asoslangan psixolog !",
//   },
//   {
//     id: 3,
//     text: "Ta’lim berish va bolalar psixologiyasi bilan shug’ullanish bo’yicha ko’p yillik tajribaga ega psixolog !",
//   },
//   {
//     id: 4,
//     text: "«Povoljkiy» institutda psixolog konsultantlik, ADTPI da ingliz tili pedagogikasi darajasini olgan !",
//   },
//   {
//     id: 5,
//     text: "«IKI academy»da islomiy psixologiya kursini tamomlagan, hozirda «IKI academy»da magistraturada taxsil oladi !",
//   },
//   {
//     id: 6,
//     text: " O’zbek, Rus, Ingliz tilida online va yuzma yuz konsultatsiyachi !",
//   },
// ];
onMounted(() => {
  getAbout();
  getStatus();
});
</script>
