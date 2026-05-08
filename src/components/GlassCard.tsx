import { ReactNode } from 'react';
import { cn } from '../lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
}

export function GlassCard({ 
  children, 
  className, 
  variant = 'light',
  ...props 
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-2xl transition-all duration-300',
        variant === 'light' ? 'glass' : 'glass-dark',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
