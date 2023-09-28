<template>
  <div
    @click="emit('openLoginModal')"
    class="fixed z-[#999999] backdrop-blur-[11.5px] inset-0"
  ></div>
  <div
    class="fixed z-[#99999] bg-[#fff] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sx:w-[90%] p-8 rounded-md mmd:w-[40%]"
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
      :placeholder="isForget ? 'yangi parol' : 'parol'"
      :label="isForget ? 'Yangi parol' : 'Parol'"
      class="mt-3"
    />
    <div>
      <FormInput
        v-if="isForget"
        v-model="dataLogin.confirm_password"
        :error="$Vlogin.confirm_password.$error"
        type="password"
        placeholder="parolni takrorlang"
        label="Parolni takrorlang"
        class="mt-3"
      />
      <div class="mt-5">
        <CodeInput
          v-if="forCode"
          @change="(e:any) => (codeSend = e)"
          :required="true"
          :fields="6"
          :fieldWidth="40"
          :fieldHeight="40"
        />
        <Timer
          v-if="forCode"
          @endTime="forCode = true"
          ref="codeNext"
          class="mt-5 text-xl flex justify-center"
        />
      </div>
    </div>
    <p
      v-if="!isForget"
      class="text-sm cursor-pointer mt-1 flex justify-end"
      @click="forgetPassword"
    >
      Parolni unutdingizmi!
    </p>
    <div class="mt-4" @click="submitLoginBtn">
      <ButtonFillVue color="#d56603">
        <button class="py-2">Jo'natish</button>
      </ButtonFillVue>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import FormInput from "../form/FormInput.vue";
import ButtonFillVue from "../buttons/ButtonFillVue.vue";
import CodeInput from "../form/CodeInput.vue";
import Timer from "../form/Timer.vue";
import axios from "../../plugins/axios.js";
// Validatsiya form Inputs
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

import { useToast } from "vue-toastification";
import { useAuth } from "@/store/auth.js";

const toast = useToast();
const codeSend = ref();
const store = useAuth();
const forCode = ref(false);
const dataLogin = reactive({
  phone: "",
  password: "",
  confirm_password: "",
});
const roles = computed(() => {
  return {
    phone: { required },
    password: { required, minLength: minLength(8) },
    confirm_password: { required, minLength: minLength(8) },
  };
});
const $Vlogin = useVuelidate(roles, dataLogin);

// forget password

const isForget = ref(false);
function forgetPassword() {
  isForget.value = true;
}

// set with Back end
const submitLoginBtn = async () => {
  $Vlogin.value.$validate();

  // shunchaki validatsiyani aylanib o'tish uchun
  if (!isForget.value) {
    dataLogin.confirm_password = "admin123";
  }
  if (!$Vlogin.value.$error) {
    const phone =
      "+998" +
      dataLogin.phone.replaceAll("-", "").replace("(", "").replace(") ", "");
    if (isForget.value) {
      console.log("ishladi");
      if (forCode.value) {
        try {
          const data = {
            phone: phone,
            password: dataLogin.password,
            confirm_password: dataLogin.confirm_password,
            code: codeSend.value,
          };
          const forgerPassword = await axios.post(
            `/user/forgot_password`,
            data
          );
          emit("openLoginModal");
          toast.success("Parol tiklandi, qaytadan login qiling !");
        } catch (error) {
          emit("openLoginModal");
          toast.success("Parolni tiklashda xatolik !");
          console.log(error);
        }
      } else {
        try {
          await store.forgetPassword(phone);
          forCode.value = true;
        } catch (err) {
          forCode.value = false;
          console.log(err);
        }
      }
    } else {
      try {
        const options = {
          phoneNumber: phone,
          password: dataLogin.password,
        };
        const user = await store.useLoginToken(options);
        if (user) {
          localStorage.setItem("phone", phone);
        }
        store?.getToken();
        emit("openLoginModal");
      } catch (error) {
        console.log(error);
      } finally {
        (dataLogin.password = ""), (dataLogin.phone = "");
        isForget.value = false;
        $Vlogin.value.$reset();
      }
    }
  }
};

const emit = defineEmits(["openLoginModal"]);
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
</style>
