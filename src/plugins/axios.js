import axios from "axios";

// const localStorageGEtToken = JSON.parse(localStorage.getItem('token'))

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL

axios.interceptors.request.use(
    (config) => {
        // config.headers['Authorization'] = `Bearer ${}`
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;
