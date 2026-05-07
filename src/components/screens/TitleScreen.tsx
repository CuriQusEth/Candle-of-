import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

export function TitleScreen() {
  const { setScreen } = useGameStore();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-30 bg-[#050403]/80 backdrop-blur-md"
    >
      <div className="text-center max-w-lg px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-[0.2em] uppercase text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] mb-4">
            Candle<br/>
            <span className="text-xl md:text-3xl text-[#e0d8cf] uppercase tracking-[0.4em]">of Forgotten Names</span>
          </h1>
          <p className="font-serif italic text-white/50 text-lg mb-12">
            You are the last Keeper. Light the flames. Remember the souls.
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen('shrine')}
          className="px-10 py-4 border border-[#D4AF37] text-[#D4AF37] uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-[#050403] transition-all duration-300"
        >
          Commence Ritual
        </motion.button>
      </div>
    </motion.div>
  );
}
