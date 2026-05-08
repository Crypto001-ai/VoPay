import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, ExternalLink, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-20 px-6 md:px-12 border-t border-border mt-auto relative z-10 bg-background/50 backdrop-blur-sm transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-solana-gradient rounded-lg rotate-12 flex items-center justify-center shadow-lg shadow-solana-purple/20">
              <span className="text-black font-black text-xs">V</span>
            </div>
            <span className="text-2xl font-black italic tracking-tighter">VoPay</span>
          </div>
          <p className="text-muted text-sm leading-relaxed font-medium">
            Open-source security infrastructure for the Solana ecosystem. 
            Translating machine-level transactions into human-readable actions.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 border border-border rounded-lg text-muted hover:text-foreground hover:bg-foreground/5 transition-all">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 border border-border rounded-lg text-muted hover:text-foreground hover:bg-foreground/5 transition-all">
              <Github size={18} />
            </a>
            <a href="#" className="p-2 border border-border rounded-lg text-muted hover:text-foreground hover:bg-foreground/5 transition-all">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 sm:gap-20">
          <div className="space-y-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-solana-purple" />
              Platform
            </h4>
            <ul className="space-y-3 text-sm font-medium text-muted">
              <li><Link to="/assistant" className="hover:text-solana-green transition-colors">AI Assistant</Link></li>
              <li><Link to="/dashboard" className="hover:text-solana-green transition-colors">Dashboard</Link></li>
              <li><Link to="/history" className="hover:text-solana-green transition-colors">Tx History</Link></li>
              <li><Link to="/settings" className="hover:text-solana-green transition-colors">Security Setup</Link></li>
            </ul>
          </div>
          <div className="space-y-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-solana-green" />
              Resources
            </h4>
            <ul className="space-y-3 text-sm font-medium text-muted">
              <li><a href="#" className="hover:text-solana-green transition-colors flex items-center gap-1">Docs <ExternalLink size={10} /></a></li>
              <li><a href="#" className="hover:text-solana-green transition-colors">Solana Ecosystem</a></li>
              <li><a href="#" className="hover:text-solana-green transition-colors">API Keys</a></li>
              <li><a href="#" className="hover:text-solana-green transition-colors">Bug Bounty</a></li>
            </ul>
          </div>
          <div className="space-y-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-white" />
              Legal
            </h4>
            <ul className="space-y-3 text-sm font-medium text-muted">
              <li><a href="#" className="hover:text-solana-green transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-solana-green transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-solana-green transition-colors">Audit Reports</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-6 text-[10px] uppercase font-black tracking-[0.2em] text-muted/30">
        <div>© 2026 VOPAY PROTOCOL • SECURING THE SPEED OF LIGHT</div>
        <div className="flex gap-8">
            <span>Powered by Solana</span>
            <span>Audited by AI</span>
        </div>
      </div>
    </footer>
  );
}
