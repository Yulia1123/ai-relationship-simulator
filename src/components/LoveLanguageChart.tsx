import { motion } from 'framer-motion';
import type { LoveDna } from '@/types';
import { LOVE_LANGUAGE_LABELS } from '@/data/archetypes';

interface LoveLanguageChartProps {
  loveDna: LoveDna;
  className?: string;
}

const keys = ['words', 'time', 'gifts', 'acts', 'touch'] as const;

export function LoveLanguageChart({ loveDna, className = '' }: LoveLanguageChartProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {keys.map((key, idx) => {
        const need = loveDna.need[key];
        const expr = loveDna.expression[key];
        const label = LOVE_LANGUAGE_LABELS[key];
        return (
          <div key={key} className="grid grid-cols-[3rem_1fr] gap-3 items-center">
            <span className="text-sm font-medium text-ink text-right">{label}</span>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-8 text-dusk/70">需求</span>
                <div className="flex-1 h-2.5 bg-mist rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-rose"
                    initial={{ width: 0 }}
                    animate={{ width: `${need}%` }}
                    transition={{ duration: 0.7, delay: idx * 0.06, ease: 'easeOut' }}
                  />
                </div>
                <span className="w-7 text-right text-rose font-medium">{need}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-8 text-dusk/70">表达</span>
                <div className="flex-1 h-2.5 bg-mist rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-moss"
                    initial={{ width: 0 }}
                    animate={{ width: `${expr}%` }}
                    transition={{ duration: 0.7, delay: 0.1 + idx * 0.06, ease: 'easeOut' }}
                  />
                </div>
                <span className="w-7 text-right text-moss font-medium">{expr}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
