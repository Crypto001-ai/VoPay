import { cn } from '../lib/utils';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export type RiskLevel = 'low' | 'medium' | 'high';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const styles = {
    low: {
      bg: 'bg-green-500/10',
      text: 'text-green-400',
      icon: CheckCircle2,
      label: 'Safe',
      border: 'border-green-500/20'
    },
    medium: {
      bg: 'bg-yellow-500/10',
      text: 'text-yellow-400',
      icon: AlertTriangle,
      label: 'Warning',
      border: 'border-yellow-500/20'
    },
    high: {
      bg: 'bg-red-500/10',
      text: 'text-red-400',
      icon: ShieldAlert,
      label: 'High Risk',
      border: 'border-red-500/20'
    }
  };

  const { bg, text, icon: Icon, label, border } = styles[level];

  return (
    <div className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md',
      bg, text, border, className
    )}>
      <Icon size={14} />
      {label}
    </div>
  );
}
