import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useNear } from "../hooks/near";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const { wallet } = useNear();
  const [isLoading, setIsLoading] = useState(false);

  async function loadWallet() {
    try {
      setIsLoading(true);
      await wallet?.startUp();
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadWallet();
  }, [wallet]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
