<template>
  <span
    v-if="!isTo"
    class="duration-300 border px-4 rounded-lg flex items-center justify-center cursor-pointer"
    :class="
      disabled ? 'buttonFillStyle hover:bg-transparent' : 'buttonFillStyle'
    "
  >
    <slot></slot>
  </span>
  <RouterLink
    v-if="isTo"
    :to="to"
    class="buttonFillStyle text-[#F4F6F9] duration-300 hover:bg-transparent border px-4 rounded-lg flex items-center justify-center cursor-pointer"
  >
    <slot></slot>
  </RouterLink>
</template>
<script setup>
const props = defineProps({ to: String, color: String, disabled: Boolean });
const color1 = props.color || "#02897A";
const isTo = props.to ? true : false;
</script>

<style scoped>
.buttonFillStyle {
  margin-top: 10px;
  background-color: v-bind(color1);
  border-color: v-bind(color1);
  color: #f4f6f9;
}
.buttonFillStyle:hover {
  background-color: transparent;
  color: v-bind(color1);
}
</style>
