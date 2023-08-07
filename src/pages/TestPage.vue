<template>
    <div class="pb-20 mt-2">
        <div data-aos="fade-up">
            <div class="container mx-auto">
                <div class="grid grid-cols-1 sm:grid-cols-2 mmd:grid-cols-3 gap-7 sm:gap-10 relative">
                    <router-link
                            v-for="item in dataTests"
                            :key="item?.id"
                            :to="`tests/${item.id}`"
                            class="flex items-center justify-center gap-3 px-10 h-full bg-[#333] text-white p-2 mt-10 box-w rounded-md cursor-pointer"
                    >
                        <h1 class="text-[18px]">{{ item?.title }}</h1>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const dataTests = ref([
    {
        icon: "fa-solid fa-restroom",
        title: "Ota-onalar uchun",
        id: 1,
    },
    {
        icon: "fa-solid fa-person-dress",
        title: "Ayollar uchun",
        id: 2
    },
    {
        icon: "fa-solid fa-medal",
        title: "Sportchilar uchun",
        id: 3,
    },
    {
        icon: "fa-solid fa-computer",
        title: "Dasturchilar uchun",
        id: 4,
    },
    {
        icon: "fa-solid fa-computer",
        title: "Dasturchilar uchun",
        id: 4,
    },
    {
        icon: "fa-solid fa-computer",
        title: "Dasturchilar uchun",
        id: 4,
    },
    {
        icon: "fa-solid fa-computer",
        title: "Dasturchilar uchun",
        id: 4,
    },
    {
        icon: "fa-solid fa-person-chalkboard",
        title: "Pedagogik qobilyatini aniqlash",
        id: 4,
    },
]);
</script>
<style scoped>
.box-w {
    transition: all 0.2s linear;
    box-shadow: 0 0 15px #f0f0f0;
    transform: scale(0.98);
}

.box-w:hover {
    box-shadow: 0 0 20px #f0f0f0;
    transition: all 0.2s linear;
    transform: scale(0.99);
}
</style>
