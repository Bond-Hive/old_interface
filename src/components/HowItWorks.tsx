import Image from 'next/image';

export const HowItWorks = () => {
  return (
    <section
      id="howitworks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-10">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        In markets where the price of futures contracts is higher than the current market price, known as contango, investors have the opportunity to profit from this disparity.
      </p>
      <p className="md:w-3/4 mx-auto mt-4 mb-16 text-xl text-muted-foreground">
        They can do this by selling futures contracts while simultaneously buying the underlying asset at its current price, thereby securing a guaranteed profit from the difference. If this position is maintained until maturity, at which point the prices converge, allowing investors to realize a profit from the difference.
      </p>
      <Image
        src="/chart.png"
        alt="Example Chart"
        width={700} 
        height={400}
        className="mx-auto mt-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
      />
    </section>
  );
};
