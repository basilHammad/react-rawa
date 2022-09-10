import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

const fetcher = axios.create({
  baseURL: "http://rawa.alisuboh.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

fetcher.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("userToken");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export default fetcher;
