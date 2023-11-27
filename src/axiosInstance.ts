import axios, { InternalAxiosRequestConfig } from "axios";

import { User } from "./context/userContext";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
  },
});

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const storedUser: string | null = localStorage.getItem("user");
    const user: User | null = storedUser ? JSON.parse(storedUser) : null;
    const token: string | null = user ? user.token : null;

    if (token) {
      const decodedToken: any = jwtDecode(token);

      // Check if the token is expired
      // Stupid JS
      // In a JWT (JSON Web Token), the expiration time (exp) is typically represented as the number of seconds since the Unix epoch (January 1, 1970, 00:00:00 UTC). This is known as a "Unix timestamp." JavaScript, on the other hand, represents time in milliseconds since the epoch. So, to compare the expiration time in the token (in seconds) with the current time in JavaScript (in milliseconds), you need to multiply the decodedToken.exp value by 1000 to convert it from seconds to milliseconds.
      if (decodedToken.exp * 1000 < Date.now()) {
        console.log("Token expired. Logging out...");
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
