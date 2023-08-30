<template>
  <div
    @click="emit('openEditModal')"
    class="fixed z-[#999999] backdrop-blur-[11.5px] inset-0"
  ></div>
  <div
    class="fixed z-[#99999] bg-[#fff] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sx:w-[90%] p-8 rounded-md mmd:w-[40%]"
  >
    <h1 class="text-[20px] flex justify-center mb-10 font-[500]">
      Telefon nomerni o'zgartirish !
    </h1>
    <FormInput
      v-model="dataLogin.newPhoneNumber"
      :error="$Vlogin.newPhoneNumber.$error"
      type="string"
      placeholder="00 000 00 00"
      v-maska="'(##) ###-##-##'"
      label="Yangi tel nomerni kiriting"
    />
    <FormInput
      v-model="dataLogin.password"
      :error="$Vlogin.password.$error"
      type="password"
      placeholder="Parol"
      label="Parol"
      class="mt-5"
    />
    <div v-if="!codeNext" class="mt-5" @click="submitLoginBtn">
      <ButtonFillVue color="#d56603">
        <button class="py-2">Jo'natish</button>
      </ButtonFillVue>
    </div>
    <div v-if="codeNext" class="mt-10 text-center ">
      <CodeInput
        @change="(e:any) => (codeSend = e)"
        :required="true"
        :fields="6"
        :fieldWidth="40"
        :fieldHeight="40"
      />
      <Timer @endTime="resendCode = true" ref="timer" class="mt-3 text-xl" />
      <div @click="code">
        <ButtonFillVue color="#d56603">
          <button class="py-2">Tasdiqlash</button>
        </ButtonFillVue>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, ref, onMounted } from "vue";
import FormInput from "../form/FormInput.vue";
import ButtonFillVue from "../buttons/ButtonFillVue.vue";
import CodeInput from "@/components/form/CodeInput.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import Timer from "../form/Timer.vue";
import axios from "@/plugins/axios.js";
const toast = useToast();

import { useAuth } from "@/store/auth.js";
const store = useAuth();
const resendCode = ref(false);
const codeNext = ref(false);
const timer = ref();
const codeSend = ref("");
const dataLogin = reactive({
  newPhoneNumber: "",
  password: "",
});
const roles = computed(() => {
  return {
    newPhoneNumber: { required },
    password: { required },
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
        dataLogin.newPhoneNumber
          .replaceAll("-", "")
          .replace("(", "")
          .replace(") ", "");
      const options = {
        newPhoneNumber: phone,
        oldPhoneNumber: store?.profileData?.username,
      };
      const editPhone = await axios.post(`/auth/code/change/phone`, options);
      codeNext.value = true;
    } catch (error) {
      console.log(error);
    } finally {
      $Vlogin.value.$reset();
    }
  }
};

async function code() {
  try {
    const phone =
      "+998" +
      dataLogin.newPhoneNumber
        .replaceAll("-", "")
        .replace("(", "")
        .replace(") ", "");
    const data = {
      new_phone_number: phone,
      old_phone_number: store?.profileData?.username,
      password: dataLogin.password,
      otp: codeSend.value,
    };
    const codeRezult = await axios.post("/user/change_phone_number", data);
    store.getProfile();
    emit("openEditModal");
    toast.success("Telefon nomer almashdi !");
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  store.getProfile();
});

const emit = defineEmits(["openEditModal"]);
</script>
<style scoped></style>
