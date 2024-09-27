import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://[::1]:3203/graphql",
});

const authLink = setContext((_, { headers }) => {
  const authInfoJson = localStorage.getItem("auth-storage");

  const authInfoState = authInfoJson ? JSON.parse(authInfoJson) : null;

  const accessToken = authInfoState?.state.authInfo?.accessToken;

  return {
    headers: {
      ...headers,
      Authorization: authInfoState ? `Bearer ${accessToken}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
