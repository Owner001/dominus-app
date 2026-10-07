import { apiPost, apiGet } from "./client";
import type { SessionUser } from "@/types";

export type MobileAuthResponse = {
  token: string;
  user: SessionUser;
  expiresAt?: string;
};

export function exchangeDiscordCode(input: {
  code: string;
  redirectUri: string;
  codeVerifier?: string;
}) {
  return apiPost<MobileAuthResponse>("/api/auth/mobile/token", input);
}

export function fetchMe() {
  return apiGet<SessionUser>("/api/auth/me");
}

export function logoutRemote() {
  return apiPost<{ ok: boolean }>("/api/auth/logout").catch(() => ({ ok: true }));
}
