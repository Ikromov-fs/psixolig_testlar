import { createApp } from "vue";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import Toast from "vue-toastification";

import App from "./App.vue";
import "@/styles/index.css";

import router from "./router";
import "./plugins/axios";
// maska
import Maska from "maska";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// auto count
import Vue3Autocounter from "vue3-autocounter";

// pina
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Slider
import VueSplide from "@splidejs/vue-splide";
const app = createApp(App);
app.component("vue3-autocounter", Vue3Autocounter);
AOS.init();
app.use(Maska);
app.use(router);
app.use(pinia);
app.use(VueSplide);
app.use(Toast);
app.mount("#app");
