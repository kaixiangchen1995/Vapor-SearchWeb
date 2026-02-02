import axios from "axios";

const requestUnsplash = axios.create({
  baseURL: "https://api.unsplash.com/search",
  timeout: 10000,
});

// Request interceptor with retry logic
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

// Response interceptor with error handling
requestUnsplash.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 429) {
      console.error(
        "Still being rate limited after multiple attempts. Please try again later.",
      );
    } else if (!error.response) {
      console.error("Connection failed");
    }
    return Promise.reject(error);
  },
);

export default requestUnsplash;
