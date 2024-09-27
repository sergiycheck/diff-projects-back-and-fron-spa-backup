
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class GetUserInput {
    id?: Nullable<number>;
    name?: Nullable<string>;
    email?: Nullable<string>;
}

export class LoginUserInput {
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class RegisterUserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class User {
    __typename?: 'User';
    id: number;
    name?: Nullable<string>;
    email?: Nullable<string>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class AuthInfo {
    __typename?: 'AuthInfo';
    accessToken?: Nullable<string>;
}

export class LoginResponse {
    __typename?: 'LoginResponse';
    user?: Nullable<User>;
    authInfo?: Nullable<AuthInfo>;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract getUser(getUserInput: GetUserInput): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract registerUser(registerUserInput: RegisterUserInput): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;

    abstract loginUser(loginUserInput: LoginUserInput): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;
}

type Nullable<T> = T | null;
