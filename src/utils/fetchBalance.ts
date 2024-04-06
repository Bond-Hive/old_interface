import { Connection, PublicKey } from '@solana/web3.js';

export const fetchWalletBalance = async (connection: Connection, walletAddress: string): Promise<number> => {
    const walletPublicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(walletPublicKey);
    return balance / Math.pow(10, 9); // Convert lamports to SOL
};
