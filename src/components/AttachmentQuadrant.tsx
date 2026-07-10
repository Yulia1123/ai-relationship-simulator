import { motion } from 'framer-motion';
import type { LoveDna } from '@/types';

interface AttachmentQuadrantProps {
  loveDna: LoveDna;
  size?: number;
  className?: string;
}

export function AttachmentQuadrant({ loveDna, size = 260, className = '' }: AttachmentQuadrantProps) {
  const { anxiety, avoidance, type } = loveDna.attachment;
  const padding = 40;
  const plotSize = size - padding * 2;
  const x = (anxiety / 100) * plotSize;
  const y = plotSize - (avoidance / 100) * plotSize;

  const quadrantLabel =
    type === 'secure'
      ? '安全型'
      : type === 'anxious'
        ? '焦虑型'
        : type === 'avoidant'
          ? '回避型'
          : '恐惧型';

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="absolute inset-0">
          {/* background quadrants */}
          <rect x={padding} y={padding} width={plotSize / 2} height={plotSize / 2} fill="rgba(140,169,130,0.08)" />
          <rect x={padding + plotSize / 2} y={padding} width={plotSize / 2} height={plotSize / 2} fill="rgba(232,200,154,0.08)" />
          <rect x={padding} y={padding + plotSize / 2} width={plotSize / 2} height={plotSize / 2} fill="rgba(232,200,154,0.08)" />
          <rect
            x={padding + plotSize / 2}
            y={padding + plotSize / 2}
            width={plotSize / 2}
            height={plotSize / 2}
            fill="rgba(215,138,138,0.08)"
          />

          {/* axes */}
          <line
            x1={padding}
            y1={padding + plotSize / 2}
            x2={padding + plotSize}
            y2={padding + plotSize / 2}
            stroke="rgba(61,56,51,0.2)"
            strokeWidth={1.5}
          />
          <line
            x1={padding + plotSize / 2}
            y1={padding}
            x2={padding + plotSize / 2}
            y2={padding + plotSize}
            stroke="rgba(61,56,51,0.2)"
            strokeWidth={1.5}
          />

          {/* midpoint labels */}
          <text x={padding + plotSize / 2} y={padding - 10} textAnchor="middle" fontSize={11} fill="#6B5B5B">
            回避高
          </text>
          <text x={padding + plotSize / 2} y={padding + plotSize + 16} textAnchor="middle" fontSize={11} fill="#6B5B5B">
            回避低
          </text>
          <text x={padding - 8} y={padding + plotSize / 2 + 4} textAnchor="end" fontSize={11} fill="#6B5B5B">
            焦虑低
          </text>
          <text x={padding + plotSize + 8} y={padding + plotSize / 2 + 4} textAnchor="start" fontSize={11} fill="#6B5B5B">
            焦虑高
          </text>

          {/* user point */}
          <motion.circle
            cx={padding + x}
            cy={padding + y}
            r={6}
            fill="#D78A8A"
            stroke="#F7F3EE"
            strokeWidth={2}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />

          {/* dashed guide lines */}
          <motion.line
            x1={padding + x}
            y1={padding + y}
            x2={padding + x}
            y2={padding + plotSize / 2}
            stroke="rgba(215,138,138,0.4)"
            strokeWidth={1}
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          <motion.line
            x1={padding + x}
            y1={padding + y}
            x2={padding + plotSize / 2}
            y2={padding + y}
            stroke="rgba(215,138,138,0.4)"
            strokeWidth={1}
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </svg>

        {/* quadrant corner labels */}
        <div className="absolute top-2 left-2 text-[10px] text-dusk/50">安全</div>
        <div className="absolute top-2 right-2 text-[10px] text-dusk/50">焦虑</div>
        <div className="absolute bottom-2 left-2 text-[10px] text-dusk/50">回避</div>
        <div className="absolute bottom-2 right-2 text-[10px] text-dusk/50">恐惧</div>
      </div>

      {/* badge below svg */}
      <div className="mt-2 px-3 py-1 rounded-full bg-rose/10 text-rose text-xs font-medium whitespace-nowrap">
        {quadrantLabel}（焦虑{anxiety} · 回避{avoidance}）
      </div>
    </div>
  );
}
