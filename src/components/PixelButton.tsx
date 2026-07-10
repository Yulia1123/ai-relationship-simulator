import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

export function PixelButton({
  variant = 'primary',
  className,
  children,
  ...props
}: PixelButtonProps) {
  return (
    <button
      className={cn(
        variant === 'primary' ? 'pixel-btn' : 'pixel-btn-secondary',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
