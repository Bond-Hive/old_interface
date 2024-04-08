import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/ui/button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DepositModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [selectedCurrency, setSelectedCurrency] = useState<'USDT' | 'USDC'>('USDT');
    const [amount, setAmount] = useState('');

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg leading-6 font-medium text-gray-900"
                                >
                                    Deposit Funds
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className="my-4">
                                        <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
                                        <select
                                            id="currency"
                                            name="currency"
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                            value={selectedCurrency}
                                            onChange={(e) => setSelectedCurrency(e.target.value as 'USDT' | 'USDC')}
                                        >
                                            <option value="USDT">USDT</option>
                                            <option value="USDC">USDC</option>
                                        </select>
                                    </div>
                                    <div className="my-4">
                                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                        <input
                                            type="text"
                                            name="amount"
                                            id="amount"
                                            className="shadow-sm focus:ring-primary focus:border-primary mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Enter amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end gap-3">
                                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                                    <Button onClick={() => { /* Handle confirm action here */ onClose(); }}>Confirm</Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
