import { FC } from "react";
import { FAQ } from "../../components/FAQ";
import { Features } from "../../components/Features";
import { Footer } from "../../components/Footer";
import { Hero } from "../../components/Hero";
import { HowItWorks } from "../../components/HowItWorks";
import { HistoricalYields } from "../../components/HistoricalYields";
import { Navbar } from "../../components/Navbar";
import { Newsletter } from "../../components/Newsletter";
import { Pricing } from "../../components/Pricing";
import { ScrollToTop } from "../../components/ScrollToTop";

export const HomeView: FC = ({}) => {

  return (
    <>
      <Navbar />
      <Hero />
      <Pricing />
      <HowItWorks />
      <HistoricalYields />
      <Features />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
};
