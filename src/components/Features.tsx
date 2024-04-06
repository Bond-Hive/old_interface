import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Importing the icons
import { FaLock, FaEye } from "react-icons/fa"; // For security and transparency icons
import { GiMoneyStack } from "react-icons/gi"; // For yield/growth icon

interface FeatureProps {
  title: string;
  description: string;
  Icon: React.ElementType; // Component type for icons
}

const features: FeatureProps[] = [
  {
    title: "Secured Arbitrage",
    description:
      "Lock in yields with Bond Hive's arbitrage strategy",
    Icon: FaLock, // Lock icon
  },
  {
    title: "Yield Bearing Token",
    description:
      "Using Solana’s interest-bearing token, the yield is distributed real-time to users",
    Icon: GiMoneyStack, // Stack of money icon
  },
  {
    title: "Transparent",
    description:
      "All transactions are verifiable for ultimate transparency",
    Icon: FaEye, // Eye icon
  },
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ title, description, Icon }: FeatureProps) => (
          <Card key={title} className="p-4 flex flex-col items-center text-center"> {/* Adjusted for center alignment */}
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent className="mb-4">{description}</CardContent> {/* Margin bottom for spacing */}

            <CardFooter className="flex justify-center p-2">
              <Icon className="w-16 h-16" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
