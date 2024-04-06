import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How is the yield locked, and can it change with market conditions?",
    answer: "The yield is locked by simultaneously going short on futures and long on spot positions. This strategy ensures that the yield remains unchanged by market conditions if held until maturity. No matter the price fluctuations or disparity changes, your yield is secure.",
    value: "item-1",
  },
  {
    question: "What happens at expiration?",
    answer:
      "Upon expiration, the funds are returned to your investment wallet. We're developing an auto-reinvest feature that will allow you to set a threshold limit to automatically re-enter the market or take the returns, giving you seamless control over your investments.",
    value: "item-2",
  },
  {
    question:
      "What do I receive to claim my investment?",
    answer:
      "You'll receive yield-bearing tokens that accrue value over time, similar to a bond. These tokens are based on the Solana blockchain and represent your growing investment.",
    value: "item-3",
  },
  {
    question: "What are the risks involved in this investment?",
    answer: "While we strive to mitigate risks, one potential risk is the bankruptcy of a centralized exchange. However, our diversified approach across multiple exchanges aims to reduce this risk.",
    value: "item-4",
  },
  {
    question:
      "Which exchanges are being utilized by Bond Hive?",
    answer:
      "Currently, we're utilizing Binance, OKX, Bybit, and Deribit for our operations. We are also in the process of continuously onboarding additional exchanges that offer delivery futures to expand our reach and enhance our service.",
    value: "item-5",
  },
  {
    question:
      "Can I access my investment before maturity?",
    answer:
      "Yes, while our bonds are designed for holding until maturity to realize the full yield potential, you can exit your position early in the secondary market. Keep in mind that this may affect the final yield received.",
    value: "item-6",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
