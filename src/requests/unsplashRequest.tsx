import axios from "axios";

const requestUnsplash = axios.create({
  baseURL: "https://api.unsplash.com/search",
  timeout: 5000,
});

requestUnsplash.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =
      "Client-ID a96WsWgL3LDZ28WvTBVv3CFKlfkX9VqgcCN_6voY7ik";
    return config;
  },
  (error) => {
    console.log("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

requestUnsplash.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (!error.response) {
      console.log("Connection failed. Please check your internet.");
    }
    return Promise.reject(error);
  },
);

export default requestUnsplash;
