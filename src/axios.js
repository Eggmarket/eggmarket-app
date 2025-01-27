import { useToken } from "./components/hook/useToken/useToken";

const { default: axios } = require("axios");

export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EGG_MARKET,
  timeout: 1000,
  headers: { "Content-Type": "Application/json", Accept: "Application/json" },
});

// Add a request interceptor
Axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.set(
      "Authorization",
      JSON.parse(localStorage.getItem("token"))
    );
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
Axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // return Promise.reject(error);
    return error.response;
  }
);
