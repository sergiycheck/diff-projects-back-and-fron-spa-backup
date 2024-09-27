import { Outlet, Link } from "react-router-dom";
import { useAuthStore } from "./store/auth.store";

export function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="container mx-auto">
      <header className="flex gap-4">
        <Link to="/">Home</Link>
        {!user && <Link to="/auth/login">Auth</Link>}
      </header>

      <Outlet />
    </div>
  );
}
