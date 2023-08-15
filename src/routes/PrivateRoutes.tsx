import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserDashboard from "../components/userDashboard/UserDashboard";
import Logout from "../components/logout/Logout";

export const PrivateRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
