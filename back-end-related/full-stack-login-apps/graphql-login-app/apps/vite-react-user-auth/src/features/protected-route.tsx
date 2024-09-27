import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
