import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

interface GradientButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'solana' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function GradientButton({
  children,
  className,
  variant = 'solana',
  size = 'md',
  fullWidth = false,
  ...props
}: GradientButtonProps) {
  const variants = {
    solana: 'bg-solana-gradient text-black font-semibold hover:opacity-90 active:scale-95 shadow-[0_0_20px_-5px_rgba(20,241,149,0.5)]',
    outline: 'border border-white/20 hover:bg-white/10 active:scale-95',
    ghost: 'hover:bg-white/5 active:scale-95 text-white/70 hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
  };

  return (
    <motion.button
      className={cn(
        'inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
