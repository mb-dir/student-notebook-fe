import { Navigate, Route, Routes } from "react-router-dom";

import { FC } from "react";
import NotesDashboard from "../views/notesDashboard/NotesDashboard";
import UserDashboard from "../views/userDashboard/UserDashboard";

export const PrivateRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/notes" element={<NotesDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
