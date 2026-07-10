import { motion } from 'framer-motion';

interface BeliefAxisProps {
  value: number;
  className?: string;
}

export function BeliefAxis({ value, className = '' }: BeliefAxisProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const label = clamped >= 70 ? '成长观' : clamped <= 30 ? '宿命观' : '中间态';
  const color = clamped >= 70 ? 'text-moss' : clamped <= 30 ? 'text-rose' : 'text-amber-700';

  return (
    <div className={`${className}`}>
      <div className="relative h-3 bg-gradient-to-r from-rose/30 via-amber/20 to-moss/30 rounded-full">
        <div className="absolute inset-0 flex justify-between px-1">
          {[0, 25, 50, 75, 100].map((tick) => (
            <div
              key={tick}
              className="w-px h-full bg-paper/60"
              style={{ marginLeft: tick === 0 ? 0 : undefined }}
            />
          ))}
        </div>
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-ink border-2 border-paper shadow-md"
          initial={{ left: '0%' }}
          animate={{ left: `calc(${clamped}% - 8px)` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between text-xs text-dusk/60 mt-2">
        <span>宿命（0）</span>
        <span className={`font-medium ${color}`}>
          {label} · {clamped}
        </span>
        <span>成长（100）</span>
      </div>
    </div>
  );
}
