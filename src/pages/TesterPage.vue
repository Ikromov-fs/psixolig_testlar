<template>
  <div class="container">
      <div class="mt-2">
         <div class="flex items-center gap-3 pt-2">
             <i class="fa-solid fa-circle-question text-2xl"></i>
             <h2 class="font-medium text-xl">Category name / Birinchi test</h2>
         </div>
          <div class="grid grid-cols-12 mt-5 gap-6">
              <div class="border col-span-8 flex flex-col justify-between p-4">
                  <div>
                      <p>{{activeTest}}</p>
                  </div>
                  <div class="flex gap-3 justify-end">
                      <SButton variant="dark" @click="fetchPrevQuestion(+activeTest)" :disabled="prevDisabled">
                          Oldingi
                      </SButton>
                      <SButton variant="dark" @click="fetchNextQuestion(+activeTest)" :disabled="nextDisabled">
                          Keyingi
                      </SButton>
                  </div>
              </div>
              <div class="border col-span-4 p-4 flex flex-wrap gap-2 ">
                  <TestIndex v-for="(item,index) in testIndex" :key="index" :item="item" :index="index+1"/>
              </div>
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
function fetchPrevQuestion(id:number){
    if (id >1){
        id--
        router.replace(`/tester?id=${id}`)
    }
   else{
       prevDisabled.value=true
    }
}
function fetchNextQuestion(id:number){
    if(id < totalTest.value){
        id++
        router.replace(`/tester?id=${id}`)
    }
    else{
        nextDisabled.value = true
    }
}

watch(()=>route.query.id,
    (newVal)=>{
    activeTest.value = newVal
        prevDisabled.value = false
        nextDisabled.value = false
}
)

const testIndex = [
    {
        id:1,
        isSolve:false
    },
    {
        id:2,
        isSolve:false
    },
    {
        id:3,
        isSolve:false
    },
    {
        id:4,
        isSolve:false
    },
    {
        id:5,
        isSolve:false
    },
    {
        id:6,
        isSolve:false
    },
    {
        id:7,
        isSolve:false
    },
    {
        id:8,
        isSolve:false
    },
    {
        id:9,
        isSolve:true
    },
    {
        id:10,
        isSolve:false
    }
]
</script>