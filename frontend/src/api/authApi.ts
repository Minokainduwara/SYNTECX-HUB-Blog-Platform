import type { AuthUser } from "../types";
import API from "./axios";

export async function login(body: {
  email: string;
  password: string;
}): Promise<AuthUser> {
  const { data } = await API.post<AuthUser>("/api/auth/login", body);
  return data;
}

export async function register(body: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthUser> {
  const { data } = await API.post<AuthUser>("/api/auth/register", body);
  return data;
}
