import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/index.css";
import router from "./router";

// maska
import Maska from "maska";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// auto count
import Vue3Autocounter from 'vue3-autocounter';

// Slider
import VueSplide from "@splidejs/vue-splide";
const app = createApp(App);
app.use(router);
app.component('vue3-autocounter', Vue3Autocounter)
AOS.init()
app.use(Maska);
app.use(VueSplide);
app.mount("#app");
