<template>
  <div class=" container ">
      <div class="mt-28">

          <div class="grid grid-cols-1 sm:grid-cols-2  gap-4 sm:gap-8 relative">
              <div
                      v-for="item in testList"
                      :key="item?.id"
                      @click="startTest(item.id)"
                      class="flex items-center justify-between  gap-3 px-10 h-full bg-[#333] text-white p-2 mt-10 box-w rounded-md cursor-pointer"
              >
                  <div class="flex items-center gap-3">
                      <i class="fa-solid fa-circle-question text-2xl"></i>
                      <h1 class="text-[18px]">{{ item?.name }}</h1>
                  </div>
                  <div class="flex items-center gap-3">
                      <i class="fa-solid fa-signal"></i>
                     <p>{{item.status}} %</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

  const route = useRoute()
  const router = useRouter()

  const testList = [
      {
          id:1,
          name:"Birinchi test",
          status:50
      },
      {
          id:2,
          name:"Ikkinchi test",
          status:80
      },
      {
          id:3,
          name:"Uchunchi test",
          status:20
      },
      {
          id:4,
          name:"To'rtinchi test",
          status:50
      },
      {
          id:5,
          name:"Beshinchi test",
          status:50
      },
      {
          id:6,
          name:"Oltinchi test",
          status:30
      }
  ]

  function startTest(id:number){
      console.log(id)
      router.push(`/tester?id=${id}`)

  }
</script>

<style scoped>
.box-w {
    transition: all 0.2s linear;
    box-shadow: 0px 0px 15px #fff;
    transform: scale(0.98);
}
.box-w:hover {
    box-shadow: 0px 0px 20px #fff;
    transition: all 0.2s linear;
    transform: scale(0.99);
}
</style>