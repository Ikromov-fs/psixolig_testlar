<template>
<!--    <pre>{{route}}</pre>-->
    <div  class="flex justify-center items-center border w-5 h-5 p-4 cursor-pointer border-[#1F2E35] transition duration-300 rounded-[2px] hover:bg-[#264653] hover:text-white" :class="[item?.isSolved ? 'solved' :'',route.query.index == item?.questionIndex ? 'active' :'']" @click="changeRoute(item?.questionIndex)">
        {{ index }}
    </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

  const route = useRoute()
  const router = useRouter()

interface Props{
      item?:{
          questionIndex:number,
          isSolved:boolean
      },
    index?:number,
}

defineProps<Props>()

function changeRoute(id:number){
      router.replace(`/tester?id=${route.query.id}&index=${id}`)
}
</script>

<style scoped>
  .solved{
      background: #1F2E35;
      color: white;
  }
  .active{
      background: #264653;
      color: white;
  }
</style>