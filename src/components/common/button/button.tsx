import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          {
            'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-md hover:shadow-lg hover:shadow-brand-500/25 focus-visible:ring-brand-500 border border-transparent hover:-translate-y-0.5': variant === 'primary',
            'bg-white text-gray-900 border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow focus-visible:ring-gray-500': variant === 'secondary',
            'bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md hover:shadow-red-500/20 focus-visible:ring-red-600 hover:-translate-y-0.5': variant === 'danger',
            'bg-transparent hover:bg-brand-50 text-gray-700 focus-visible:ring-brand-500': variant === 'ghost',
            'border border-gray-200 bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white focus-visible:ring-brand-500': variant === 'outline',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 py-2': size === 'md',
            'h-12 px-8 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
