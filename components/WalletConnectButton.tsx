'use client'

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import React from 'react';

const WalletConnectButton = () => {
  const { wallet } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full">
        Select Wallet
      </button>
    );
  }

  return (
    <WalletMultiButton className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full">
      {wallet && wallet.adapter.publicKey
        ? `${wallet.adapter.publicKey.toString().slice(0, 4)}...${wallet.adapter.publicKey.toString().slice(-4)}`
        : 'Select Wallet'}
    </WalletMultiButton>
  );
};

export default WalletConnectButton;
