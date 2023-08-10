import { Navigate, Route, Routes } from "react-router-dom";
import UserDashboard from "../components/userDashboard/UserDashboard";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      {/* Custom 404 */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
};
