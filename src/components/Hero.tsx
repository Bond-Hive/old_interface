export const Hero = () => {
  return (
    <section className="container place-items-center pt-20 md:pt-14 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Maximize
            </span>{" "}
            Your Investment Returns < br />
          </h1>{" "}
          by{" "}
          <h2 className="inline">
            Locking in Your Yield with
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              {" "} Crypto Bonds
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Crypto Yield Bond combines the benefits of futures spread trading and funding fees from major centralized cryptocurrency exchanges (CEXs), offering secure, high-yield returns locked in for investors.
        </p>
      </div>
    </section>
  );
};
