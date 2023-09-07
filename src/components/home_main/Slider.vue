<template>
<<<<<<< HEAD
  <Swiper
    :navigation="true"
    :lazy="true"
    :loop="true"
    :autoplay="true"
    :slidesPerView="1"
    :loopFillGroupWithBlank="true"
    :pagination="{ clickable: true, dynamicBullets: true }"
    :modules="[Navigation, Lazy, Autoplay, Pagination]"
    class="swiperCardComp max-h-[34rem] container mx-auto"
  >
    <SwiperSlide
      v-for="item in slides"
      :key="item.id"
      class="rounded-md overflow-hidden cursor-pointer"
=======
    <pre>{{isLoading}}</pre>
    <BlockPreloader v-if="isLoading" class="container" :loading="isLoading" height="30rem" width="100%" border-radius="6px" dark/>
    <Swiper
            :navigation="true"
            :lazy="true"
            :loop="true"
            :autoplay="true"
            :slidesPerView="1"
            :loopFillGroupWithBlank="true"
            :pagination="{ clickable: true,dynamicBullets:true }"
            :modules="[Navigation, Lazy,Autoplay,Pagination]"
            class="swiperCardComp max-h-[34rem] container mx-auto"
>>>>>>> c958252347076eaca5ac6bd8a164cd82e7306dfc
    >
      <a :href="item?.link" target="_blank">
        <img
          :src="item?.image?.url"
          alt="image"
          class="w-[100%] sx:h-[250px] ss:h-[300px] mmd:h-[500px]"
        />
      </a>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Lazy, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/lazy";
import "swiper/css/pagination";

import { onMounted, ref } from "vue";
import axios from "@/plugins/axios.js";
import BlockPreloader from "@/components/blockPreloader/BlockPreloader.vue";

<<<<<<< HEAD
let slides = ref([]);
function getNews() {
  axios
    .get("news/get-all")
    .then((res) => {
      console.log(res.data);
      slides.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
=======
let slides = ref([])
const isLoading = ref(false)
function getNews() {
    axios.get("news/get-all").then((res)=>{
        console.log(res.data)
        isLoading.value = true
        slides.value = res.data
    })
        .catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setTimeout(()=>{

            isLoading.value = false
            },1000)
    })
>>>>>>> c958252347076eaca5ac6bd8a164cd82e7306dfc
}

onMounted(() => {
  getNews();
});
</script>
