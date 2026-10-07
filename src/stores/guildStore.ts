import { create } from "zustand";
import type { GuildSummary } from "@/types";

type GuildState = {
  selected: GuildSummary | null;
  setSelected: (g: GuildSummary | null) => void;
};

export const useGuildStore = create<GuildState>((set) => ({
  selected: null,
  setSelected: (g) => set({ selected: g }),
}));
