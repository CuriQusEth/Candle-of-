import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

export function LeaderboardScreen() {
  const { memoryShards } = useGameStore();

  const mockLegends = [
    { rank: 1, address: '0x1A2b...3c4D', souls: 142, shards: 8900 },
    { rank: 2, address: '0x8f9e...1a2B', souls: 110, shards: 7200 },
    { rank: 3, address: '0x5D6c...9e8F', souls: 95, shards: 6100 },
    { rank: 4, address: '0x3x4Y...2a1B', souls: 88, shards: 5500 },
    { rank: 5, address: '0x0a1B...2c3D', souls: 42, shards: 2200 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute inset-0 pt-28 pb-40 px-4 md:px-6 overflow-y-auto pointer-events-auto z-30 flex justify-center"
    >
      <div className="w-full max-w-lg bg-[#080705]/95 p-8 border border-white/5 h-max">
        <h2 className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-6 flex items-center justify-between gap-2">
          Kindest Keepers
          <span className="flex-1 max-w-[40px] h-px bg-[#D4AF37]"></span>
        </h2>
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-8 text-center sm:text-left">
          The deepest rememberers on the Base Network.
        </p>

        <div className="space-y-4">
          {mockLegends.map((legend) => (
            <div 
              key={legend.rank} 
              className="flex justify-between items-center group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className={`text-[10px] ${legend.rank <= 3 ? 'text-[#D4AF37]' : 'text-white/20'}`}>
                  {legend.rank.toString().padStart(2, '0')}
                </span>
                <span className="text-sm italic font-serif text-white/90">{legend.address}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-mono text-[#D4AF37]">{legend.souls} Souls</span>
                <span className="text-[10px] font-mono text-white/40">{legend.shards} Shards</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-4 border border-white/10 bg-gradient-to-br from-white/5 to-transparent rounded-none text-center">
            <h3 className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-2">Your Impact</h3>
            <p className="text-xs text-white/50 italic mb-4">You have collected {memoryShards} Memory Shards. Burn more candles to rise through the ranks.</p>
            <button 
              onClick={() => {
                alert("ERC-8004 Trustless Agent Delegated: Attempting on-chain score submission...\n\nTransaction attributed to Builder: bc_ekawyf65");
              }}
              className="w-full py-4 bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-colors flex flex-col items-center gap-1 group">
              <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Submit Score (Trustless Agent)</span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">Say GM</span>
            </button>
        </div>
      </div>
    </motion.div>
  );
}
