import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Buffer } from 'buffer';

// Solana wallet-adapter and web3.js often require Buffer and process to be defined globally
window.Buffer = Buffer;
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: {} };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
