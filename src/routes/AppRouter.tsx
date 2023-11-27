import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { FC } from "react";
import Layout from "../components/layout/Layout";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { useUserContext } from "../hooks/useUserContext";

export const AppRouter: FC = () => {
  const { user } = useUserContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {!!user ? (
            <Route path="/*" element={<PrivateRoutes />} />
          ) : (
            <Route path="/*" element={<PublicRoutes />} />
          )}
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
