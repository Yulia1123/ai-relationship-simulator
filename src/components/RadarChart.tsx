import { motion } from 'framer-motion';

interface RadarSeries {
  key: string;
  values: Record<string, number>;
  fill?: string;
  stroke?: string;
}

interface RadarChartProps {
  labels: Record<string, string>;
  series: RadarSeries[];
  size?: number;
  className?: string;
  highlightKey?: string;
}

const defaultPalette = [
  { fill: 'rgba(215, 138, 138, 0.25)', stroke: '#D78A8A' },
  { fill: 'rgba(140, 169, 130, 0.25)', stroke: '#8CA982' },
];

export function RadarChart({
  labels,
  series,
  size = 320,
  className = '',
  highlightKey,
}: RadarChartProps) {
  const keys = Object.keys(labels);
  const count = keys.length;
  const center = size / 2;
  const radius = size * 0.34;
  const levels = 4;

  const getPoint = (idx: number, r: number) => {
    const angle = (Math.PI * 2 * idx) / count - Math.PI / 2;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ maxWidth: '100%' }}
    >
      {/* grid levels */}
      {Array.from({ length: levels }).map((_, i) => {
        const r = (radius * (i + 1)) / levels;
        const levelPoints = keys.map((_, idx) => getPoint(idx, r));
        const d = levelPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(61, 56, 51, 0.12)"
            strokeWidth={1}
            strokeDasharray={i === levels - 1 ? undefined : '2 2'}
          />
        );
      })}

      {/* axes */}
      {keys.map((_, idx) => {
        const p = getPoint(idx, radius);
        return (
          <line
            key={idx}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="rgba(61, 56, 51, 0.12)"
            strokeWidth={1}
          />
        );
      })}

      {/* data series */}
      {series.map((s, sIdx) => {
        const palette = defaultPalette[sIdx % defaultPalette.length];
        const fill = s.fill ?? palette.fill;
        const stroke = s.stroke ?? palette.stroke;
        const points = keys.map((key, idx) => {
          const value = Math.max(0, Math.min(100, s.values[key] ?? 0));
          return getPoint(idx, (value / 100) * radius);
        });
        const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

        return (
          <g key={s.key}>
            <motion.path
              d={path}
              fill={fill}
              stroke={stroke}
              strokeWidth={2.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: sIdx * 0.15 }}
            />
            {points.map((p, idx) => (
              <motion.circle
                key={idx}
                cx={p.x}
                cy={p.y}
                r={3.5}
                fill={stroke}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + sIdx * 0.15 + idx * 0.04 }}
              />
            ))}
          </g>
        );
      })}

      {/* labels */}
      {keys.map((key, idx) => {
        const p = getPoint(idx, radius + 26);
        const isHighlight = key === highlightKey;
        return (
          <text
            key={key}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={isHighlight ? '#D78A8A' : '#6B5B5B'}
            fontSize={isHighlight ? 13 : 12}
            fontWeight={isHighlight ? 700 : 500}
          >
            {labels[key]}
          </text>
        );
      })}
    </svg>
  );
}
