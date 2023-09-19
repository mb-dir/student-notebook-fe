import { Navigate, Route, Routes } from "react-router-dom";

import { FC } from "react";
import NoteDetails from "../views/noteDetails/NoteDetails";
import NotesDashboard from "../views/notesDashboard/NotesDashboard";
import UserDashboard from "../views/userDashboard/UserDashboard";

export const PrivateRoutes: FC = () => {
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
