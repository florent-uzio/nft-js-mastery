import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { Footer, Navbar } from '../components';
import { NFTProvider } from '../context/nft-context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NFTProvider>
      <ThemeProvider attribute="class">
        <div className="dark:bg-nft-dark bg-white min-h-screen">
          <Navbar />
          <div className="pt-65">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
        <Script
          src="https://kit.fontawesome.com/82d3553b5d.js"
          crossOrigin="anonymous"
        />
      </ThemeProvider>
    </NFTProvider>
  );
}

export default MyApp;
