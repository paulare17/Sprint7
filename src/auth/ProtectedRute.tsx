import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirigeix a login i guarda la ruta original per tornar després
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
