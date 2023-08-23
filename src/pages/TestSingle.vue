<template>
  <div class="container">
    <div class="mt-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 relative">
        <div
          v-for="item in testChild"
          :key="item?.id"
          @click="startTest(item.id)"
          class="flex items-center justify-between gap-3 px-10 h-full bg-[#333] text-white p-2 mt-10 box-w rounded-md cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-circle-question text-2xl"></i>
            <h1 class="text-[18px]">{{ item?.title }}</h1>
          </div>
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-signal"></i>
            <p>{{ item?.solvedCount }} %</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const testChild = ref();
async function getAllCategoryChild() {
  try {
    const childCategory = await axios.get(`test/get/all-by-category-id/${id}`);
    testChild.value = childCategory.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getAllCategoryChild();
});

function startTest(id: number) {
  console.log(id);
  router.push(`/tester?id=${id}&index=1`);
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
