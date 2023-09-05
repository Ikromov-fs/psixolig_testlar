import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();
export const useAuth = defineStore("user", {
  state: () => ({
    userData: [],
    // profileData: [],
    isToken: false,
  }),
  actions: {
    // register
    async useRegister(options) {
      try {
        const user = await axios.post("/auth/register", options);
        this.userData = user.data;
        this.isLogin = true;
      } catch (error) {
        console.log(error);
        this.isLogin = false;
        toast.error("Xatolik mavjud !");
      }
    },

    // code active
    async codeInput(options) {
      try {
        const code = await axios.post("/auth/activate", options);
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
        localStorage.setItem("phone", options.phoneNumber);
        this.islogin = true;
        toast.success("Tizimga kirdingiz !");
      } catch (error) {
        console.log(error);
        toast.error("Xatolik mavjud !");
      }
    },
    async refreshToken() {
      try {
       const newToken = await  axios.post('auth/refresh/token',{
          refreshToken:localStorage.getItem('refreshToken')
        })
        localStorage.setItem("token", newToken.data.accessToken);
      }catch (err){
        console.log(err.response.status,"err")
        if(err.response.status === 401 || err.response.status === 500){
        this.logOut()
          window.location.reload()
        }
      }
    },
    getToken() {
      let token = localStorage.getItem("token") || false;
      if (token) {
        this.isToken = true;
      } else {
        this.isToken = false;
      }
    },
    isLoginData() {
      this.isLogin = false;
    },
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("phone");
      this.islogin = false;
    },
  },
});
