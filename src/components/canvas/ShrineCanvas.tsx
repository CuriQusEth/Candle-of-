import { useEffect, useRef, useState } from 'react';
import { useGameStore, Candle } from '../../store/gameStore';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  type: 'ember' | 'wax' | 'soul';

  constructor(x: number, y: number, color: string, type: 'ember' | 'wax' | 'soul') {
    this.x = x;
    this.y = y;
    this.type = type;
    this.color = color;
    
    if (type === 'ember') {
      this.vx = (Math.random() - 0.5) * 1;
      this.vy = -(Math.random() * 1.5 + 0.5);
      this.maxLife = Math.random() * 60 + 30;
      this.size = Math.random() * 2 + 0.5;
    } else if (type === 'soul') {
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = -(Math.random() * 2 + 1);
      this.maxLife = Math.random() * 100 + 60;
      this.size = Math.random() * 3 + 1;
    } else {
      // Wax
      this.vx = 0;
      this.vy = Math.random() * 0.5 + 0.2;
      this.maxLife = Math.random() * 30 + 10;
      this.size = Math.random() * 1.5 + 1;
    }
    
    this.life = this.maxLife;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    
    if (this.type === 'ember') {
      this.vx += (Math.random() - 0.5) * 0.2; // flutter
    } else if (this.type === 'soul') {
      this.x += Math.sin(this.life * 0.1) * 0.5;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const opacity = this.life / this.maxLife;
    ctx.globalAlpha = opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export function ShrineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { candles, placeCandle, lightCandle, burnCandles, revealMemory } = useGameStore();
  const [isPressing, setIsPressing] = useState(false);
  const [pressPos, setPressPos] = useState<{x: number, y: number} | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(performance.now());
  const reqRef = useRef<number>(0);

  // Names pool for mocking
  const namesPool = ['Elara', 'Thorne', 'Lysander', 'Orian', 'Seraphina', 'Kaelen', 'Vyra', 'Solas'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const loop = (time: number) => {
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;
      
      // Update store state (throttle somewhat)
      burnCandles(dt);
      
      // Check for memories
      candles.forEach(candle => {
        if (candle.isLit && candle.burnTime > 5000 && !candle.memoryRevealed) {
          const name = namesPool[Math.floor(Math.random() * namesPool.length)];
          revealMemory(candle.id, {
            id: candle.id,
            name,
            story: `A forgotten soul who loved the rain.`,
            color: candle.color,
            timestamp: Date.now()
          });
          
          // Spawn soul particles
          for (let i=0; i<15; i++) {
            particlesRef.current.push(new Particle(candle.x, candle.y - 20, '#60a5fa', 'soul'));
          }
        }
      });

      // Clear & draw transparently so CSS backgrounds from GameLayout show through
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw candles
      candles.forEach(candle => {
        // Body base
        const height = 40 - (30 * (candle.burnTime / candle.maxBurnTime)); // Melt
        ctx.fillStyle = '#f2e6d5'; // Sleek theme candle wax
        ctx.fillRect(candle.x - 6, candle.y - height, 12, height);
        
        // shadow/base
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.beginPath();
        ctx.ellipse(candle.x, candle.y, 10, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        if (candle.isLit) {
          // Glow
          const gradient = ctx.createRadialGradient(candle.x, candle.y - height - 10, 0, candle.x, candle.y - height - 10, 100);
          gradient.addColorStop(0, 'rgba(255, 78, 0, 0.3)'); // Theme orange glow
          gradient.addColorStop(1, 'rgba(255, 78, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(candle.x, candle.y - height - 10, 100, 0, Math.PI * 2);
          ctx.fill();

          // Flame center
          ctx.fillStyle = '#ffcc00';
          ctx.beginPath();
          ctx.ellipse(candle.x, candle.y - height - 8, 3, 6, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Spawn particles
          if (Math.random() < 0.1) {
            particlesRef.current.push(new Particle(candle.x, candle.y - height - 10, '#ff4e00', 'ember'));
          }
          if (Math.random() < 0.02) {
            particlesRef.current.push(new Particle(candle.x + (Math.random() * 10 - 5), candle.y - height, '#f2e6d5', 'wax'));
          }
          
          if (candle.memoryRevealed) {
             ctx.fillStyle = 'rgba(212, 175, 55, 0.9)'; // #D4AF37
             ctx.font = '12px "Cinzel", serif';
             ctx.textAlign = 'center';
             // Find name if possible
             ctx.fillText('Ascended', candle.x, candle.y + 20); 
          }
        } else {
             // Unlit wick
             ctx.fillStyle = '#1a1510';
             ctx.fillRect(candle.x - 1, candle.y - height - 4, 2, 4);
        }
      });
      
      // Draw press indicator
      if (isPressing && pressPos) {
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pressPos.x, pressPos.y, 20 + Math.sin(time * 0.01) * 5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Update & Draw particles
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      particlesRef.current.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      reqRef.current = requestAnimationFrame(loop);
    };

    reqRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(reqRef.current);
    };
  }, [candles, isPressing, pressPos, burnCandles, revealMemory]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsPressing(true);
    setPressPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsPressing(false);
    setPressPos(null);
    
    // Check if we hit an unlit candle to light it
    const hitCandle = candles.find(c => {
      const dx = c.x - e.clientX;
      const dy = (c.y - 20) - e.clientY; // rough height target
      return Math.sqrt(dx*dx + dy*dy) < 30;
    });

    if (hitCandle && !hitCandle.isLit) {
      lightCandle(hitCandle.id);
      for (let i=0; i<5; i++) {
        particlesRef.current.push(new Particle(hitCandle.x, hitCandle.y - 20, '#f59e0b', 'ember'));
      }
      return;
    }

    // Place a new candle if no hit
    if (!hitCandle) {
       placeCandle(e.clientX, e.clientY, '#f59e0b');
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPressing) {
      setPressPos({ x: e.clientX, y: e.clientY });
      
      // Auto light candles while dragging
      const hitCandle = candles.find(c => {
        const dx = c.x - e.clientX;
        const dy = (c.y - 20) - e.clientY;
        return !c.isLit && Math.sqrt(dx*dx + dy*dy) < 30;
      });
      if (hitCandle) {
        lightCandle(hitCandle.id);
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full cursor-crosshair touch-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerUp}
    />
  );
}
