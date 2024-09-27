import { gql } from "@apollo/client";
import { User } from "./queries";

export const REGISTER_USER = gql`
  mutation Mutation($registerUserInput: RegisterUserInput!) {
    registerUser(registerUserInput: $registerUserInput) {
      authInfo {
        accessToken
      }
      user {
        createdAt
        email
        id
        name
        updatedAt
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Mutation($loginUserInput: LoginUserInput!) {
    loginUser(loginUserInput: $loginUserInput) {
      authInfo {
        accessToken
      }
      user {
        createdAt
        email
        id
        name
        updatedAt
      }
    }
  }
`;

export type LoginOrRegisterData = {
  authInfo: {
    accessToken: string;
  };
  user: User;
};

export type LoginUserMutationResponse = {
  loginUser: LoginOrRegisterData;
};

export type RegisterUserMutationResponse = {
  registerUser: LoginOrRegisterData;
};
