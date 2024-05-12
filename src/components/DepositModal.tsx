import React, { useState, Fragment, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/ui/button';

export const DepositModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const [selectedCurrency, setSelectedCurrency] = useState<'USDT' | 'USDC'>('USDT');
    const [amount, setAmount] = useState('');
    const [usdtBalance, setUsdtBalance] = useState<number>(0);
    const [usdcBalance, setUsdcBalance] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [txLoading, setTxLoading] = useState<boolean>(false);
    const [txSuccess, setTxSuccess] = useState<boolean>(false);
    const [txHash, setTxHash] = useState<string>('');

    const currencyImageSrc = selectedCurrency === 'USDT' ? '/usdt.png' : '/usdc.png';

    useEffect(() => {
        if (!isOpen) {
            console.log("Closing modal...");
            setUsdtBalance(0);
            setUsdcBalance(0);
            return; // Early return if the modal is not open
        }

        if ((selectedCurrency === 'USDT' && usdtBalance !== 0) || (selectedCurrency === 'USDC' && usdcBalance !== 0)) {
            return; // Avoid updating if there's already a balance
        }

        const fetchBalance = () => {
            setLoading(true);
            // Simulated delay to mimic fetching data
            setTimeout(() => {
                const simulatedBalance = 100; // Example static balance
                if (selectedCurrency === 'USDT') {
                    setUsdtBalance(simulatedBalance);
                } else if (selectedCurrency === 'USDC') {
                    setUsdcBalance(simulatedBalance);
                }
                setLoading(false);
            }, 1000);
        };

        fetchBalance();
    }, [isOpen, selectedCurrency, usdtBalance, usdcBalance]); // Depend on balances to avoid unnecessary updates

    const handleMaxClick = () => {
        const maxBalance = selectedCurrency === 'USDT' ? usdtBalance : usdcBalance;
        setAmount(maxBalance.toString());
    };

    return (
        <Fragment>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <div className="fixed inset-0 bg-black bg-opacity-70" />
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-card p-6 text-center align-middle shadow-xl transition-all border">
                                <Dialog.Title as="h3" className="text-xl leading-6 font-semibold text-card-foreground">
                                    Deposit Funds
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
                                                Balance: {loading ? 'Loading...' : `${(Math.floor(selectedCurrency === 'USDT' ? usdtBalance : usdcBalance) * 100 / 100).toFixed(2)} ${selectedCurrency}`}
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
                                    <Button className="text-card-foreground" disabled={txLoading || !amount}>
                                        {txLoading ? 'Processing...' : 'Confirm'}
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </Fragment>
    );
};
