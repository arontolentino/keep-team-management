import axios from 'axios';
import axiosRetry from 'axios-retry';

const api = () => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
  });

  return client;
};

export default api;
