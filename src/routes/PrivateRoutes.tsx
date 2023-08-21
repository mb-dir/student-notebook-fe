import { Navigate, Route, Routes } from "react-router-dom";

import { FC } from "react";
import Logout from "../components/logout/Logout";
import UserDashboard from "../components/userDashboard/UserDashboard";

export const PrivateRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
