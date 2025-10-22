// contexts/AuthContext.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { type User } from "firebase/auth";

export interface AuthContextType {
  createNewUser: (email: string, password: string) => Promise<any>;
  user: User | null;
  setUser: (user: User | null) => void;
  googleSignIn: () => Promise<any>;
  logOut: () => void;
  userLogin: (email: string, password: string) => Promise<any>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
