import { motion } from 'motion/react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Zap, 
  Info, 
  AlertTriangle,
  History,
  Copy,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { RiskBadge } from '../components/RiskBadge';
import { useTransactionStore } from '../context/store';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function AnalysisPage() {
  const { currentAnalysis, setAnalysis } = useTransactionStore();
  const navigate = useNavigate();

  if (!currentAnalysis) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="p-10 text-center max-w-md space-y-6 glass-card rounded-[2.5rem]">
          <div className="w-16 h-16 bg-foreground/5 border border-border rounded-full flex items-center justify-center mx-auto">
            <History className="text-muted" size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight italic text-foreground">No Active Analysis</h2>
            <p className="text-muted text-sm mt-2 font-medium">Initialize a transaction via the assistant to view AI safety insights.</p>
          </div>
          <button 
            onClick={() => navigate('/assistant')}
            className="w-full py-4 rounded-xl bg-solana-purple text-black font-black uppercase tracking-widest text-[10px] shadow-lg shadow-solana-purple/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            Go to Assistant
          </button>
        </div>
      </div>
    );
  }

  const { recipient, transaction, riskScore, summary, alerts, threats } = currentAnalysis;

  return (
    <div className="min-h-screen pt-24 pb-40 px-6 md:px-10 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-10 group">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground/5 transition-all text-muted hover:text-foreground"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-black tracking-tighter italic text-foreground leading-[0.9]">Security Audit</h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted font-black">Payload Simulation Protocol v4.2</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Card: Transaction Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 space-y-8 glass-card rounded-[2.5rem] border-solana-purple/20">
            <div className="flex justify-between items-start">
              <p className="text-[10px] uppercase font-mono text-muted tracking-widest font-black">Target Payload</p>
              <RiskBadge level={riskScore} />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-foreground/5 rounded-xl flex items-center justify-center border border-border">
                  <span className="text-xl font-black italic text-foreground">{recipient.name[0]}</span>
                </div>
                <div>
                  <h4 className="font-black text-lg text-foreground italic tracking-tight">{recipient.name}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-muted font-mono font-black">
                    <span className="truncate max-w-[120px] opacity-70">{recipient.address}</span>
                    <Copy size={10} className="cursor-pointer hover:text-foreground transition-colors" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-muted text-xs font-black uppercase tracking-widest">Amount</span>
                  <span className="text-2xl font-black italic text-foreground">{transaction.amount} <span className="text-xs text-muted font-black">{transaction.token}</span></span>
                </div>
                <div className="flex justify-between text-[11px] font-mono font-black">
                  <span className="text-muted uppercase tracking-widest">Network Fee</span>
                  <span className="text-solana-green">{transaction.fee} SOL</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono font-black">
                  <span className="text-muted uppercase tracking-widest">Confirmation</span>
                  <span className="text-foreground flex items-center gap-1.5 uppercase">
                    <Zap size={10} className="text-solana-purple" /> {transaction.speed}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 glass-card rounded-2xl border-border bg-solana-gradient/[0.02] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Shield size={24} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <ShieldCheck size={12} className="text-solana-green" /> 
              VoPay Verified
            </p>
            <p className="text-[11px] text-muted leading-relaxed font-bold italic">
              Verification node check complete. The target address is cross-referenced with your history and public malicious address registries.
            </p>
          </div>
        </div>

        {/* Right Section: AI Explanation & Alerts */}
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-6">
            <h3 className="text-xl font-black italic tracking-tighter flex items-center gap-3 text-foreground">
              <Zap size={20} className="text-solana-green" />
              AI Intelligence Suite
            </h3>
            
            <div className="p-8 md:p-10 glass-card rounded-[2.5rem] border-solana-green/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-solana-green/5 blur-3xl -z-10" />
               <p className="text-lg text-foreground font-black leading-relaxed italic mb-8">
                 "{summary}"
               </p>
               
               <div className="grid sm:grid-cols-2 gap-4">
                 {threats.map((threat, i) => (
                   <div key={i} className="flex items-center gap-3 bg-foreground/3 p-4 rounded-2xl border border-border">
                     <div className="w-2 h-2 rounded-full bg-solana-green shadow-[0_0_10px_rgba(20,241,149,0.5)]" />
                     <span className="text-[10px] font-mono font-black uppercase tracking-widest text-muted">{threat}</span>
                   </div>
                 ))}
               </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-black italic tracking-tighter flex items-center gap-3 text-foreground">
              <ShieldAlert size={20} className="text-solana-purple" />
              Security Alerts
            </h3>

            <div className="space-y-4">
              {alerts.length > 0 ? (
                alerts.map((alert, i) => (
                  <div key={i} className={cn(
                    "p-6 flex gap-5 items-start glass-card rounded-2xl border transition-all",
                    alert.type === 'error' ? "border-red-500/20 bg-red-500/[0.03]" : "border-border"
                  )}>
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border",
                      alert.type === 'error' ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-foreground/5 text-muted border-border"
                    )}>
                      {alert.type === 'error' ? <AlertTriangle size={20} /> : <Info size={20} />}
                    </div>
                    <div>
                      <p className={cn(
                        "text-sm font-black tracking-tighter mb-1 italic uppercase tracking-wider",
                        alert.type === 'error' ? "text-red-500" : "text-foreground"
                      )}>{alert.type === 'error' ? 'Critical Security Logic' : 'Heuristic Notice'}</p>
                      <p className="text-xs text-muted leading-relaxed italic font-bold">"{alert.message}"</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-16 text-center border-2 border-dashed border-border rounded-[2.5rem] bg-foreground/[0.01]">
                  <ShieldCheck size={40} className="text-solana-green/20 mx-auto mb-4" />
                  <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted font-black opacity-30">No Threat Vectors Detected</p>
                </div>
              )}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-5 pt-8">
            <button 
              onClick={() => {
                setAnalysis(null);
                navigate(-1);
              }}
              className="flex-1 py-5 rounded-2xl glass text-muted font-black uppercase tracking-widest text-[10px] hover:bg-foreground/5 transition-all"
            >
              Discard Payload
            </button>
            <button 
              onClick={() => navigate('/confirm')}
              className="flex-[2] py-5 rounded-2xl bg-foreground text-background font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              Initiate Secure signing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
