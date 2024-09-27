import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { User } from "supertokens-web-js/lib/build/types";

interface AuthStoreState {
  user: User | null;
}

interface AuthStoreActions {
  setUser: (user: User) => void;
  resetUser: () => void;
}

const initialState: AuthStoreState = {
  user: null,
};

export const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setUser: (userToSet) => set(() => ({ user: userToSet })),
        resetUser: () => {
          set(initialState);
        },
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
