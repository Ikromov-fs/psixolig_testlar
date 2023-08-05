<template>
  <div
    @click="emit('isOpenRegister')"
    class="fixed z-[#99999] inset-0 bg-[#00000014] backdrop-blur-[11.5px]"
  ></div>
  <div
    class="fixed z-[#99999] sx:w-[90%] mmd:w-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fafcf2] text-[#333] p-5 rounded-md"
  >
    <div class="">
      <h1 class="flex justify-center text-xl font-[500]">Register</h1>
      <div class="mt-7">
        <FormInput
          v-model="inputRegisterData.fullName"
          :error="$v.fullName.$error"
          label="F.I.Sh"
          placeholder="F.I.Sh"
          type="string"
        />
        <FormInput
          v-model="inputRegisterData.phone"
          :error="$v.phone.$error"
          type="string"
          placeholder="00 000-00-00"
          label="Tel nomer"
          v-maska="'(##) ###-##-##'"
          class="mt-4"
        />
        <FormInput
          v-model="inputRegisterData.password"
          type="password"
          placeholder="parol"
          :error="$v.password.$error"
          label="Parol"
          class="my-4"
        />
        <div @click="submitBtn">
          <ButtonFillVue>
            <button class="py-2">Jo'natish</button>
          </ButtonFillVue>
        </div>
        <div class="text-center">
          <CodeInput
            :required="true"
            :fields="6"
            :fieldWidth="40"
            :fieldHeight="40"
          />
          <Timer @endTime="resendCode = true" class="mt-3 text-xl" />
          <ButtonFillVue v-if="!resendCode">
            <button class="py-2">Tasdiqlash</button>
          </ButtonFillVue>
          <div v-if="resendCode">
            <a href="#">Qayta kod yuborish !</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import FormInput from "../form/FormInput.vue";
import Timer from "../form/Timer.vue";
import ButtonFillVue from "../buttons/ButtonFillVue.vue";
import CodeInput from "../form/CodeInput.vue";

// Validatsiya for Inputs
import { useVuelidate } from "@vuelidate/core";
import { minLength, maxLength, required } from "@vuelidate/validators";

const inputRegisterData = reactive({
  fullName: "",
  phone: "",
  password: "",
});

const rules = computed(() => {
  return {
    fullName: { required, minLength: minLength(4), maxLength: maxLength(50) },
    password: { required, minLength: minLength(6), maxLength: maxLength(6) },
    phone: { required },
  };
});

const $v = useVuelidate(rules, inputRegisterData);

const submitBtn = async () => {
  console.log(inputRegisterData);
  $v.value.$validate();
  if (!$v.value.$error) {
    try {
      // function read
    } catch (error) {
      console.log(error);
    } finally {
      (inputRegisterData.fullName = ""),
        (inputRegisterData.phone = ""),
        (inputRegisterData.password = ""),
        $v.value.$reset();
    }
  }
};

// timer
const resendCode = ref(false);
const emit = defineEmits(["isOpenRegister"]);
</script>
<style scoped></style>
