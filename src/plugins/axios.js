import axios from "axios";
const localStorageGEtToken = localStorage.getItem("token");
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;

let reflesh = false;
axios.interceptors.request.use(
  (res) => res,
  async (error) => {
    if (error.request.status === 401 && !reflesh) {
      reflesh = true;
      const { status, data } = await axios.post(
        `refresh/token`,
        (data = { localStorageGEtToken }),
        (config = {
          withCredentials: true,
        })
      );
      if (status === 200) {
        if (localStorageGEtToken) {
          config.headers["Authorization"] = `Bearer ${localStorageGEtToken}`;
        }
        return axios(error.config);
      }
    }
    reflesh = false;
    return error;
  }

  // (config) => {
  //   if (localStorageGEtToken) {
  //     config.headers["Authorization"] = `Bearer ${localStorageGEtToken}`;
  //   }
  //   return config;
  // },
  // (error) => {
  //   return Promise.reject(error);
  // }
);

export default axios;
