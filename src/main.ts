import "vue-toastification/dist/index.css";
import "@/styles/index.css";
import "animate.css";
import "./plugins/axios";
import "aos/dist/aos.css";

import { createApp } from "vue";

// AOS
import AOS from "aos";
// maska
import Maska from "maska";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Toast from "vue-toastification";
// auto count
import Vue3Autocounter from "vue3-autocounter";

// Slider
import VueSplide from "@splidejs/vue-splide";

import App from "./App.vue";
import router from "./router";

// pina
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.component("vue3-autocounter", Vue3Autocounter);
AOS.init();
app.use(Maska);
app.use(router);
app.use(pinia);
app.use(VueSplide);
app.use(Toast);
app.mount("#app");
