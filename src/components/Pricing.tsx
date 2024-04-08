import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DepositModal } from "@/components/DepositModal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  code: string;
  popular: PopularPlanType;
  APY: string;
  logo: string;
  features: {
    maturity: string;
    min: string;
    underlying: string;
    depositAsset: string;
  };
  animate?: boolean;
}


const initialPricingList: PricingProps[] = [
  {
    title: "BTC (June-24)",
    code: "BTC/USDT_240628",
    APY: "22.00%",
    popular: 0,
    logo: "/bitcoin.svg",
    features: {
      maturity: "2024-06-28",
      min: "$100",
      underlying: "BTC Futures and Spot",
      depositAsset: "USDT or USDC",
    },
  },
  {
    title: "ETH (June-24)",
    code: "ETH/USDT_240628",
    APY: "26.00%",
    popular: 0,
    logo: "/ethereum.svg",
    features: {
      maturity: "2024-06-28",
      min: "$100",
      underlying: "ETH Futures and Spot",
      depositAsset: "USDT or USDC",
    },
  },
  {
    title: "BTC (Sep-24)",
    code: "BTC/USDT_240927",
    APY: "23.00%",
    popular: 0,
    logo: "/bitcoin.svg",
    features: {
      maturity: "2024-09-27",
      min: "$100",
      underlying: "BTC Futures and Spot",
      depositAsset: "USDT or USDC",
    },
  },
  {
    title: "ETH (Sep-24)",
    code: "ETH/USDT_240927",
    APY: "30.00%",
    popular: 0,
    logo: "/ethereum.svg",
    features: {
      maturity: "2024-09-27",
      min: "$100",
      underlying: "ETH Futures and Spot",
      depositAsset: "USDT or USDC",
    },
  }
];

export const Pricing = () => {
  const { publicKey } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pricingList, setPricingList] = useState<PricingProps[]>(initialPricingList);
  const latestPricingListRef = useRef(initialPricingList);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchAPYData = async () => {
    try {
      const response = await fetch('https://bondexecution.onrender.com/monitoring/getYields');
      const newData = await response.json();

      const updatedPricingList = latestPricingListRef.current.map(plan => {
        const newAPYData = newData.find((item: { symbolFuture: string; }) => item.symbolFuture === plan.code);
        // Determine if the APY has changed and should trigger animation.
        const isAPYChanged = newAPYData && `${newAPYData.averageYieldPostExecution.upper}` !== plan.APY;
        return {
          ...plan,
          APY: isAPYChanged ? `${newAPYData.averageYieldPostExecution.upper}` : plan.APY,
          animate: isAPYChanged, // Set animate true only if there's a change.
        };
      });

      setPricingList(updatedPricingList);
      latestPricingListRef.current = updatedPricingList;

      // Reset the animation flags for only those items that were animated
      setTimeout(() => {
        setPricingList(currentList =>
          currentList.map(plan => plan.animate ? { ...plan, animate: false } : plan)
        );
      }, 2000); // Match this duration to your CSS animation duration
    } catch (error) {
      console.error('Failed to fetch APY data:', error);
    }
  };

  useEffect(() => {
    fetchAPYData(); // Initial fetch
    const intervalId = setInterval(fetchAPYData, 5000); // Refetch every 5 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <section
      id="pricing"
      className="container pt-10 sm:pt-24"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2"> {/* Wrap the title and logo in a new div */}
                  <Image
                    src={pricing.logo}
                    alt="Logo"
                    width={30} // Set your desired width
                    height={30} // And height
                    className="mr-2" // Add some margin to the right of the logo
                  />
                  {" "}{pricing.title}
                </div>
                <span className={`${pricing.animate ? 'flashAnimation' : ''}`}>
                  APY: {pricing.APY}
                </span>
              </CardTitle>

              <div style={{ margin: '2rem 0' }}>
                {Object.entries(pricing.features).map(([key, value]) => (
                  <p key={key}>{`${capitalizeFirstLetter(key)}: ${value}`}</p>
                ))}
              </div>

            </CardHeader>

            <CardContent>
              <Button
                className="w-auto text-accent-foreground"
                onClick={() => setIsModalOpen(true)}
                disabled={!publicKey}
              >
                {publicKey ? "Invest Now" : "Connect Wallet"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <DepositModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
