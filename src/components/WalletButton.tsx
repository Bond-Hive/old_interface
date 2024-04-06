import React, { useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletModalButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';

// Base styles for the button, unaltered for desktop view
const buttonBaseStyle = `inline-flex items-center border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 pb-16`;
// Desktop styles
const desktopStyle = `px-4 py-2 text-sm`;
// Mobile adjustments: margin and padding adjustments for mobile view only
const mobileAdjustments = `m-1 px-2 py-1 text-xs`;

const WalletConnectButton: React.FC = () => {
    const { connected, publicKey } = useWallet();

    const content = useCallback(() => {
        // Compute displayKey once, use everywhere needed
        const displayKey = publicKey ? `${publicKey.toBase58().slice(0, 4)}...` : '';

        if (!connected) {
            // Button shows 'Connect' on both mobile and desktop
            return (
                <WalletModalButton className={`${buttonBaseStyle} ${desktopStyle} md:${mobileAdjustments}`}>
                    Connect
                </WalletModalButton>
            );
        }

        return (
            <WalletDisconnectButton className={`${buttonBaseStyle} ${desktopStyle} md:${mobileAdjustments}`}>
                {/* Show abbreviated public key on mobile, 'Disconnect' on desktop */}
                <span className="md:hidden">{displayKey}</span>
                <span className="hidden md:inline-flex">{displayKey} disconnect</span>
            </WalletDisconnectButton>
        );
    }, [connected, publicKey]);

    return <>{content()}</>;
};

export default WalletConnectButton;
