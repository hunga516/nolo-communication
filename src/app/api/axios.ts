import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

export default axiosInstance;