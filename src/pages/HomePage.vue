<template>
  <div class="mt-[90px]">
    <Slider />
    <Tests />
    <Winnered id="winnered" />
    <Partner />
    <About id="about" />
    <Contact id="contact"/>
  </div>
</template>
<script setup lang="ts">
import Slider from "../components/home_main/Slider.vue";
import Tests from "@/components/home_main/Tests.vue";
import Winnered from "@/components/home_main/Winnered.vue";
import Partner from "@/components/home_main/Partner.vue";
import Contact from "@/components/home_main/Contact.vue";
import About from "@/components/home_main/About.vue";
</script>
