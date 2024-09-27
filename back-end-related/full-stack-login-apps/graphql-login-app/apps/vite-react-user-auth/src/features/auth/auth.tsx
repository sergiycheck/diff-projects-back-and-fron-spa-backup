import { Link, Outlet, useLocation } from "react-router-dom";

export function Authentication() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/auth/login";
  const isRegisterPage = location.pathname === "/auth/register";

  return (
    <div className="container">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold underline">Authentication</h1>
        <Outlet />

        <div className="flex flex-row gap-2 justify-center">
          {isRegisterPage && <Link to="/auth/login">Login</Link>}
          {isLoginPage && <Link to="/auth/register">Register</Link>}
        </div>
      </div>
    </div>
  );
}
