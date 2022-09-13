import { Layout } from "@/components/Layout";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import type { Pixels } from "../../shared/types";
import { Canvas } from "../components/Canvas";
import { useNear } from "../hooks/near";

const Home: NextPage = () => {
  const [pixels, setPixels] = useState<Pixels>();
  const { contract, wallet } = useNear();

  useEffect(() => {
    if (contract) {
      const loadPixels = async () => {
        try {
          const result = await contract.getPixels();
          setPixels(result);
        } catch (e) {
          console.log(e);
        }
      };

      loadPixels();
    }
  }, [contract]);

  // function changeGreeting(e) {
  //   e.preventDefault();
  //   setUiPleaseWait(true);
  //   const { greetingInput } = e.target.elements;
  //   contract
  //     .setGreeting(greetingInput.value)
  //     .then(async () => {
  //       return contract.getGreeting();
  //     })
  //     .then(setValueFromBlockchain)
  //     .finally(() => {
  //       setUiPleaseWait(false);
  //     });
  // }

  if (!contract || !wallet) return null;

  return (
    <Layout center>
      <Canvas pixels={pixels} />
    </Layout>
  );
};

export default Home;
