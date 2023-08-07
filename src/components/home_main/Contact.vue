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
          v-model="dataContact.fulName"
          :error="$v.fulName.$error"
          type="string"
          label="F.I.Sh"
          placeholder="F.I.Sh"
          class="mt-3"
        />
        <FormInput
          v-model="dataContact.phone"
          :error="$v.phone.$error"
          type="string"
          label="Tel nomer"
          placeholder="tel nomer"
          v-maska="'(##)-###-##-##'"
          class="mt-3"
        />
        <FormInput
          v-model="dataContact.description"
          :error="$v.description.$error"
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

const dataContact = reactive({
  fulName: "",
  phone: "",
  description: "",
});

const rules = computed(() => {
  return {
    fulName: { required },
    phone: { required, minLength: minLength(12) },
    description: { required },
  };
});

const $v = useVuelidate(rules, dataContact);

// set with Back end

const contactBtn = async () => {
  $v.value.$validate()
  if (!$v.value.$error) {
    try {
      // function
    } catch (error) {
      console.log(error);
    } finally {
      (dataContact.description = ""),
        (dataContact.phone = ""),
        (dataContact.fulName = "");
      $v.value.$reset();
    }
  }
};
</script>
<style lang=""></style>
