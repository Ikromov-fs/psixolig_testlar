<template>
  <div
    @click="prevModal"
    class="fixed z-[#99999] inset-0 bg-[#00000014] backdrop-blur-[11.5px]"
  ></div>
  <div
    class="reactive fixed z-[#99999] sx:w-[90%] mmd:w-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fafcf2] text-[#333] p-5 rounded-md"
  >
    <div>
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
          v-model="inputRegisterData.phoneNumber"
          :error="$v.phoneNumber.$error"
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
        <FormInput
          v-model="inputRegisterData.confirmPassword"
          type="password"
          placeholder="parolni takrorlash"
          :error="$v.confirmPassword.$error"
          label="Parolni takrorlash"
          class="my-4"
        />
        <div>
          <FormInput
            v-model="inputRegisterData.birthDate"
            :error="$v.birthDate.$error"
            type="string"
            placeholder="yil-oy-kun"
            v-maska="'####-##-##'"
            label="Tug'ilgan sana"
            class="my-4"
          />
          <div class="flex gap-10">
            <label class="flex items-center gap-2">
              <p>Erkak</p>
              <TypeRadio value="true" v-model="inputRegisterData.gender" />
            </label>
            <label class="flex items-center gap-2">
              <p>Ayol</p>
              <TypeRadio value="false" v-model="inputRegisterData.gender" />
            </label>
          </div>
        </div>
        <div v-if="!authStore?.isLogin" @click="submitBtn">
          <ButtonFillVue color="#d56603">
            <button class="py-2">Jo'natish</button>
          </ButtonFillVue>
        </div>
        <div v-if="authStore?.isLogin" class="text-center mt-5">
          <CodeInput
            @change="(e:any) => (codeSend = e)"
            :required="true"
            :fields="6"
            :fieldWidth="40"
            :fieldHeight="40"
          />
          <Timer
            @endTime="resendCode = true"
            ref="codeNext"
            class="mt-3 text-xl"
          />
          <div @click="confirmation">
            <ButtonFillVue color="#d56603" v-if="!resendCode">
              <button class="py-2">Tasdiqlash</button>
            </ButtonFillVue>
          </div>
          <div @click="resedCode" v-if="resendCode">
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
import TypeRadio from "../input/TypeRadio.vue";
import { useAuth } from "@/store/auth.js";
import axios from "axios";
const codeSend = ref("");
const codeNext = ref();
const authStore = useAuth();
import { useVuelidate } from "@vuelidate/core";
import { minLength, maxLength, required, sameAs } from "@vuelidate/validators";

const inputRegisterData = reactive({
  fullName: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  gender: "true",
  birthDate: "",
});

const rules = computed(() => {
  return {
    fullName: { required, minLength: minLength(4), maxLength: maxLength(50) },
    password: { required, minLength: minLength(8) },
    confirmPassword: {
      required,
      sameAs: sameAs(inputRegisterData.password),
      minLength: minLength(8),
    },
    birthDate: { required },
    phoneNumber: { required },
    gender: { required },
  };
});
const resendCode = ref(false);
const $v = useVuelidate(rules, inputRegisterData);

const submitBtn = async () => {
  $v.value.$validate();
  if (!$v.value.$error) {
    try {
      const phone =
        "+998" +
        inputRegisterData.phoneNumber
          .replaceAll("-", "")
          .replace("(", "")
          .replace(") ", "");
      const userOptions = {
        phoneNumber: phone,
        fullName: inputRegisterData.fullName,
        password: inputRegisterData.password,
        confirmPassword: inputRegisterData.confirmPassword,
        gender: inputRegisterData.gender,
        birthDate: inputRegisterData.birthDate,
      };
      const user = await authStore.useRegister(userOptions);
    } catch (error) {
      console.log(error);
    } finally {
      $v.value.$reset();
    }
  }
};

// code input
async function confirmation(e:any) {
  e.preventDefault();
  try {
    const phone =
      "+998" +
      inputRegisterData.phoneNumber
        .replaceAll("-", "")
        .replace("(", "")
        .replace(") ", "");
    const options = {
      phoneNumber: phone,
      code: codeSend.value,
    };
    const tokenGet = {
      phoneNumber: phone,
      password: inputRegisterData.password,
    };
    const codeData = await authStore.codeInput(options);
    authStore.useLoginToken(tokenGet);
    localStorage.setItem("phone", phone);
    setTimeout(() => {
      authStore.getToken();
      resendCode.value = false;
      emit("isOpenRegister");
    }, 800);
  } catch (error) {
    console.log(error);
    authStore.isLoginData();
  }
}
function prevModal() {
  authStore.isLoginData();
  emit("isOpenRegister");
}

async function resedCode() {
  try {
    const phoneNumber =
      "+998" +
      inputRegisterData.phoneNumber
        .replaceAll("-", "")
        .replace("(", "")
        .replace(") ", "");
    const nextCode = await axios.post("/auth/code/resend", { phoneNumber });
    if (nextCode) {
      localStorage.setItem("phone", phoneNumber);
      resendCode.value = false;
      codeNext.value.expFunction();
    }
  } catch (error) {
    if (error) {
      resendCode.value = true;
    }
  }
}

const emit = defineEmits(["isOpenRegister"]);
</script>
<style scoped></style>
