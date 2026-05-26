import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../../lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning';
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all duration-200',
          {
            'bg-gray-900 text-gray-50 shadow-sm': variant === 'default',
            'bg-brand-100 text-brand-800 border border-brand-200 shadow-sm': variant === 'secondary',
            'border border-gray-200 text-gray-950 bg-white/50 backdrop-blur-sm': variant === 'outline',
            'bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm': variant === 'success',
            'bg-amber-100 text-amber-800 border border-amber-200 shadow-sm': variant === 'warning',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
