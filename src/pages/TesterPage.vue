<template>
    <div class="container">
        <div class="mt-2">
            <div class="flex items-center gap-3 pt-2">
                <i class="fa-solid fa-circle-question text-2xl"></i>
                <h2 class="font-medium text-xl">Category name / Birinchi test</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-12 mt-5 mb-2 gap-6">
                <div class="border md:col-span-8 flex flex-col justify-between p-4">
                    <div>
                        <div class="flex gap-2">
<!--                            <p class="font-medium text-xl">{{ activeTest }})</p>-->
                            <div class="flex flex-col gap-2">
                                <img src="https://picsum.photos/id/237/536/354" alt="test images" class="max-h-[130px] object-contain w-full">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eos explicabo labore magnam nam qui reiciendis tempore tenetur totam! Corporis, est voluptatum. Beatae distinctio enim facere itaque, nobis officiis porro.</p>
                            </div>
                        </div>
                        <div class="mt-3 flex flex-col gap-3">
                            <div class="w-full py-3 px-2 border cursor-pointer relative">
                                <label for="test" class="absolute w-full h-full cursor-pointer"></label>
                                <div class="flex gap-2">
                                    <input type="radio" name="radio" value="1" id="test" >
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, sed!</p>
                                </div>
                            </div>
                            <div class="w-full py-3 px-2 border cursor-pointer relative">
                                <label for="test2" class="absolute w-full h-full cursor-pointer"></label>
                                <div class="flex gap-2">
                                    <input type="radio" name="radio" value="1" id="test2" >
                                    <img src="https://picsum.photos/id/237/536/354" alt="test images" class="w-[70px] h-[70px] object-cover">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, sed!</p>
                                </div>
                            </div>
                            <div class="w-full py-3 px-2 border cursor-pointer relative">
                                <label for="test3" class="absolute w-full h-full cursor-pointer"></label>
                                <div class="flex gap-2">
                                    <input type="radio" name="radio" value="1" id="test3" >
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, sed!</p>
                                </div>
                            </div>
                            <div class="w-full py-3 px-2 border cursor-pointer relative">
                                <label for="test4" class="absolute w-full h-full cursor-pointer"></label>
                                <div class="flex gap-2">
                                    <input type="radio" name="radio" value="1" id="test4" >
                                    <img src="https://picsum.photos/id/237/536/354" alt="test images" class="w-[70px] h-[70px] object-cover">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, sed!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-3 justify-end mt-5">
                        <SButton variant="dark" @click="fetchPrevQuestion(+activeTest)" :disabled="prevDisabled">
                            Oldingi
                        </SButton>
                        <SButton variant="dark" @click="fetchNextQuestion(+activeTest)" :disabled="nextDisabled">
                            Keyingi
                        </SButton>
                    </div>
                </div>
                <div class="border md:col-span-4 p-4  ">
                    <div class="flex flex-wrap gap-2">
                        <TestIndex v-for="(item,index) in testIndex" :key="index" :item="item" :index="index+1"/>
                    </div>
                </div>
            </div>
            <div class="flex justify-end my-3 mb-6">
            <SButton variant="danger">Testni yakunlash</SButton>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import TestIndex from "@/components/card/TestIndex.vue";
import SButton from "@/components/buttons/SButton.vue";
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
const activeTest = ref(route.query.id)
const totalTest = ref(10)
const prevDisabled = ref(false)
const nextDisabled = ref(false)

function fetchPrevQuestion(id: number) {
    if (id > 1) {
        id--
        router.replace(`/tester?id=${id}`)
    } else {
        prevDisabled.value = true
    }
}

function fetchNextQuestion(id: number) {
    if (id < totalTest.value) {
        id++
        router.replace(`/tester?id=${id}`)
    } else {
        nextDisabled.value = true
    }
}

watch(() => route.query.id,
    (newVal) => {
        activeTest.value = newVal
        prevDisabled.value = false
        nextDisabled.value = false
    }
)

const testIndex = [
    {
        id: 1,
        isSolve: false
    },
    {
        id: 2,
        isSolve: false
    },
    {
        id: 3,
        isSolve: false
    },
    {
        id: 4,
        isSolve: false
    },
    {
        id: 5,
        isSolve: false
    },
    {
        id: 6,
        isSolve: false
    },
    {
        id: 7,
        isSolve: false
    },
    {
        id: 8,
        isSolve: false
    },
    {
        id: 9,
        isSolve: true
    },
    {
        id: 10,
        isSolve: false
    }
]
</script>

