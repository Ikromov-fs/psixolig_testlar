<template>
  <PaymeModal
    label="Test haqida ma'lumotlar"
    :isOpen="openAssentModal"
    @closeModal="(e:any) => (openAssentModal = e)"
  />
  <div class="container">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 my-10">
      <div
        v-for="item in testChild"
        :key="item?.id"
        @click="testIfAssent(item?.id)"
        class="flex items-center justify-between gap-3 px-10 h-full bg-[#333] text-white p-2 py-5 box-w rounded-md cursor-pointer"
      >
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-circle-question text-2xl"></i>
          <h1 class="sx:text-[16px] mmd:text-[18px]">{{ item?.title }}</h1>
        </div>
        <div class="flex items-center gap-3">
          <p>{{ item?.price }} sum</p>
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
const route = useRoute();
const router = useRouter();
const toast = useToast();
const idDataTest = reactive({
  description: "",
  id: "",
  price: "",
  solvedCount: "",
  title: "",
});
const id = route.params.id;

const openAssentModal = ref(false);
const testChild = ref();
async function getAllCategoryChild() {
  try {
    const childCategory = await axios.get(`/test/get/all-by-category-id/${id}`);
    testChild.value = childCategory.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getAllCategoryChild();
});

async function testIfAssent(id: Number) {
  const token = localStorage.getItem("token");
  const phone = localStorage.getItem("phone");
  if (token) {
    try {
      const data = {
        testId: `${id}`,
        phone: phone,
      };
      const isMoney = await axios.post(`/payment/is-sotvogan`, data);
      if (isMoney?.data?.isSotvogan === false) {
        openAssentModal.value = true;
        try {
          const dataTest = await axios.get(`/test/get/${id}`);
          idDataTest.description = dataTest.data.description;
          idDataTest.price = dataTest.data.price;
          idDataTest.solvedCount = dataTest.data.solvedCount;
          idDataTest.title = dataTest.data.title;
          idDataTest.id = dataTest.data.id;
        } catch (error) {
          console.log(error);
        }
      } else {
        router.push(`/tester?id=${id}&index=1`);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    toast.error("Ro'yhatdan o'ting !");
  }
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
