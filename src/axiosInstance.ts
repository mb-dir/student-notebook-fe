import axios, { InternalAxiosRequestConfig } from "axios";

import { User } from "./context/userContext";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
  },
});

// Set the AUTH token for any request
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const storedUser: string | null = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;
  const token: string | null = user ? user.token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default axiosInstance;
