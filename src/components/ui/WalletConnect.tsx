import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function WalletConnect() {
  const { address, isConnecting } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnecting) {
    return (
      <button className="px-4 py-2 border border-white/10 bg-white/5 rounded-full flex items-center gap-3 text-xs font-mono">
        <Loader2 className="w-3 h-3 animate-spin text-[#D4AF37]" />
        Connecting...
      </button>
    );
  }

  if (address) {
    return (
      <button 
        onClick={() => disconnect()}
        className="px-4 py-2 border border-white/10 bg-white/5 rounded-full flex items-center gap-3 hover:border-[#D4AF37]/50 transition-colors pointer-events-auto"
      >
        <div className="w-2 h-2 rounded-full bg-[#ff4e00] animate-pulse shadow-[0_0_8px_#ff4e00]"></div>
        <span className="text-xs font-mono">{address.slice(0, 6)}...{address.slice(-4)}</span>
      </button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => connect({ connector: injected() })}
      className="px-4 py-2 border border-[#D4AF37] text-[#D4AF37] uppercase tracking-widest text-[10px] hover:bg-[#D4AF37] hover:text-black transition-all pointer-events-auto"
    >
      Connect Base
    </motion.button>
  );
}
