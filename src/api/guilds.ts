import { apiGet, apiPatch } from "./client";
import type { GuildConfig, GuildSummary, ModuleState, PremiumStatus } from "@/types";

export function listGuilds() {
  return apiGet<GuildSummary[]>("/api/guilds");
}

export function getGuildConfig(guildId: string) {
  return apiGet<GuildConfig>(`/api/guilds/${guildId}`);
}

export function updateModule(guildId: string, moduleName: string, patch: Partial<ModuleState>) {
  return apiPatch<GuildConfig>(`/api/guilds/${guildId}/modules/${moduleName}`, patch);
}

export function getPremium(guildId: string) {
  return apiGet<PremiumStatus>(`/api/guilds/${guildId}/premium`);
}

export function getStats(guildId: string, params?: Record<string, string | number>) {
  const q = params
    ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString()
    : "";
  return apiGet<Record<string, unknown>>(`/api/guilds/${guildId}/stats${q}`);
}
