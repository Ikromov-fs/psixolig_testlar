<script setup lang="ts">
import { ref } from "vue";
import "@splidejs/vue-splide/css";
import { onMounted, computed } from "vue";
import profile from "@/assets/svg/profil.svg";
import axios from "@/plugins/axios.js";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Lazy, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/lazy";
import "swiper/css/pagination";

async function getStudents() {
  try {
    const datas = await axios.get(`/active-students/get-all-active`);
    data.value = datas.data;
  } catch (error) {
    console.log(error);
  }
}

const thumbsResponsiveBreakpoints = computed((): ResponsiveOptions => {
  return {
    320: { slidesPerView: 1, spaceBetween: 1 },
    768: { slidesPerView: 2, spaceBetween: 2 },
    1080: { slidesPerView: 3, spaceBetween: 3 },
    1300: { slidesPerView: 5, spaceBetween: 5 },
    1600: { slidesPerView: 5, spaceBetween: 5, slidesOffsetBefore: 12 },
  };
});
onMounted(() => {
  getStudents();
});
const data = ref();
</script>
<template>
  <div class="py-10 bg-[#ffff]">
    <div class="flex justify-center gap-1 text-lg sx:mb-5">
      <span class="text-[#333]">03</span>
      <span class="text-[#333]">|</span>
      <span>Yutuqlar</span>
    </div>
    <h1 class="flex justify-center sx:mb-4 mmd:mb-10 font-[600] text-[20px]">
      Bizning aktiv o'quvchilarimiz !
    </h1>
    <div>
      <Swiper
        :navigation="true"
        :lazy="true"
        :loop="true"
        :autoplay="true"
        :breakpoints="thumbsResponsiveBreakpoints"
        :loopFillGroupWithBlank="true"
        :pagination="{ clickable: true, dynamicBullets: true }"
        :modules="[Navigation, Lazy, Autoplay, Pagination]"
        class="swiperCardComp"
      >
        <SwiperSlide
          v-for="item in data"
          :breakpoints="thumbsResponsiveBreakpoints"
          :key="item.id"
          class="bg-[#fff] md:mx-3 rounded-[8px] hover:bg-[#f9b234] cursor-pointer time overflow-hidden relative"
        >
          <div class="ag-courses-item_bg"></div>
          <div class="flex p-5">
            <img
              :src="item?.image?.url ? item?.image?.url : profile"
              alt="image"
              class="w-[100px] h-[100px] rounded-[50%] object-cover flex-shrink-0"
            />
            <div class="flex flex-col justify-between mx-3">
              <h2
                class="flex justify-center mt-3 sm:pt-5 sx:text-[15px] mmd:text-[18px] font-[600]"
              >
                {{ item?.fullName }}
              </h2>
              <div>
                <span>ball: </span>
                {{ item?.score }}
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
<style scoped>
.ag-courses-item_bg {
  height: 128px;
  width: 128px;
  background-color: #f9b234;
  z-index: 1;
  position: absolute;
  top: -75px;
  right: -75px;
  overflow: hidden;
  border-radius: 50%;
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.time {
  transition: all 0.3s linear;
}
.time:hover .ag-courses-item_bg {
  z-index: 1;
  -webkit-transition: all 0.8s ease;
  transition-timing-function: ease-in-out;

  -o-transition: all 0.8s ease;
  transition: all 0.8s ease;
}
</style>
