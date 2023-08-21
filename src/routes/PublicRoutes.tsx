import { Navigate, Route, Routes } from "react-router-dom";

import { FC } from "react";
import Homepage from "../views/homepage/Homepage";
import Login from "../views/login/Login";
import Register from "../views/register/Register";

export const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
