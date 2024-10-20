import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletConnectButton = () => {
  const { wallet } = useWallet();

  return (
    <WalletMultiButton className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {wallet ? 'Conectado' : 'Conectar Wallet'}
    </WalletMultiButton>
  );
};

export default WalletConnectButton;

