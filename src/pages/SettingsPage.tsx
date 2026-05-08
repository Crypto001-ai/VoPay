import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon, 
  User, 
  Trash2, 
  LogOut, 
  ShieldCheck, 
  Key, 
  Bell, 
  Smartphone,
  ChevronRight,
  Check,
  Mic,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { useUserStore } from '../context/store';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function SettingsPage() {
  const { isConnected, displayName, setDisplayName, walletAddress, isVoiceEnabled, setVoiceEnabled } = useUserStore();
  const { disconnect } = useWallet();
  const navigate = useNavigate();
  
  const [newName, setNewName] = useState(displayName || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayName(newName.trim() || null);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDisconnect = async () => {
    await disconnect();
    navigate('/');
  };

  const shortenedAddress = walletAddress 
    ? `${walletAddress.slice(0, 10)}...${walletAddress.slice(-10)}`
    : 'Not Connected';

  return (
    <div className="min-h-screen p-6 md:p-10 pb-40">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-solana-purple">
            <SettingsIcon size={24} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] font-black">System Configuration</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic text-foreground leading-[0.9]">
            Security Settings
          </h2>
        </header>

        <div className="grid gap-8">
          
          {/* PROFILE SECTION */}
          <div className="glass-card rounded-[2.5rem] border border-border p-8 md:p-12 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center border border-border">
                <User size={24} className="text-muted" />
              </div>
              <div>
                <h3 className="text-2xl font-black italic tracking-tighter text-foreground">Identity Profile</h3>
                <p className="text-muted text-xs font-medium">Manage how you are identified within VoPay.</p>
              </div>
            </div>

            <form onSubmit={handleUpdateName} className="space-y-6 max-w-md">
              <div>
                <label className="text-[10px] uppercase font-mono text-muted mb-3 font-black tracking-widest block">Display Name</label>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <input 
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder={walletAddress ? 'Short address fallback' : 'Choose a name'}
                      maxLength={20}
                      className="w-full bg-foreground/3 border border-border rounded-xl p-4 text-sm font-mono focus:outline-none focus:border-solana-purple/40 transition-all text-foreground"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted font-black opacity-30">
                      {newName.length}/20
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="px-6 rounded-xl bg-foreground text-background font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    {isSaved ? <Check size={14} className="text-solana-green" /> : 'Save'}
                  </button>
                </div>
              </div>
            </form>

            <div className="pt-8 border-t border-border">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase text-muted tracking-widest font-black">Linked Wallet</p>
                    <p className="text-sm font-mono font-black text-foreground">{shortenedAddress}</p>
                  </div>
                  <button 
                    onClick={handleDisconnect}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                  >
                    <LogOut size={14} /> Disconnect
                  </button>
               </div>
            </div>
          </div>

          {/* VOICE SETTINGS SECTION */}
          <div className="glass-card rounded-[2.5rem] border border-border p-8 md:p-12 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-solana-purple/10 flex items-center justify-center border border-solana-purple/20">
                <Mic size={24} className="text-solana-purple" />
              </div>
              <div>
                <h3 className="text-2xl font-black italic tracking-tighter text-foreground">Voice Biometrics</h3>
                <p className="text-muted text-xs font-medium">Configure neural voice confirmation protocols.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 rounded-2xl bg-foreground/3 border border-border">
                <div className="space-y-1">
                  <p className="text-sm font-black italic text-foreground tracking-tight">Voice Confirmation</p>
                  <p className="text-[10px] text-muted font-medium">Require voice authorization for all outgoing transactions.</p>
                </div>
                <button 
                  onClick={() => setVoiceEnabled(!isVoiceEnabled)}
                  className={cn(
                    "w-14 h-7 rounded-full transition-all relative",
                    isVoiceEnabled ? "bg-solana-green" : "bg-border"
                  )}
                >
                  <motion.div 
                    animate={{ x: isVoiceEnabled ? 28 : 4 }}
                    className="absolute top-1 left-0 w-5 h-5 rounded-full bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-6 rounded-2xl bg-foreground/3 border border-border">
                <div className="space-y-1">
                  <p className="text-sm font-black italic text-foreground tracking-tight">Neural Voice Print</p>
                  <p className="text-[10px] text-muted font-medium">Re-calibrate your unique biometric voice signature.</p>
                </div>
                <button 
                  className="px-6 py-3 rounded-xl glass text-muted font-black uppercase tracking-[0.2em] text-[10px] hover:bg-foreground/5 transition-all flex items-center gap-2"
                >
                  <RotateCcw size={14} /> Re-record
                </button>
              </div>
            </div>
          </div>

          {/* DUMMY SETTINGS FOR PREMIUM FEEL */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card rounded-[2rem] border border-border p-8 space-y-6 opacity-40 grayscale pointer-events-none">
              <div className="flex items-center justify-between">
                <Bell size={24} className="text-muted" />
                <div className="w-10 h-5 bg-border rounded-full" />
              </div>
              <h4 className="font-black italic tracking-tighter text-xl">Real-time Alerts</h4>
              <p className="text-xs text-muted font-medium">Push notifications for high-risk incoming transactions.</p>
            </div>

            <div className="glass-card rounded-[2rem] border border-border p-8 space-y-6 opacity-40 grayscale pointer-events-none">
              <div className="flex items-center justify-between">
                <ShieldCheck size={24} className="text-muted" />
                <div className="w-10 h-5 bg-border rounded-full" />
              </div>
              <h4 className="font-black italic tracking-tighter text-xl">Double-Sign Barrier</h4>
              <p className="text-xs text-muted font-medium">Require manual confirmation of the simulation report.</p>
            </div>
          </div>

          {/* CLEAR DATA */}
          <div className="flex justify-center pt-8">
            <button 
              onClick={() => {
                localStorage.removeItem('vopay_display_name');
                setDisplayName(null);
                setNewName('');
              }}
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} className="opacity-50 group-hover:opacity-100" />
              Clear Local Session Data
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
