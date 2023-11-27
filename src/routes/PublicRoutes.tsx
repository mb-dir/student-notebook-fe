import { FC, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import Homepage from "../views/homepage/Homepage";
import Login from "../views/login/Login";
import Register from "../views/register/Register";
import { User } from "../context/userContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const PublicRoutes: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser: string | null = localStorage.getItem("user");
    const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;
    const token: string | null = parsedUser ? parsedUser.token : null;

    if (token) {
      const decodedToken: any = jwtDecode(token);

      // Check if the token is expired
      // Stupid JS
      // In a JWT (JSON Web Token), the expiration time (exp) is typically represented as the number of seconds since the Unix epoch (January 1, 1970, 00:00:00 UTC). This is known as a "Unix timestamp." JavaScript, on the other hand, represents time in milliseconds since the epoch. So, to compare the expiration time in the token (in seconds) with the current time in JavaScript (in milliseconds), you need to multiply the decodedToken.exp value by 1000 to convert it from seconds to milliseconds.
      if (decodedToken.exp * 1000 < Date.now()) {
        console.log("Będzie jazdaa");
        localStorage.removeItem("user");
        toast.info("Your session has expired, please log in again.");
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
