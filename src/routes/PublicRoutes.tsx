import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "../views/homepage/Homepage";
import Login from "../views/login/Login";
import Register from "../views/register/Register";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* custom 404 here */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
