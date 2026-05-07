import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { encodeSayGM } from '../../lib/erc8021/attribution';

export function CodexScreen() {
  const { rememberedSouls } = useGameStore();
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleRecordOnChain = async (soul: any) => {
    if (!address) {
      alert("Please connect your Base wallet to record this memorial on-chain.");
      return;
    }
    try {
      // Mocking SIWE + record
      const message = `I, ${address}, bear witness to the soul of ${soul.name}.\n\nTimestamp: ${Date.now()}\nNonce: ${Math.random()}`;
      const signature = await signMessageAsync({ message });
      
      // Simulate attribution / smart contract interaction
      const calldata = encodeSayGM(address);
      console.log('Sending transaction with ERC-8021 attribution:', calldata);
      
      // Mock succcess
      setTxHash('0x' + Math.random().toString(16).slice(2) + '... (Mocked Tx)');
      alert(`Memorial successfully recorded on-chain!\nBuilder Attribution Applied.`);
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute inset-0 pt-28 pb-40 px-4 md:px-6 overflow-y-auto pointer-events-auto z-30"
    >
      <div className="max-w-2xl mx-auto bg-[#080705]/95 p-8 border border-white/5">
        <h2 className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-6 flex items-center gap-2">
          <span className="w-4 h-px bg-[#D4AF37]"></span>
          Memorial Codex
        </h2>

        {rememberedSouls.length === 0 ? (
          <div className="text-center py-20 text-white/40 font-serif italic">
            No memories have surfaced yet. Light more candles in the Shrine.
          </div>
        ) : (
          <div className="space-y-6">
            {rememberedSouls.map((soul) => (
              <motion.div 
                key={soul.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 border border-white/5 bg-gradient-to-br from-white/5 to-transparent rounded-none"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg italic text-[#e0d8cf] group-hover:text-[#D4AF37] transition-colors">{soul.name}</h3>
                  <span className="text-[10px] text-white/30 uppercase font-mono">
                    {new Date(soul.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed italic mb-6">"{soul.story}"</p>
                
                <button 
                  onClick={() => handleRecordOnChain(soul)}
                  className="w-full sm:w-auto px-4 py-2 border border-[#D4AF37]/50 text-[#D4AF37] uppercase tracking-widest text-[10px] hover:bg-[#D4AF37] hover:text-[#050403] transition-all duration-300"
                >
                  Record Memorial On-Chain
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
