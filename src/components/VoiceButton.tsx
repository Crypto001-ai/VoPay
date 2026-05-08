import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '../lib/utils';

interface VoiceButtonProps {
  isRecording: boolean;
  onClick: () => void;
  className?: string;
}

export function VoiceButton({ isRecording, onClick, className }: VoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group',
        isRecording ? 'bg-red-500/20' : 'bg-solana-purple/20',
        className
      )}
    >
      {/* Pulse rings */}
      <AnimatePresence>
        {isRecording && (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 rounded-full bg-red-500/30"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className="absolute inset-0 rounded-full bg-red-500/20"
            />
          </>
        )}
      </AnimatePresence>

      <div className={cn(
        'relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl',
        isRecording ? 'bg-red-500 shadow-red-500/40' : 'bg-solana-purple shadow-solana-purple/40 group-hover:bg-solana-purple/90'
      )}>
        {isRecording ? (
          <MicOff className="text-white fill-white" size={32} />
        ) : (
          <Mic className="text-white fill-white" size={32} />
        )}
      </div>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors">
        {isRecording ? 'Tap to Stop' : 'Hold to Speak'}
      </div>
    </button>
  );
}
