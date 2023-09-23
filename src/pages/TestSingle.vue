<template>
  <PaymeModal
    label="Test haqida ma'lumotlar"
    :price="idDataTest?.price"
    :id="idDataTest?.id"
    :title="idDataTest?.title"
    :href="idDataTest?.href"
    :pageId="id"
    :solvedCount="idDataTest?.solvedCount"
    :isOpen="openAssentModal"
    @closeModal="(e:any) => (openAssentModal = e)"
  />
  <div class="container">
    <h1 class="flex justify-center mt-5 text-2xl font-medium sx:text-[22px]">
      Siz va oilangiz uchun !
    </h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 my-8"
      v-if="isLoading"
    >
      <BlockPreloader
        v-for="item in 8"
        :key="testChild"
        :loading="isLoading"
        width="100%"
        height="90px"
        border-radius="6px"
      ></BlockPreloader>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 my-8" v-else>
      <div
        v-for="item in testChild"
        :key="item?.id"
        @click="testIfAssent(item?.id)"
        class="flex items-center justify-between cursor-pointer gap-3 px-8 h-full bg-[#2F4F4F] hover:bg-[#fafcf5] hover:text-black duration-200 text-white font-medium border-[1.5px] border-solid p-2 py-5 rounded-md animate__animated animate__flipInX"
      >
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-dollar-sign"></i>
          <h1
            class="sx:text-[16px] mmd:text-[18px] animate__animated animate__flash"
          >
            {{ item?.title }}
          </h1>
        </div>
        <div class="grid grid-cols-1">
          <p v-if="!item?.sotvogan">
            {{ item?.price }}<span class="ml-1">sum</span>
          </p>
          <i v-else class="fa-solid fa-check text-xl"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import PaymeModal from "@/components/modals/PaymeModal.vue";
import { useToast } from "vue-toastification";
import axios from "@/plugins/axios.js";
import BlockPreloader from "@/components/blockPreloader/BlockPreloader.vue";
const route = useRoute();
const router = useRouter();
const toast = useToast();
const idDataTest = reactive({
  description: "",
  id: "",
  price: "",
  solvedCount: "",
  title: "",
  href: "",
});
const id = route.params.id;

const openAssentModal = ref(false);
const testChild = ref();
const isLoading = ref(false);
async function getAllCategoryChild() {
  isLoading.value = true;
  try {
    const childCategory = await axios.get(`/test/get/all/${id}`);
    testChild.value = childCategory.data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getAllCategoryChild();
});

async function testIfAssent(idMadal: Number) {
  const phone = localStorage.getItem("phone");
  let token = localStorage.getItem("token");
  if (token) {
    try {
      const data = {
        testId: `${idMadal}`,
        phone: phone,
      };
      const isMoney = await axios.post(`/payment/is-sotvogan`, data);
      if (isMoney?.data?.isSotvogan === false) {
        try {
          const phone = localStorage.getItem("phone");
          openAssentModal.value = true;
          const dataTest = await axios.get(`/test/get/${idMadal}`);
          idDataTest.description = dataTest.data.description;
          idDataTest.price = dataTest.data.price;
          idDataTest.solvedCount = dataTest.data.solvedCount;
          idDataTest.title = dataTest.data.title;
          idDataTest.id = dataTest.data.id;
          const data = {
            testId: idDataTest.id,
            phone: `${phone}`,
            amount: idDataTest.price,
            callback: `http://localhost:3000/tests/${id}`,
          };
          const buy = await axios.post(`/payment/generate-link`, data);
          idDataTest.href = buy.data;
        } catch (error) {
          console.log(error);
        }
      } else {
        router.push(`/tester?id=${idMadal}&index=1`);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    toast.error("Ro'yxatdan o'ting !");
  }
}
</script>
