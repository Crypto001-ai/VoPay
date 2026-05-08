import { motion } from 'motion/react';
import { Share2, ExternalLink, AlertCircle, CheckCircle2, User, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { RiskBadge, RiskLevel } from './RiskBadge';
import { GlassCard } from './GlassCard';

interface TransactionDetailCardProps {
  sender: string;
  receiver: string;
  amount: string;
  fees: string;
  risk?: RiskLevel;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  className?: string;
}

export function TransactionDetailCard({
  sender,
  receiver,
  amount,
  fees,
  risk = 'low',
  isLoading = false,
  isError = false,
  errorMessage = 'Failed to load transaction details.',
  className,
}: TransactionDetailCardProps) {
  if (isLoading) {
    return (
      <GlassCard className={cn('p-8 space-y-6 animate-pulse', className)}>
        <div className="flex justify-between items-center">
          <div className="h-4 w-24 bg-white/10 rounded" />
          <div className="h-8 w-20 bg-white/10 rounded-full" />
        </div>
        <div className="space-y-4">
          <div className="h-10 w-full bg-white/5 rounded-xl" />
          <div className="h-10 w-full bg-white/5 rounded-xl" />
        </div>
        <div className="h-12 w-full bg-solana-gradient opacity-10 rounded-2xl" />
      </GlassCard>
    );
  }

  if (isError) {
    return (
      <GlassCard className={cn('p-8 border-red-500/20 bg-red-500/5 flex flex-col items-center text-center gap-4', className)}>
        <AlertCircle size={40} className="text-red-400" />
        <div>
          <h4 className="font-bold text-lg text-white">Analysis Failed</h4>
          <p className="text-sm text-white/50">{errorMessage}</p>
        </div>
        <button className="px-6 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
          Retry Scan
        </button>
      </GlassCard>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('relative', className)}
    >
      <div className="absolute -inset-0.5 bg-solana-gradient rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000" />
      <GlassCard className="relative p-8 overflow-hidden group">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <span className="text-[10px] uppercase text-white/40 tracking-[0.2em] font-mono block mb-1">Status Report</span>
            <h3 className="text-2xl font-bold italic tracking-tight">Security Detailed</h3>
          </div>
          <RiskBadge level={risk} />
        </div>

        {/* Transfer Logic */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center justify-between p-4 glass rounded-2xl bg-white/5 border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <User size={14} className="text-white/40" />
              </div>
              <div>
                <span className="text-[9px] uppercase text-white/30 font-mono block">Source</span>
                <span className="text-sm font-mono text-white/80">{sender}</span>
              </div>
            </div>
            <ArrowRight size={16} className="text-white/20" />
            <div className="flex items-center gap-3 text-right">
              <div>
                <span className="text-[9px] uppercase text-white/30 font-mono block">Destination</span>
                <span className="text-sm font-mono text-solana-green">{receiver}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-solana-green/10 flex items-center justify-center border border-solana-green/20">
                <CheckCircle2 size={14} className="text-solana-green" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 glass rounded-2xl border-white/5 bg-white/5">
              <span className="text-[9px] uppercase text-white/30 font-mono block mb-1">Asset Value</span>
              <p className="text-xl font-bold tracking-tight">{amount}</p>
            </div>
            <div className="p-4 glass rounded-2xl border-white/5 bg-white/5">
              <span className="text-[9px] uppercase text-white/30 font-mono block mb-1">Network Fees</span>
              <p className="text-xl font-mono text-solana-purple">{fees}</p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex gap-4">
            <button className="text-white/40 hover:text-white transition-colors cursor-pointer">
              <Share2 size={18} />
            </button>
            <button className="text-white/40 hover:text-white transition-colors cursor-pointer">
              <ExternalLink size={18} />
            </button>
          </div>
          <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
            Verified by VoPay Neural Engine
          </div>
        </div>

        {/* Neon Glow Accent */}
        <div className={cn(
          "absolute -bottom-12 -right-12 w-48 h-48 blur-[80px] rounded-full opacity-20 pointer-events-none",
          risk === 'low' ? 'bg-solana-green' : 'bg-solana-purple'
        )} />
      </GlassCard>
    </motion.div>
  );
}
