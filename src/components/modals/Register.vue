<template>
  <div
    @click="emit('isOpenRegister')"
    class="fixed z-[#99999] inset-0 bg-[#00000014] backdrop-blur-[11.5px]"
  ></div>
  <div
    class="fixed z-[#99999] sx:w-[90%] mmd:w-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fafcf5] text-[#333] p-5 rounded-md"
  >
    <div class="">
      <h1 class="flex justify-center text-xl font-[500]">Register</h1>
      <div class="mt-7">
        <FormInput label="F.I.Sh" placeholder="F.I.Sh" type="text" />
        <FormInput
          type="string"
          placeholder="00 000-00-00"
          label="Tel nomer"
          v-maska="'(##) ###-##-##'"
          class="mt-4"
        />
        <FormInput
          type="password"
          placeholder="parol"
          label="Parol"
          class="my-4"
        />
        <ButtonFillVue>
          <button class="py-2">Jo'natish</button>
        </ButtonFillVue>
        <div>
          <CodeInput :required="true" :fields="6" />
          <ButtonFillVue>
            <button class="py-2">Tasdiqlash</button>
          </ButtonFillVue>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FormInput from "../form/FormInput.vue";
import ButtonFillVue from "../buttons/ButtonFillVue.vue";
import CodeInput from "../form/CodeInput.vue";
const emit = defineEmits(["isOpenRegister"]);
</script>
<style scoped></style>
