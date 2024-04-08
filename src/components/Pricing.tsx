import { useState } from 'react';
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
  popular: PopularPlanType;
  APY: string;
  features: {
    maturity: string;
    min: string;
    underlying: string;
    depositAsset: string;
  };
}

const pricingList: PricingProps[] = [
  {
    title: "BTC (June-24)",
    APY: "20-22",
    popular: 0,
    features: {
      maturity: "2024-06-28",
      min: "$100",
      underlying: "BTC Futures and Spot",
      depositAsset: "USDT or USDC",
    },
  },
  {
    title: "ETH (June-24)",
    APY: "24-26",
    popular: 0,
    features: {
      maturity: "2024-06-28",
      min: "$100",
      underlying: "ETH Futures and Spot",
      depositAsset: "USDT or USDC",
    },
  },
  {
    title: "BTC (Sep-24)",
    APY: "21-23",
    popular: 0,
    features: {
      maturity: "2024-09-27",
      min: "$100",
      underlying: "BTC Futures and Spot",
      depositAsset: "USDT or USDC",
    },
  },
  {
    title: "ETH (Sep-24)",
    APY: "28-30",
    popular: 0,
    features: {
      maturity: "2024-09-27",
      min: "$100",
      underlying: "ETH Futures and Spot",
      depositAsset: "USDT or USDC",
    },
  }
];

export const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
                {pricing.title}
                <span>APY: {pricing.APY}%</span>
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
              >
                Invest Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <DepositModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
