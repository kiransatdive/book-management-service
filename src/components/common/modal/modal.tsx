import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../button/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/20 p-4 backdrop-blur-md transition-opacity">
      <div 
        className={cn(
          "relative w-full max-w-lg rounded-2xl border border-white/60 bg-white/85 p-6 shadow-2xl backdrop-blur-xl animate-fade-in-up",
          className
        )}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};
