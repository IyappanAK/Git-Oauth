import { message } from "antd";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

export const setupAxiosInterceptor = (navigate) => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      //Handle Invalid Token Error
      const handleInvalidToken = () => {
        const statusCode = error.response.status;

        if (statusCode === 401) {
          message.error({
            content: "Token Expired...!",
          });
          localStorage.removeItem("token");
          navigate("/login");
        }
      };
      //Handle Unauthorized Error
      const handleUnauthorize = () => {
        const statusCode = error.response.status;
        if (statusCode === 403) navigate("/error403");
      };

      //Handle 500 Error

      const handleError500 = () => {
        const statusCode = error.response.status;
        if (statusCode === 500) {
          navigate("/page500");
        }
      };

      return Promise.reject(error);
    }
  );
};
