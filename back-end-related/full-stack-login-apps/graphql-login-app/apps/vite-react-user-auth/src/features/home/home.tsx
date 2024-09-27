import { useAuthStore } from "../../store/auth.store";
import { Button } from "ui-kit";
import { useQuery } from "@apollo/client";
import { GET_USER, GetUserQueryResponse } from "../auth/queries";
import React from "react";

export function Home() {
  const resetAuthInfo = useAuthStore((state) => state.resetAuthInfo);
  const user = useAuthStore((state) => state.user);

  const { client, loading, data, error } = useQuery<GetUserQueryResponse>(GET_USER, {
    variables: {
      getUserInput: {
        email: user?.email || "",
      },
    },
    fetchPolicy: "network-only",
    skip: !user,
  });

  const getUser = data?.getUser;

  React.useEffect(() => {
    if (error && error.message === "Unauthorized") {
      resetAuthInfo();
    }
  }, [error, resetAuthInfo]);

  const signOutHandler = async () => {
    resetAuthInfo();
    await client.resetStore();
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold underline">Home</h1>

      <div className="flex flex-col gap-4">
        {loading && <p className="text-2xl">Loading...</p>}

        {getUser ? (
          <>
            <p className="text-2xl">Logged in</p>
            <p className="text-xl">email: {getUser.email}</p>
            <p className="text-xl">name: {getUser.name}</p>

            <Button onClick={signOutHandler}>Logout</Button>
          </>
        ) : (
          <p className="text-2xl">Not logged in</p>
        )}
      </div>
    </div>
  );
}
