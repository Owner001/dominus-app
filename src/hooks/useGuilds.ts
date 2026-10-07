import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as guildsApi from "@/api/guilds";
import type { ModuleState } from "@/types";

export function useGuilds() {
  return useQuery({
    queryKey: ["guilds"],
    queryFn: guildsApi.listGuilds,
    staleTime: 60_000,
  });
}

export function useGuildConfig(guildId: string) {
  return useQuery({
    queryKey: ["guild", guildId, "config"],
    queryFn: () => guildsApi.getGuildConfig(guildId),
    enabled: Boolean(guildId),
  });
}

export function useGuildPremium(guildId: string) {
  return useQuery({
    queryKey: ["guild", guildId, "premium"],
    queryFn: () => guildsApi.getPremium(guildId),
    enabled: Boolean(guildId),
  });
}

export function useUpdateModule(guildId: string, moduleName: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<ModuleState>) => guildsApi.updateModule(guildId, moduleName, patch),
    onSuccess: (data) => {
      qc.setQueryData(["guild", guildId, "config"], data);
    },
  });
}
