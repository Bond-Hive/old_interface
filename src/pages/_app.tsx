import React from "react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
//import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { ThemeProvider } from "../components/theme-provider";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/App.css";

//const endpoint = "https://solana-mainnet.g.alchemy.com/v2/etW0kVLW_aB8jDKsxRomqJJUpFhVCHIT";

/*const WalletProvider = dynamic(
  () => import("../contexts/ClientWalletProvider"),
  {
    ssr: false,
  }
);*/

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      {/*<ConnectionProvider endpoint={endpoint}>*/}
      {/*<WalletProvider>*/}
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
      {/*</WalletProvider>*/}
      {/*</ConnectionProvider>*/}
    </div>
  );
}

export default MyApp;
