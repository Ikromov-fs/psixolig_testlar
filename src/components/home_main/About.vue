<template>
  <div class="container mx-auto pb-10">
    <div class="flex justify-center gap-1 text-lg my-10">
      <span class="text-[#333]">05</span>
      <span class="text-[#333]">|</span>
      <span>Biz haqimizda</span>
    </div>
    <div>
      <p
        class="flex sx:text-xl justify-center mmd:text-[35px] font-[600]"
      >
        Biz emas - natijalarimiz gapirsin !
      </p>
    </div>
    <div
      class="grid mmd:grid-cols-3 text-center sx:text-4xl mmd:text-[45px] font-[600] sx:my-5 mmd:my-20"
    >
      <div data-aos="zoom-in-down" class="sx:my-5">
        <span></span>
        <AutoCount :endAmount="endAmount" :suffix="'+'" />
        <p class="text-[17px]">Testlarimiz soni</p>
      </div>
      <div data-aos="zoom-in-down" class="sx:my-5">
        <AutoCount :endAmount="endAmount1" :suffix="'+'" />
        <p class="text-[17px]">O'quvchilarimiz soni</p>
      </div>
      <div data-aos="zoom-in-down" class="sx:my-5">
        <AutoCount :endAmount="endAmount2" :suffix="'+'" />
        <p class="text-[17px]">Saytdan foydalanadiganlar soni</p>
      </div>
    </div>
    <p class="sx:px-0 mmd:px-10 text-[16px] sx:mt-5 mmd:mt-20">
      <span class="text-[20px] font-[600]"
        >XATB "Orient Finans" Amaliyot Boshqarmasi (OPERU) -
      </span>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
      facilis modi architecto fugit illo atque esse illum repudiandae
      consectetur! Ut! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Quibusdam facilis modi architecto fugit illo atque esse illum repudiandae
      consectetur! Ut! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Quibusdam facilis modi architecto fugit illo atque esse illum repudiandae
      consectetur! Ut!
    </p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const endAmount = ref(1200);
const endAmount1 = ref(120);
const endAmount2 = ref(510);
import AutoCount from "../form/AutoCount.vue";
</script>
