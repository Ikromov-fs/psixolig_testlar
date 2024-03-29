import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    const localStorageGEtToken = localStorage.getItem("token"); 
    if (localStorageGEtToken) {
      config.headers["Authorization"] = `Bearer ${localStorageGEtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
