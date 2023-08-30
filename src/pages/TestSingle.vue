<template>
  <PaymeModal
    label="Test haqida ma'lumotlar"
    :description="idDataTest?.description"
    :id="idDataTest?.id"
    :price="idDataTest.price"
    :solvedCount="idDataTest.solvedCount"
    :title="idDataTest?.title"
    :isOpen="openAssentModal"
    @closeModal="(e) => (openAssentModal = e)"
  />
  <div class="container">
    <div class="mt-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 relative">
        <div
          v-for="item in testChild"
          :key="item?.id"
          @click="testIfAssent(item?.id)"
          class="flex items-center justify-between gap-3 px-10 h-full bg-[#333] text-white p-2 mt-10 box-w rounded-md cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-circle-question text-2xl"></i>
            <h1 class="text-[18px]">{{ item?.title }}</h1>
          </div>
          <div class="flex items-center gap-3">
            <p>{{ item?.price }} sum</p>
          </div>
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
import { useProfile } from "@/store/profile.js";
import axios from "axios";
const store = useProfile();
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
    const childCategory = await axios.get(`test/get/all-by-category-id/${id}`);
    testChild.value = childCategory.data;
    console.log(childCategory);
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getAllCategoryChild();
});

// function startTest(id: number) {
//   console.log(id);
//   router.push(`/tester?id=${id}&index=1`);
// }
async function testIfAssent(id: Number) {
  const token = localStorage.getItem("token");
  store.profileData();
  const phone = localStorage.getItem("phone");
  if (token) {
    try {
      const data = {
        phoneNumber: phone,
        testId: `${id}`,
      };
      const isMoney = await axios.post(`/payments/merchant/is-sotvogan`, data);
      console.log('ok');
      openAssentModal.value = true;
    } catch (error) {
      console.log(error);
    }
  } else {
    toast.error("Ro'yhatdan o'ting !");
  }
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
