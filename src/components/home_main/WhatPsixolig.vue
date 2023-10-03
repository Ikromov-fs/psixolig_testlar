<template>
  <div class="bg-[#fff5ee] mmd:rounded-bl-[60px] mmd:rounded-tr-[60px]">
    <div data-aos="zoom-in-up" class="container py-10">
      <div class="flex justify-center font-[500] gap-1 text-lg">
        <span class="text-[#d56603]">06</span>
        <span class="text-[#d56603]">|</span>
        <span class="text-black">{{ partData?.title }}</span>
      </div>
      <div class="text-black font-[500]">
        <div class="sx:text-[15px] mmd:text-[19px] mt-7">
          <p>
          {{ partData?.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "@/plugins/axios.js";
import { onMounted, ref } from "vue";
const partData = ref();

async function getData() {
  try {
    const data = await axios.get(`/article/get`);
    partData.value = data.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getData();
});
</script>
