<template>
  <div
    @click="emit('openLoginModal')"
    class="fixed z-[#999999] backdrop-blur-[11.5px] inset-0"
  ></div>
  <div
    class="fixed z-[#99999] bg-[#fafcf2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sx:w-[90%] p-8 rounded-md mmd:w-[40%]"
  >
    <h1 class="text-[20px] flex justify-center font-[500]">Login</h1>
    <FormInput
      v-model="dataLogin.phone"
      :error="$Vlogin.phone.$error"
      type="string"
      placeholder="00 000 00 00"
      v-maska="'(##) ###-##-##'"
      label="Tel nomer"
    />
    <FormInput
      v-model="dataLogin.password"
      :error="$Vlogin.password.$error"
      type="password"
      placeholder="parol"
      label="Parol"
      class="mt-3"
    />
    <div class="mt-5" @click="submitLoginBtn">
      <ButtonFillVue>
        <button class="py-2">Jo'natish</button>
      </ButtonFillVue>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import FormInput from "../form/FormInput.vue";
import ButtonFillVue from "../buttons/ButtonFillVue.vue";
// Validatsiya form Inputs
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

import { useToast } from "vue-toastification";
const toast = useToast();

import { useAuth } from "@/store/auth.js";
const store = useAuth();

const dataLogin = reactive({
  phone: "",
  password: "",
});
const roles = computed(() => {
  return {
    phone: { required },
    password: { required, minLength: minLength(8) },
  };
});
const $Vlogin = useVuelidate(roles, dataLogin);

// set with Back end
const submitLoginBtn = async () => {
  $Vlogin.value.$validate();
  if (!$Vlogin.value.$error) {
    try {
      const phone =
        "+998" +
        dataLogin.phone.replaceAll("-", "").replace("(", "").replace(") ", "");
      const options = {
        phoneNumber: phone,
        password: dataLogin.password,
      };
      const user = await store.useLoginToken(options);
      console.log(user);
      store.getToken();
      emit("openLoginModal");
    } catch (error) {
      console.log(error);
    } finally {
      (dataLogin.password = ""), (dataLogin.phone = "");
      $Vlogin.value.$reset();
    }
  }
};

const emit = defineEmits(["openLoginModal"]);
</script>
<style scoped></style>
