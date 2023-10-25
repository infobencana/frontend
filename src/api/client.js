import axios from "axios";
import Cookies from "js-cookie";
import { getToken } from "@/utils/auth";

const client = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT_URI,
});

const token = getToken();
if (token) client.defaults.headers.common["Authorization"] = `Bearer ${token}`;

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const response = error?.response;

    if (response) {
      const { status, data } = error.response;
      const isMatch = /authentication|failed|expired/i.test(
        data?.message.toLowerCase(),
      );

      if (status === 401 && isMatch) {
        const url = encodeURI(window.location.href);

        alert("Failed ! session is expired");
        Cookies.remove("token");
        window.location.replace(`/auth/login?redirect=${url}`);
      }
    } else {
      error.response = {
        message: error.message,
      };
    }

    return Promise.reject(error);
  },
);

export { client };
