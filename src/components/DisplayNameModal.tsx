import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, X, Check } from 'lucide-react';
import { useUserStore } from '../context/store';

interface DisplayNameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DisplayNameModal({ isOpen, onClose }: DisplayNameModalProps) {
  const { setDisplayName } = useUserStore();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setDisplayName(name.trim().slice(0, 20));
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={handleSkip}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md glass-card rounded-[2.5rem] border border-border p-8 md:p-10 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <button 
                onClick={handleSkip}
                className="p-2 text-muted hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative z-10 space-y-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-solana-purple/10 flex items-center justify-center text-solana-purple mx-auto border border-solana-purple/20">
                  <User size={32} />
                </div>
                <h3 className="text-3xl font-black italic tracking-tighter text-foreground">Identity Profile</h3>
                <p className="text-muted text-sm font-medium">
                  Choose a display name for your secure session. This is optional and saved locally.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase font-mono text-muted mb-3 font-black tracking-widest block">Display Name</label>
                  <div className="relative">
                    <input 
                      type="text"
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Victor"
                      maxLength={20}
                      className="w-full bg-foreground/3 border border-border rounded-xl p-5 text-sm font-mono focus:outline-none focus:border-solana-purple/40 transition-all text-foreground"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted font-black opacity-30">
                      {name.length}/20
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button 
                    type="button"
                    onClick={handleSkip}
                    className="py-4 rounded-xl glass text-muted font-black uppercase tracking-[0.2em] text-[10px] hover:bg-foreground/5 transition-all"
                  >
                    Skip for now
                  </button>
                  <button 
                    type="submit"
                    disabled={!name.trim()}
                    className="py-4 rounded-xl bg-foreground text-background font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:scale-100 flex items-center justify-center gap-2"
                  >
                    <Check size={14} /> Set Identity
                  </button>
                </div>
              </form>
            </div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-solana-purple/5 blur-3xl -z-10 rounded-full" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
