import axios from "axios";
import axiosRetry from "axios-retry";

const requestHn = axios.create({
  baseURL: "https://hn.algolia.com/api/v1",
  timeout: 10000,
});

// Retry logic by using axios-retry plugin
axiosRetry(requestHn, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    //1. Retry logic for network issues or idempotent failures
    const isIdempotent = axiosRetry.isNetworkOrIdempotentRequestError(error);
    //2. special handel for 429 (rate limit)
    const isRateLimit = error.response?.status === 429;
    return isIdempotent || isRateLimit;
  },
  shouldResetTimeout: true,
});

// Request interceptor
requestHn.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor with error handling
requestHn.interceptors.response.use(
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

export default requestHn;
