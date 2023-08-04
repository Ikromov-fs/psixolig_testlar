import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/index.css";
import router from "./router";

// maska
import Maska from "maska";

const app = createApp(App);
app.use(router);
app.use(Maska);
app.mount("#app");
