import axios, { AxiosError, type AxiosInstance } from "axios";
import { API_URL } from "@/constants/config";
import { clearSession, getToken } from "@/auth/session";
import type { ApiErrorBody } from "@/types";

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(status: number, message: string, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20_000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<ApiErrorBody>) => {
    const status = error.response?.status ?? 0;
    const data = error.response?.data;
    const message = data?.error || data?.message || error.message || "Erro de rede";
    if (status === 401) await clearSession();
    throw new ApiError(status, message, data?.code);
  }
);

export async function apiGet<T>(path: string): Promise<T> {
  const { data } = await api.get<T>(path);
  return data;
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const { data } = await api.patch<T>(path, body);
  return data;
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const { data } = await api.post<T>(path, body);
  return data;
}
