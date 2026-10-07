import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};

export const API_URL = (
  process.env.EXPO_PUBLIC_API_URL ||
  (extra as { apiUrl?: string }).apiUrl ||
  "https://dominuspainel.discloud.app"
).replace(/\/$/, "");

export const DISCORD_CLIENT_ID =
  process.env.EXPO_PUBLIC_DISCORD_CLIENT_ID ||
  (extra as { discordClientId?: string }).discordClientId ||
  "";

export const DISCORD_REDIRECT_URI =
  process.env.EXPO_PUBLIC_DISCORD_REDIRECT_URI || "dominusapp://auth/callback";

export const BOT_INVITE_URL =
  process.env.EXPO_PUBLIC_BOT_INVITE_URL ||
  "https://discord.com/oauth2/authorize?client_id=1356446229550071979&scope=bot%20applications.commands&permissions=8";

export const DISCORD_SCOPES = ["identify", "guilds"] as const;
