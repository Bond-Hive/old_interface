import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>BondHive - Maximize Your Investment Returns</title>
        <meta
          name="description"
          content="Maximize Your Investment Returns by Locking in Your Yield with Crypto Bonds"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
