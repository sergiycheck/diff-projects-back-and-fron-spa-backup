import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { User } from "../features/auth/queries";

type AuthInfo = {
  accessToken: string;
};

interface AuthStoreState {
  authInfo: AuthInfo | null;
  user: User | null;
}

interface AuthStoreActions {
  setAuthInfo: (dto: AuthInfo) => void;
  resetAuthInfo: () => void;

  setUser: (dto: User) => void;
  resetUser: () => void;
}

const initialState: AuthStoreState = {
  authInfo: null,
  user: null,
};

export const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setAuthInfo: (authInfo) => set(() => ({ authInfo: authInfo })),
        resetAuthInfo: () => {
          set(initialState);
        },
        //
        setUser: (user) => set(() => ({ user: user })),
        resetUser: () => {
          set((state) => ({ ...state, user: null }));
        },
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
