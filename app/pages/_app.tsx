import "../styles/reset.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useNear } from "../hooks/near";
import { useEffect, useState } from "react";
import { FeatherIconSheet } from "@/components/FeatherIcon";

function MyApp({ Component, pageProps }: AppProps) {
  const { wallet } = useNear();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadWallet = async () => {
      try {
        setIsLoading(true);
        await wallet?.startUp();
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    loadWallet();
  }, [wallet]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <FeatherIconSheet />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
