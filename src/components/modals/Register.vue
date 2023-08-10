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
import TypeRadio from "../input/TypeRadio.vue";
import { useRegister } from "@/store/register.js";

const authRegisterStore = useRegister();
// Validatsiya for Inputs
import { useVuelidate } from "@vuelidate/core";
import { minLength, maxLength, required } from "@vuelidate/validators";

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
    password: { required, minLength: minLength(6) },
    confirmPassword: {
      required,
      minLength: minLength(6),
    },
    birthDate: { required },
    phoneNumber: { required },
    gender: { required },
  };
});

const $v = useVuelidate(rules, inputRegisterData);

// const gender = ref("true");

const submitBtn = async () => {
  console.log(inputRegisterData);
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
      const user = await authRegisterStore.useRegister(userOptions);
      console.log(user);
      // function read
    } catch (error) {
      console.log(error);
    } finally {
      (inputRegisterData.fullName = ""),
        (inputRegisterData.password = ""),
        (inputRegisterData.confirmPassword = ""),
        (inputRegisterData.phoneNumber = ""),
        (inputRegisterData.gender = "true"),
        (inputRegisterData.birthDate = ""),
        $v.value.$reset();
    }
  }
};

// timer
const resendCode = ref(false);
const emit = defineEmits(["isOpenRegister"]);
</script>
<style scoped></style>
