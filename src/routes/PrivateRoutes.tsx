import { FC, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import NoteDetails from "../views/noteDetails/NoteDetails";
import NotesDashboard from "../views/notesDashboard/NotesDashboard";
import { User } from "../context/userContext";
import UserDashboard from "../views/userDashboard/UserDashboard";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const PrivateRoutes: FC = () => {
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
      <Route path="/" element={<UserDashboard />} />
      <Route path="notes">
        <Route index element={<NotesDashboard />} />
        <Route path=":noteId" element={<NoteDetails />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
