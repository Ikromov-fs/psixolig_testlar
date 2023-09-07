
<template>
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
    >

            <SwiperSlide
                    v-for="item in slides"
                    :key="item.id"
                    class="rounded-md overflow-hidden cursor-pointer "
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
import { Swiper,SwiperSlide } from "swiper/vue";

import { Navigation, Lazy,Pagination,Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/lazy";
import 'swiper/css/pagination';

import {onMounted, ref} from "vue";
import axios from "@/plugins/axios.js";

let slides = ref([])
function getNews() {
    axios.get("news/get-all").then((res)=>{
        console.log(res.data)
        slides.value = res.data
    })
        .catch((err)=>{
            console.log(err)
        })
}

onMounted(()=>{
    getNews()
})
</script>