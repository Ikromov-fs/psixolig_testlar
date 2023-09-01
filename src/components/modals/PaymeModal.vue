<template>
  <div
    id="popup-modal"
    :class="{ 'modal-class': isOpen }"
    class="fixed top-0 hidden items-center justify-center z-50 overflow-y-auto md:inset-0 h-modal w-[100%] md:h-full h-[100vh]"
  >
    <div class="relative bg-white rounded-lg shadow p-5 mmd:w-[38%]">
      <p class="py-2 px-3 font-medium">{{ label }}:</p>
      <div class="px-2 py-2 text-center">
        <ul class="text-left w-[100%]">
          <li class="my-2">Test nomi: {{ title }}</li>
          <!-- <li>{{ solvedCount }}</li> -->
          <li class="my-2">Narxi: {{ price ? price : 0 }} sum</li>
          <li class="my-2">Test haqida: {{ description }}</li>
        </ul>
        <div v-if="!isBuy" class="grid grid-cols-2 gap-3 mt-4">
          <SButton @click="buyTest" variant="info" :loading="loading">
            Hoziroq sotib olish</SButton
          >
          <SButton variant="danger" @click="cancelModal"> Orqaga</SButton>
        </div>
        <div v-if="isBuy" class="grid grid-cols-2 gap-3 mt-4">
          <a :href="href">
            <SButton variant="info" :loading="loading" class="w-full">To'lov</SButton>
          </a>
          <SButton variant="danger" @click="cancelModal"> Orqaga</SButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
// import ButtonFillVue from "../buttons/ButtonFillVue.vue";
import SButton from "../buttons/SButton.vue";
import { useToast } from "vue-toastification";
import axios from "@/plugins/axios.js";
const href = ref();
const isBuy = ref(false);
const toast = useToast();
const props = defineProps({
  isOpen: Boolean,
  loading: Boolean,
  value: String,
  description: String,
  id: String,
  pageId: String,
  price: String,
  solvedCount: String,
  title: String,
  label: {
    type: String,
    default: "Categoriya qo`shish",
  },
});

const emit = defineEmits(["closeModal", "fetchModal"]);

const modalValue = ref(props.value);
const openCondition = ref(props.isOpen);
function cancelModal() {
  openCondition.value = false;
  emit("closeModal", openCondition.value);
}
async function buyTest() {
  const phone = localStorage.getItem("phone");
  try {
    const data = {
      testId: props?.id,
      phone: `${phone}`,
      amount: props?.price,
      callback: `http://localhost:3000/tests/${props?.pageId}`,
    };
    const buy = await axios.post(`/payment/generate-link`, data);
    href.value = buy.data;
    isBuy.value = true;
  } catch (error) {
    console.log(error);
  }
}

watch(
  () => props.loading,
  () => {
    if (!props.loading) {
      cancelModal();
    }
  }
);

watch(
  () => props.value,
  () => {
    modalValue.value = props.value;
  }
);
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
