<template>
  <div class="pb-20 mt-2">
    <div data-aos="fade-up">
      <div class="container mx-auto">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 mmd:grid-cols-3 gap-7 sm:gap-10 relative"
        >
          <router-link
            v-for="item in dataTests"
            :key="item?.ID"
            :to="`tests${item?.ID}`"
            class="flex items-center justify-center gap-3 px-10 h-full bg-[#333] text-white p-2 mt-10 box-w rounded-md cursor-pointer"
          >
            <h1 class="text-[18px]">{{ item?.name }}</h1>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
const router = useRouter();
const toast = useToast();
// get metod tests
const dataTests = ref();
async function getTests() {
  try {
    const tests = await axios.get("category/get/all");
    dataTests.value = tests.data;
    console.log(tests);
  } catch (error) {
    console.log(error);
  }
}

// function goSingle(item) {
//   const token = localStorage.getItem("token");
//   if (token) {
//     router.push(`tests/${item}`);
//   } else {
//     toast.error("Ro'yxatdan o'ting !");
//   }
// }
onMounted(() => {
  getTests();
});
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
