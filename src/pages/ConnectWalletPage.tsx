import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Fingerprint, ChevronRight, CheckCircle2, AlertCircle, Link as LinkIcon, Info } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { useUserStore } from '../context/store';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';
import { cn } from '../lib/utils';

export default function ConnectWalletPage() {
  const { connected, publicKey, select, connect, wallet: currentWallet, disconnect, connecting, wallets: adapterWallets } = useWallet();
  const navigate = useNavigate();

  const walletMetas = [
    { 
      id: 'Phantom' as WalletName, 
      name: 'Phantom',
      description: 'The premier Solana wallet experience',
      recommended: true,
      installUrl: 'https://phantom.app/',
      icon: 'https://raw.githubusercontent.com/phantom/phantom-wallet-adapter/main/packages/wallets/phantom/src/phantom.svg'
    },
    { 
      id: 'Solflare' as WalletName, 
      name: 'Solflare',
      description: 'Full-featured power user wallet',
      recommended: false,
      installUrl: 'https://solflare.com/',
      icon: 'https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/solflare/src/solflare.svg'
    }
  ];

  const handleWalletAction = async (walletId: WalletName, readyState: string, installUrl: string) => {
    if (readyState === 'NotDetected') {
      window.open(installUrl, '_blank');
      return;
    }
    
    try {
      select(walletId);
      // Standard wallet-adapter behavior handles this, but explicit connect 
      // ensures the popup is triggered immediately on all browsers.
      setTimeout(() => {
        connect().catch(err => {
          if (err.name !== 'WalletConnectionError' && err.message !== 'User rejected the request.') {
            console.error('Wallet connection failed:', err);
          }
        });
      }, 50);
    } catch (e) {
      console.error('Failed to select wallet:', e);
    }
  };

  const shortenedAddress = publicKey 
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : '';

  return (
    <div className="min-h-screen pt-32 pb-40 px-6 flex flex-col items-center justify-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-solana-purple/10 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-md w-full text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-16 h-16 bg-solana-gradient rounded-2xl mx-auto mb-8 rotate-12 flex items-center justify-center shadow-2xl shadow-solana-green/20 relative"
        >
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-pulse" />
          <Fingerprint className="text-black relative z-10" size={32} />
        </motion.div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solana-purple/10 border border-solana-purple/20 text-solana-purple text-[10px] font-bold uppercase tracking-widest mb-6">
          <Info size={12} /> Network: Devnet
        </div>

        <h2 className="text-4xl font-black mb-4 tracking-tighter italic text-foreground">Connect Wallet</h2>
        <p className="text-muted leading-relaxed text-sm font-medium">
          Select a provider to enable transaction safety simulations and AI analysis.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg space-y-4 px-4"
      >
        <AnimatePresence mode="wait">
          {!connected ? (
            <motion.div
              key="wallets"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {walletMetas.map((meta, idx) => {
                const adapterWallet = adapterWallets.find(w => w.adapter.name === meta.id);
                const isDetected = adapterWallet?.readyState !== 'NotDetected';
                const icon = adapterWallet?.adapter.icon || (meta.id === 'Phantom' ? 'https://phantom.app/favicon.ico' : 'https://solflare.com/favicon.ico');

                return (
                  <motion.div
                    key={meta.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div 
                      className={cn(
                        "p-5 cursor-pointer glass-card rounded-2xl border border-border group transition-all relative overflow-hidden",
                        isDetected ? "hover:border-solana-green/40" : "hover:border-red-500/20"
                      )}
                      onClick={() => handleWalletAction(meta.id, adapterWallet?.readyState || 'NotDetected', meta.installUrl)}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-5">
                          <div className={cn(
                            "w-12 h-12 rounded-xl p-2.5 flex items-center justify-center border border-border transition-all",
                            isDetected ? "bg-foreground/5 group-hover:border-solana-green/20" : "bg-red-500/5 group-hover:border-red-500/20"
                          )}>
                            <img src={icon} alt={meta.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <h4 className="font-black text-foreground italic tracking-tight">{meta.name}</h4>
                              {meta.recommended && isDetected && (
                                <span className="text-[8px] bg-solana-green/10 text-solana-green px-1.5 py-0.5 rounded border border-solana-green/20 uppercase font-black tracking-widest">Rec</span>
                              )}
                              {!isDetected && (
                                <span className="text-[8px] bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded border border-red-500/20 uppercase font-black tracking-widest">Not Detected</span>
                              )}
                            </div>
                            <p className="text-muted text-xs font-mono font-medium">
                              {!isDetected ? `${meta.name} wallet not detected` : meta.description}
                            </p>
                          </div>
                        </div>
                        <div className={cn(
                          "px-4 py-2 rounded-xl glass border border-border text-[10px] font-black uppercase tracking-widest transition-all",
                          !isDetected 
                            ? "hover:bg-red-500 hover:text-white hover:border-red-500" 
                            : "group-hover:bg-solana-green group-hover:text-black group-hover:border-solana-green"
                        )}>
                          {connecting && currentWallet?.adapter.name === meta.id ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            !isDetected ? 'Install' : 'Connect'
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="connected"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-6"
            >
              <div className="p-8 glass-card rounded-[2.5rem] border border-solana-green/30 glow-green text-center space-y-6">
                <div className="w-20 h-20 bg-solana-green/10 rounded-3xl mx-auto flex items-center justify-center border border-solana-green/20">
                  <CheckCircle2 className="text-solana-green" size={40} />
                </div>
                <div>
                  <h3 className="text-3xl font-black mb-2 italic text-foreground tracking-tighter">
                    {useUserStore.getState().displayName ? `Welcome, ${useUserStore.getState().displayName}` : 'Linked & Secured'}
                  </h3>
                  <p className="text-muted font-mono text-xs tracking-widest uppercase font-black">{shortenedAddress}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    onClick={() => disconnect()}
                    className="flex-1 py-4 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-foreground/5 transition-all text-muted"
                  >
                    Disconnect
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex-[2] py-4 rounded-xl bg-solana-green text-black font-black uppercase tracking-widest text-[10px] shadow-lg shadow-solana-green/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    Enter Safety System
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-12 text-center">
          <div className="inline-flex flex-col items-center gap-4">
             <div className="flex items-center gap-2 opacity-50">
                <ShieldCheck size={14} className="text-solana-green" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-black text-muted">Neural Mesh Active</span>
             </div>
             <p className="text-muted/30 text-[9px] max-w-[240px] leading-relaxed font-medium">
               By connecting, you agree to the real-time simulation of transaction payloads via VoPay Neural Engine.
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
