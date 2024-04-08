import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>BondHive</title>
        <meta
          name="description"
          content="Unlocking Stable Returns with Crypto Bonds"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
