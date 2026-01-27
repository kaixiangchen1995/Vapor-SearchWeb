import axios from "axios";

const requestHn = axios.create({
  baseURL: "https://hn.algolia.com/api/v1",
  timeout: 5000,
});

requestHn.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    //Request fail
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

requestHn.interceptors.response.use((response) => {
  return response.data.hits;
},
(error) => {
    if(!error.response){
        console.log('Connection failed. Please check your internet.'); 
    }
    return Promise.reject(error)
});

export default requestHn