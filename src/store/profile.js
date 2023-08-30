import axios from "axios";
import { defineStore } from "pinia";
export const useProfile = defineStore("profile", {
  state: () => ({
    userData: [],
  }),
  actions: {
    async profileData() {
      try {
        const user = await axios.get(`/user/current`);
        this.userData = user.data;
        localStorage.setItem("phone", user.data.username);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
