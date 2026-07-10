import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ChoiceCardProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  index?: number;
}

export function ChoiceCard({ children, selected, onClick, className, index }: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 group',
        'bg-paper/80 hover:-translate-y-0.5 hover:shadow-pixel-sm',
        selected
          ? 'border-rose bg-gradient-to-r from-rose/5 to-rose/10 shadow-pixel-sm'
          : 'border-ink/10 hover:border-rose/40',
        className
      )}
    >
      {typeof index === 'number' ? (
        <span
          className={cn(
            'flex-shrink-0 w-6 h-6 rounded-lg text-xs font-display flex items-center justify-center mt-0.5 transition-colors',
            selected
              ? 'bg-rose text-paper'
              : 'bg-mist text-dusk/60 group-hover:bg-rose/10 group-hover:text-rose'
          )}
        >
          {String.fromCharCode(65 + index)}
        </span>
      ) : (
        <span
          className={cn(
            'flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 transition-colors duration-200 flex items-center justify-center',
            selected ? 'border-rose bg-rose' : 'border-ink/20 group-hover:border-rose/40'
          )}
        >
          {selected && <span className="w-2 h-2 rounded-full bg-paper" />}
        </span>
      )}
      <span className="flex-1 pt-0.5">{children}</span>
    </button>
  );
}
