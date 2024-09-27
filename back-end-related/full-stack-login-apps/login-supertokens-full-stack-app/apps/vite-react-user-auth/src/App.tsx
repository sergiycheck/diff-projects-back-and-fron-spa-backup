import { Outlet, Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import { useAuthStore } from "./store/auth.store";
import { Button } from "./ui/shared";
import Session from "supertokens-web-js/recipe/session";

export function Root() {
  return (
    <div className="container mx-auto">
      <header className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/auth">Auth</Link>
      </header>

      <Outlet />
    </div>
  );
}

export function Home() {
  const user = useAuthStore((state) => state.user);
  const resetUser = useAuthStore((state) => state.resetUser);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold underline">Home</h1>
      {user ? (
        <div className="flex flex-col gap-4">
          <p className="text-2xl">Logged in</p>

          {user?.emails.map((email) => {
            return <p key={email}>{email}</p>;
          })}
          <Button
            onClick={async () => {
              resetUser();
              await Session.signOut();
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}

export function ErrorPage() {
  const error = useRouteError() as unknown as { statusText: string; message: string };

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
