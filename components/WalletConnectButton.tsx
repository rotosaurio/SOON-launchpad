'use client'

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletConnectButton = () => {
  const { wallet } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Conectar Wallet
      </button>
    );
  }

  return (
    <WalletMultiButton className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {wallet ? 'Conectado' : 'Conectar Wallet'}
    </WalletMultiButton>
  );
};

export default WalletConnectButton;