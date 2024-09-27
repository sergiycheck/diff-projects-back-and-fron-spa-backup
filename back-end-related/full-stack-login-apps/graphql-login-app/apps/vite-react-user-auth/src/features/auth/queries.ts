import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($getUserInput: GetUserInput!) {
    getUser(getUserInput: $getUserInput) {
      createdAt
      email
      id
      name
      updatedAt
    }
  }
`;

export type User = {
  createdAt: Date;
  email: string;
  id: number;
  name: string;
  updatedAt: Date;
};

export type GetUserQueryResponse = {
  getUser: User;
};
