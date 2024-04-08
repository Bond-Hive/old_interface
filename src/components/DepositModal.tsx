import React, { useState, Fragment, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, Token } from '@solana/spl-token';
import { Button } from '@/components/ui/button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessModal: React.FC<{ isOpen: boolean, txHash: string, onClose: () => void }> = ({ isOpen, txHash, onClose }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-70" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-card p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-card-foreground">
                                    Transaction Successful ✅
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-card-foreground">
                                        Transaction hash:
                                    </p>
                                    <div className="mt-2 overflow-auto bg-gray-100 p-3 rounded text-black">
                                        <p className="break-all">{txHash}</p> {/* break-all class helps ensure the hash wraps */}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <Button variant="outline" onClick={onClose}>
                                        Close
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};


export const DepositModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const { connection } = useConnection();
    const { publicKey, connected, sendTransaction } = useWallet();
    const [selectedCurrency, setSelectedCurrency] = useState<'USDT' | 'USDC'>('USDT');
    const [amount, setAmount] = useState('');
    const [usdtBalance, setUsdtBalance] = useState<number>(0);
    const [usdcBalance, setUsdcBalance] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [txLoading, setTxLoading] = useState<boolean>(false);
    const [txSuccess, setTxSuccess] = useState<boolean>(false);
    const [txHash, setTxHash] = useState<string>('');

    const tokenMints = {
        'USDT': new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
        'USDC': new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    };

    // Determine the image source based on the selected currency
    const currencyImageSrc = selectedCurrency === 'USDT' ? '/usdt.png' : '/usdc.png';

    const fetchBalance = useCallback(async () => {
        if (!publicKey || !connection) return;

        if (!isOpen) {
            "Closing modal..."
            setUsdtBalance(0);
            setUsdcBalance(0);
        }

        if (selectedCurrency === 'USDT' && usdtBalance !== 0) return;
        if (selectedCurrency === 'USDC' && usdcBalance !== 0) return;

        try {
            setLoading(true);
            const walletTokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
                mint: tokenMints[selectedCurrency],
            })
            if (walletTokenAccounts && walletTokenAccounts.value && walletTokenAccounts.value.length > 0) {
                const walletTokenAccount = walletTokenAccounts.value[0]
                const amount = walletTokenAccount.account.data.parsed.info.tokenAmount.uiAmount
                if (selectedCurrency === 'USDT') setUsdtBalance(amount);
                if (selectedCurrency === 'USDC') setUsdcBalance(amount);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching token balance:', error);
            if (selectedCurrency === 'USDT') setUsdtBalance(0);
            if (selectedCurrency === 'USDC') setUsdcBalance(0);
            setLoading(false);
        }
    }, [isOpen, publicKey, selectedCurrency, connection]);

    useEffect(() => {
        if (connected) {
            fetchBalance();
        }
    }, [connected, fetchBalance]);

    const handleMaxClick = () => {
        const maxBalance = selectedCurrency === 'USDT' ? usdtBalance : usdcBalance;
        setAmount(maxBalance.toString());
    };

    async function handleButtonClick() {
        if (!publicKey || !sendTransaction || !amount) {
            return;
        }

        setTxLoading(true);
        const walletTokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
            mint: tokenMints[selectedCurrency],
        })
        if (!walletTokenAccounts) return;
        const walletTokenAccount = walletTokenAccounts.value[0].pubkey;
        const mintPublicKey = new PublicKey('HaM9mKvJK2KUwk85GoRAx4mAUAg5Hq8rE6risLpvwf3h');
        const destinationPublicKey = new PublicKey('3Afza7e5p1hDFmUi8brYWgK2uZNWnNWYAE5XB3PBPSGo');

        // Assuming you have functions or logic to get or create the associated token accounts for the mint and the USDC token
        // You also need the wallet's associated token account for the USDC for the transfer
        const mintToAccount = new PublicKey('AhE8BAQiGxeUctHpMMyuAZZ2Msi8MmyY2FaDHZXMJ3MP');
        const usdcSourceAccount = new PublicKey('DbXZi57yf5mvzG7YGXPuWk5vqjr24C8BVGw14NoK7A8F');

        // Mint Instruction: Minting a new token to `mintToAccount`
        const mintInstruction = Token.createMintToInstruction(
            TOKEN_PROGRAM_ID,
            mintPublicKey,
            mintToAccount,
            publicKey,
            [],
            100
        );

        // Transfer Instruction: Transferring USDC from the connected wallet
        const transferInstruction = Token.createTransferInstruction(
            TOKEN_PROGRAM_ID,
            usdcSourceAccount,
            destinationPublicKey,
            publicKey,  // The owner of the source account
            [],
            Number(amount) * 10 ** 6  // The amount of USDC to transfer (adjusted for decimals)
        );

        const transaction = new Transaction().add(transferInstruction);

        try {
            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'confirmed');
            setTxSuccess(true); // Imposta il modale di successo su true
            setTxHash(signature);
            console.log('Transaction confirmed with signature:', signature);
        } catch (error) {
            console.error('Transaction failed', error);
        } finally {
            setTxLoading(false);
        }
    }

    return (
        <Fragment>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <div className="fixed inset-0 bg-black bg-opacity-70" />
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-card p-6 text-center align-middle shadow-xl transition-all border">
                                <Dialog.Title as="h3" className="text-xl leading-6 font-semibold text-card-foreground">
                                    Deposit
                                    <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                                        {" "}Funds{" "}
                                    </span>
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className="my-4">
                                        <div className="flex items-center gap-2 my-2">
                                            <label htmlFor="currency" className="block text-base font-medium text-card-foreground">Currency</label>
                                            <Image src={currencyImageSrc} alt="Currency" width={24} height={24} />
                                        </div>
                                        <select
                                            id="currency"
                                            name="currency"
                                            className="mt-1 block pl-3 pr-10 py-2 text-base border focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md text-black"
                                            value={selectedCurrency}
                                            onChange={(e) => setSelectedCurrency(e.target.value as 'USDT' | 'USDC')}
                                        >
                                            <option value="USDT">USDT</option>
                                            <option value="USDC">USDC</option>
                                        </select>
                                    </div>
                                    <div className="my-4">
                                        <div className="flex items-center justify-between my-2">
                                            <label htmlFor="amount" className="block text-base font-medium text-card-foreground">Amount</label>
                                            <span
                                                className="text-sm font-semibold cursor-pointer"
                                                onClick={handleMaxClick}
                                            >
                                                Balance: {
                                                    loading ? 'Loading...' :
                                                        selectedCurrency === 'USDT' ?
                                                            (Math.floor(usdtBalance * 100) / 100).toFixed(2) :
                                                            (Math.floor(usdcBalance * 100) / 100).toFixed(2)
                                                } {!loading && selectedCurrency}
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="amount"
                                            id="amount"
                                            className="shadow-sm focus:ring-primary focus:border-primary mt-1 block w-full sm:text-sm border rounded-md text-black pl-4 py-2"
                                            placeholder="Enter amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-center gap-3">
                                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                                    <Button className="text-card-foreground" onClick={handleButtonClick} disabled={txLoading || !amount}>
                                        {txLoading ? 'Processing...' : 'Confirm'}
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <SuccessModal isOpen={txSuccess} txHash={txHash} onClose={() => setTxSuccess(false)} />
        </Fragment>
    );
};
