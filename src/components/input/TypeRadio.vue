<template>
  <label
    class="relative flex cursor-pointer items-center rounded-full"
    :for="inputId"
  >
    <input
      :id="inputId"
      name="check-radio"
      :value="value"
      v-model="correctValue"
      @change="getInputValue"
      type="radio"
      class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-[#1F2E35] text-blue-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
    />
    <div
      class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-3.5 w-3.5"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
      </svg>
    </div>
  </label>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {watch} from "vue";

interface Props {
  inputId?: string;
  value: number | string;
  modelValue: number | string | null;
}

const props = defineProps<Props>();

const correctValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newVal) => {
        correctValue.value = newVal
    }
);

const emit = defineEmits(["update:modelValue","isChange"]);

function getInputValue(e: any) {
  emit("update:modelValue", e.target.value);
  emit("isChange",)
}
</script>
