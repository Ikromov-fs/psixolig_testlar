<template>
  <div class="container mx-auto py-10">
    <div class="flex justify-center gap-1 text-lg my-10">
      <span class="text-[#333]">06</span>
      <span class="text-[#333]">|</span>
      <span>Kontakt</span>
    </div>
    <div
      class="w-[50%] mx-auto pt-5 border-solid border-[1px] border-[#333] p-5 rounded-md"
    >
      <FormInput
        type="string"
        label="F.I.Sh"
        placeholder="F.I.Sh"
        class="mt-3"
      />
      <FormInput
        type="string"
        label="Tel nomer"
        placeholder="tel nomer"
        class="mt-3"
      />
      <FormInput
        type="string"
        label="Description"
        placeholder="description"
        class="mt-3"
      />
      <div>
        <ButtonTemp>
          <button class="py-2">Jo'natish</button>
        </ButtonTemp>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FormInput from "../form/FormInput.vue";
import ButtonTemp from "../buttons/ButtonFillVue.vue";
</script>
<style lang=""></style>
