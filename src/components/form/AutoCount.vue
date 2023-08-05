<template>
  <vue3-autocounter
    ref="counter"
    :startAmount="0"
    :duration="3"
    prefix=""
    suffix=""
    separator=""
    decimalSeparator=""
    :decimals="0"
    :autoinit="true"    
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Vue3autocounter from "vue3-autocounter";

export default defineComponent({
  name: "Demo",
  components: {
    "vue3-autocounter": Vue3autocounter,
  },
});
</script>
<style lang=""></style>
