interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div className={`w-full h-2 bg-mist rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-rose to-amber transition-all duration-700 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
