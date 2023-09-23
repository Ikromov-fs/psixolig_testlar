<template>
  <div class="pb-20 mt-2">
    <div data-aos="fade-up">
      <div class="container mx-auto">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 mmd:grid-cols-3 gap-7 sm:gap-10"
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
            class="flex items-center justify-center gap-3 px-10 h-full bg-[#2F4F4F] text-white border-[1.5px] hover:bg-[#fafcf5] duration-200 hover:text-black hover:border-solid hover:border-[1.5px] p-2 mt-10 rounded-md cursor-pointer animate__animated animate__bounce animate__zoomIn"
          >
            <h1 class="mmd:text-[18px] font-medium">
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
<style scoped></style>
