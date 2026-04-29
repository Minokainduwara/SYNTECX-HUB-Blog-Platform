import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import * as authApi from "../api/authApi";
import type { AuthUser } from "../types";

type AuthContextValue = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function persistUser(user: AuthUser | null) {
  if (user) localStorage.setItem("user", JSON.stringify(user));
  else localStorage.removeItem("user");
}

export function AuthProvider({ children }: { children: ComponentChildren }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  const login = async (email: string, password: string) => {
    const next = await authApi.login({ email, password });
    persistUser(next);
    setUser(next);
  };

  const register = async (name: string, email: string, password: string) => {
    const next = await authApi.register({ name, email, password });
    persistUser(next);
    setUser(next);
  };

  const logout = () => {
    persistUser(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
