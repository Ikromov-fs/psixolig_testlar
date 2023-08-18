import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();
export const useAuth = defineStore("user", {
  state: () => ({
    userData: undefined,
    islogin: false,
  }),
  actions: {
    // register
    async useRegister(options) {
      try {
        const user = await axios.post("/auth/register", options);
        this.userData = user.data;
      } catch (error) {
        console.log(error);
        toast.error("Xatolik mavjud !");
      }
    },

    // code active
    async codeInput(options) {
      try {
        const code = await axios.post("/auth/activate", options);
        console.log(code);
        toast.success("Ro'yxatdan o'tdingiz !");
      } catch (error) {
        console.log(error);
        toast.error("Xatolik mavjud !");
      }
    },

    // Login
    async useLoginToken(options) {
      try {
        const token = await axios.post("/auth/access/token", options);
        localStorage.setItem("token", token.data.accessToken);
        localStorage.setItem("refreshToken", token.data.refreshToken);
        this.islogin = true;
        toast.success("Ro'yxatdan o'tdingiz !");
      } catch (error) {
        console.log(error);
        toast.error("Xatolik mavjud !");
      }
    },

    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      this.islogin = false;
    },
  },
});
