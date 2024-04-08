import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="BondHive - Lock in Your Yield with Crypto Bonds" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="BondHive" />
          <meta property="og:description" content="Lock in Your Yield with Crypto Bonds." />
          <meta property="og:url" content="https://bondhive.xyz" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@bondhive" />
          <meta name="twitter:title" content="BondHive" />
          <meta name="twitter:description" content="Lock in Your Yield with Crypto Bonds." />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

