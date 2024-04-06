import { Button } from "./ui/button";

export const HistoricalYields = () => {
  const handleButtonClick = () => {
    // Open the specified URL in a new tab
    window.open('https://dune.com/socratesstable_sigma/bond-hive-yield-opportunities', '_blank');
  };

  return (
    <section
      id="historicalyields"
      className="bg-muted/50 py-16 text-center"
    >
      <div className="container mx-auto flex flex-col justify-center items-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold">
          Historical
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            {" "}Yields{" "}
          </span>
        </h2>
        <p className="md:w-3/4 mx-auto text-muted-foreground text-xl">
          One could tap into the opportunity and enter positions that yield consistently, even through bear markets, and find significantly enhanced prospects during bull markets.
        </p>
        <p className="md:w-3/4 mx-auto text-muted-foreground text-xl">
          For a closer look, please visit our Dune Analytics dashboard. Summarizing, ETH and BTC bonds have shown promising average yields of 13.61% and 16.42% for ETH, and 13.75% and 15.69% for BTC, over the past six months.
        </p>
        <div className="w-full flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-auto" onClick={handleButtonClick}>
            Dune Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
};
