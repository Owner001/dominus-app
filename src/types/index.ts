export type SessionUser = {
  id: string;
  username: string;
  globalName?: string | null;
  discriminator?: string;
  avatar: string | null;
  email?: string | null;
};

export type GuildSummary = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  botPresent: boolean;
  premium?: { active: boolean; plan?: string | null; expiresAt?: string | null } | null;
};

export type GuildConfig = {
  guildId: string;
  modules?: Record<string, ModuleState>;
  premium?: { active?: boolean; plan?: string | null; expiresAt?: string | null };
};

export type ModuleState = { enabled?: boolean; [key: string]: unknown };

export type PremiumStatus = { active: boolean; plan: string | null; expiresAt: string | null };

export type ApiErrorBody = { error?: string; code?: string; message?: string };
