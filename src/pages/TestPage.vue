<template>
  <div class="pb-20 mt-2">
    <div data-aos="fade-up">
      <div class="container mx-auto">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 mmd:grid-cols-3 gap-7 sm:gap-10 mt-8"
          v-if="isLoading"
        >
          <BlockPreloader
            v-for="item in 9"
            :key="item"
            :loading="isLoading"
            width="100%"
            height="90px"
            border-radius="6px"
          ></BlockPreloader>
        </div>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 mmd:grid-cols-3 gap-7 sm:gap-10 relative"
        >
          <Router-Link
            v-for="item in dataTests"
            :key="item?.id"
            :to="`tests/${item?.id}`"
            class="flex items-center justify-center gap-3 px-10 h-full bg-[#333] text-white p-2 mt-10 box-w rounded-md cursor-pointer"
          >
            <h1 class="text-[18px]">
              {{ item?.name }}
            </h1>
          </Router-Link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "@/plugins/axios.js";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import BlockPreloader from "@/components/blockPreloader/BlockPreloader.vue";
const router = useRouter();
const toast = useToast();
// get metod tests
const dataTests = ref();

const isLoading = ref(false);
async function getTests() {
  isLoading.value = true;
  try {
    const tests = await axios.get("category/get/all");
    dataTests.value = tests.data;    
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

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
