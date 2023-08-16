import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useRegister = defineStore("user", {
  state: () => ({
    userData: [],
  }),
  actions: {
    async useRegister(options) {
      try {
        const user = await axios.post("/auth/register", options);
        this.userData = user.data;
        toast.success("Ro'yxatdan o'tdingiz !");
      } catch (error) {
        console.log(error);
        toast.error("Xatolik mavjud !");
      }
    },
    async codeInput(options) {
      try {
        const code = await axios.post("/auth/activate", options);
        console.log(code);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
