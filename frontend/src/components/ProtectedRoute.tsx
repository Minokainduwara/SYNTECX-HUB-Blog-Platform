import { Navigate, useLocation } from "react-router-dom";
import type { ComponentChildren } from "preact";
import { useAuth } from "../state/AuthContext";

export function ProtectedRoute({ children }: { children: ComponentChildren }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user)
    return <Navigate to="/login" replace state={{ from: location }} />;
  return <>{children}</>;
}
