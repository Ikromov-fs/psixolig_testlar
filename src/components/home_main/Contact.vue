<template>
  <div data-aos="zoom-in-up" class="container mx-auto py-10">
    <div class="flex justify-center gap-1 text-lg my-10">
      <span class="text-[#333]">07</span>
      <span class="text-[#333]">|</span>
      <span>Kontakt</span>
    </div>
    <div class="grid sx:grid-cols-1 mmd:grid-cols-2 items-center">
      <div class="border-solid border-[1px] border-[#333] p-5 rounded-md">
        <FormInput
          v-model="dataContact.fullName"
          :error="$v.fullName.$error"
          type="string"
          label="F.I.Sh"
          placeholder="F.I.Sh"
          class="mt-3"
        />
        <FormInput
          v-model="dataContact.phoneNumber"
          :error="$v.phoneNumber.$error"
          type="string"
          label="Tel nomer"
          placeholder="tel nomer"
          v-maska="'(##) ###-##-##'"
          class="mt-3"
        />
        <FormInput
          v-model="dataContact.comment"
          :error="$v.comment.$error"
          type="string"
          label="Tavsifi"
          placeholder="tavsifi"
          class="mt-3"
        />
        <div @click="contactBtn">
          <ButtonTemp>
            <button class="py-2">Jo'natish</button>
          </ButtonTemp>
        </div>
      </div>
      <div class="flex justify-center">
        <img :src="contact" alt="icon for cantact" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive } from "vue";
import FormInput from "../form/FormInput.vue";
import ButtonTemp from "../buttons/ButtonFillVue.vue";
import contact from "../../assets/svg/contact.svg";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { tokens } from "maska";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import axios from "@/plugins/axios.js";
const router = useRouter();
const toast = useToast();
const token = localStorage.getItem("token");

const dataContact = reactive({
  fullName: "",
  phoneNumber: "",
  comment: "",
});

const rules = computed(() => {
  return {
    fullName: { required },
    phoneNumber: { required, minLength: minLength(12) },
    comment: { required },
  };
});

const $v = useVuelidate(rules, dataContact);

// set with Back end
const contactBtn = async () => {
  $v.value.$validate();
  if (!$v.value.$error) {
    if (token) {
      try {
        const phone =
          "+998" +
          dataContact.phoneNumber
            .replaceAll("-", "")
            .replace("(", "")
            .replace(") ", "");
        const dataForCantact = {
          fullName: dataContact.fullName,
          phoneNumber: phone,
          comment: dataContact.comment,
        };
        const setAdmin = axios.post("/suggestions/create", dataForCantact);
        toast.success("Xabar yuborildi !");
      } catch (error) {
        console.log(error);
      } finally {
        (dataContact.comment = ""),
          (dataContact.phoneNumber = ""),
          (dataContact.fullName = "");
        $v.value.$reset();
      }
    } else {
      $v.value.$reset();
      router.push("/");
      toast.error("Jo'natishdan oldin ro'yhatdan o'ting !");
      (dataContact.comment = ""),
        (dataContact.phoneNumber = ""),
        (dataContact.fullName = "");
        
    }
  }
};
</script>
<style lang=""></style>
