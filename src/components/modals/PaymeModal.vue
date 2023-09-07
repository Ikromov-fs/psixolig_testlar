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
          <a :href="props?.href">
            <SButton variant="info" :loading="loading" class="w-full"
              >Hoziroq sotib olish</SButton
            >
          </a>
          <SButton variant="danger" @click="cancelModal"> Orqaga</SButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import SButton from "../buttons/SButton.vue";
const isBuy = ref(false);
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
  href: String,
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
