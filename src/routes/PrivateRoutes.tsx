import { Navigate, Route, Routes } from "react-router-dom";

import { FC } from "react";
import NoteDetails from "../views/noteDetails/NoteDetails";
import NotesDashboard from "../views/notesDashboard/NotesDashboard";
import UserDashboard from "../views/userDashboard/UserDashboard";

export const PrivateRoutes: FC = () => {
  // Right now we check token only when there is request, we need to do that on each route, cuz when user left the app on page where there is no communication with api, we cannot check if token expired or not
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
