import { create } from 'zustand';

export type Candle = {
  id: string;
  x: number;
  y: number;
  color: string;
  isLit: boolean;
  burnTime: number;
  maxBurnTime: number;
  memoryRevealed: boolean;
};

export type SoulMemory = {
  id: string;
  name: string;
  story: string;
  color: string;
  timestamp: number;
};

interface GameState {
  screen: 'title' | 'shrine' | 'codex' | 'leaderboard' | 'atelier';
  setScreen: (screen: 'title' | 'shrine' | 'codex' | 'leaderboard' | 'atelier') => void;
  
  memoryShards: number;
  addMemoryShards: (amount: number) => void;
  
  candles: Candle[];
  placeCandle: (x: number, y: number, color: string) => void;
  lightCandle: (id: string) => void;
  burnCandles: (deltaTime: number) => void;
  
  rememberedSouls: SoulMemory[];
  revealMemory: (candleId: string, memory: SoulMemory) => void;
  
  shrineLevel: number;
  upgradeShrine: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  screen: 'title',
  setScreen: (screen) => set({ screen }),
  
  memoryShards: 0,
  addMemoryShards: (amount) => set((state) => ({ memoryShards: state.memoryShards + amount })),
  
  candles: [],
  placeCandle: (x, y, color) => set((state) => ({
    candles: [...state.candles, {
      id: Math.random().toString(36).substring(7),
      x, y, color, isLit: false, burnTime: 0, maxBurnTime: 60000 + Math.random() * 30000, memoryRevealed: false
    }]
  })),
  lightCandle: (id) => set((state) => ({
    candles: state.candles.map(c => c.id === id ? { ...c, isLit: true } : c)
  })),
  burnCandles: (deltaTime) => set((state) => {
    let memoryShardsGained = 0;
    const nextCandles = state.candles.map(c => {
      if (!c.isLit) return c;
      const newBurnTime = c.burnTime + deltaTime;
      if (Math.random() < 0.05) memoryShardsGained++; // Passive shard generation while burning
      return { ...c, burnTime: newBurnTime };
    }).filter(c => c.burnTime < c.maxBurnTime); // Remove fully burned candles

    return { 
      candles: nextCandles,
      memoryShards: state.memoryShards + memoryShardsGained
    };
  }),
  
  rememberedSouls: [],
  revealMemory: (candleId, memory) => set((state) => ({
    candles: state.candles.map(c => c.id === candleId ? { ...c, memoryRevealed: true } : c),
    rememberedSouls: [...state.rememberedSouls, memory]
  })),
  
  shrineLevel: 1,
  upgradeShrine: () => set((state) => ({ shrineLevel: state.shrineLevel + 1 }))
}));
