import { create } from "zustand";
import { setToken } from "../../lib/api/client";
import type { UserProfile } from "./types";

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  setSession: (token: string, user: UserProfile | null) => void;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("blogapp_token"),
  user: null,
  setSession: (token, user) => {
    setToken(token);
    set({ token, user });
  },
  setUser: (user) => set({ user }),
  logout: () => {
    setToken(null);
    set({ token: null, user: null });
  },
}));
