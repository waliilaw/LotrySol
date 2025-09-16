import React, { useEffect, useState } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import {
    WalletProvider,
    ConnectionProvider,
    useWallet,
} from '@solana/wallet-adapter-react';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

const ConnectWallet: React.FC = () => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);
    const [wallets] = useState([
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
    ]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletButton />
            </WalletProvider>
        </ConnectionProvider>
    );
};

const WalletButton: React.FC = () => {
    const { connected, wallet, connect, disconnect } = useWallet();

    return (
        <div>
            {connected ? (
                <button onClick={disconnect}>
                    Disconnect {wallet?.adapter.name}
                </button>
            ) : (
                <button onClick={connect}>
                    Connect to Wallet
                </button>
            )}
        </div>
    );
};

export default ConnectWallet;