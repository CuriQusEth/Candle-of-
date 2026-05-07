import { Flame, BookOpen, Trophy } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { motion } from 'framer-motion';

export function Navigation() {
  const { screen, setScreen } = useGameStore();

  const navItems = [
    { id: 'shrine' as const, icon: <Flame className="w-4 h-4 md:w-5 md:h-5" />, label: 'Shrine' },
    { id: 'codex' as const, icon: <BookOpen className="w-4 h-4 md:w-5 md:h-5" />, label: 'Codex' },
    { id: 'leaderboard' as const, icon: <Trophy className="w-4 h-4 md:w-5 md:h-5" />, label: 'Legends' },
  ];

  return (
    <div className="absolute bottom-20 md:bottom-24 inset-x-0 mx-auto w-max z-50 pointer-events-auto">
      <div className="flex items-center gap-2 p-2 rounded-none border border-white/5 bg-[#080705]/80 backdrop-blur-md">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`relative px-4 py-3 md:px-6 flex flex-col items-center gap-1 transition-colors ${
              screen === item.id ? 'text-[#D4AF37]' : 'text-white/40 hover:text-white/80'
            }`}
          >
            {screen === item.id && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-[#D4AF37]/10"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{item.icon}</span>
            <span className="text-[10px] uppercase tracking-widest relative z-10">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
