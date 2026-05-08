import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { useUserStore } from './store';

export function WalletSync() {
  const { publicKey, connected, disconnect } = useWallet();
  const { setConnection } = useUserStore();

  useEffect(() => {
    if (connected && publicKey) {
      setConnection(true, publicKey.toBase58());
    } else {
      setConnection(false, null);
    }
  }, [connected, publicKey, setConnection]);

  return null;
}
