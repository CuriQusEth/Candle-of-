import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { TitleScreen } from '../screens/TitleScreen';
import { LeaderboardScreen } from '../screens/LeaderboardScreen';
import { CodexScreen } from '../screens/CodexScreen';
import { ShrineCanvas } from '../canvas/ShrineCanvas';
import { Navigation } from './Navigation';
import { WalletConnect } from './WalletConnect';

export function GameLayout() {
  const { screen, memoryShards, rememberedSouls } = useGameStore();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050403] text-[#e0d8cf] font-serif">
      
      {/* Atmospheric Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff4e00] opacity-10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#0a0805] to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent)]"></div>
      </div>

      {/* Background layer (always renders canvas but pointer events are conditional) */}
      <div className={`absolute inset-0 z-10 ${screen === 'shrine' ? 'pointer-events-auto' : 'pointer-events-none opacity-50 blur-sm'}`}>
        <ShrineCanvas />
      </div>

      {/* Header */}
      <header className="relative z-40 flex justify-between items-center px-4 md:px-10 py-6 border-b border-white/5 backdrop-blur-md pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="w-8 h-8 md:w-10 md:h-10 border border-[#D4AF37] flex items-center justify-center rotate-45 shrink-0">
            <div className="w-2 h-2 bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"></div>
          </div>
          <div>
            <h1 className="text-sm md:text-xl tracking-[0.2em] uppercase font-light text-[#D4AF37]">Candle of Forgotten Names</h1>
            <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/40">Keeper of Names • Ritual Stage II</p>
          </div>
        </div>
        <div className="flex items-center gap-8 pointer-events-auto">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] uppercase tracking-widest text-white/40">Shrine Connectivity</p>
            <p className="text-xs font-mono text-[#4ade80]">BASE MAINNET ACTIVE</p>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Screen Routing */}
      <AnimatePresence mode="wait">
        {screen === 'title' && <TitleScreen key="title" />}
        {screen === 'leaderboard' && <LeaderboardScreen key="leaderboard" />}
        {screen === 'codex' && <CodexScreen key="codex" />}
      </AnimatePresence>

      {/* Bottom Nav */}
      {screen !== 'title' && (
        <Navigation />
      )}

      {/* Footer Bar */}
      <footer className="absolute bottom-0 inset-x-0 z-40 h-12 md:h-16 border-t border-white/5 bg-[#080705]/80 flex items-center justify-between px-4 md:px-10 pointer-events-none">
        <div className="flex gap-4 md:gap-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/30 uppercase tracking-widest hidden sm:inline">Memory Shards:</span>
            <span className="text-xs md:text-sm font-mono text-[#D4AF37]">{memoryShards}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/30 uppercase tracking-widest hidden sm:inline">Souls Remembered:</span>
            <span className="text-xs md:text-sm font-mono text-[#D4AF37]">{rememberedSouls.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4 text-[8px] md:text-[10px] font-mono text-white/20">
          <span className="hidden sm:inline">APP_ID: 693ee23ad19763ca26ddc2d4</span>
          <span className="hidden sm:inline">|</span>
          <span>BUILDER: bc_ekawyf65</span>
        </div>
      </footer>
    </div>
  );
}
