import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Pixels } from "../../shared/types";
import { useNear } from "../hooks/near";

const Home: NextPage = () => {
  const [pixels, setPixels] = useState<Pixels>();
  const { contract, wallet } = useNear();

  async function loadPixels() {
    try {
      const result = await contract?.getPixels();
      setPixels(result);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadPixels();
  }, []);

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
    <div>
      <p>{JSON.stringify(pixels || {})}</p>

      {wallet.isSignedIn() ? (
        <button type="button" onClick={() => wallet.signOut()}>
          Sign Out
        </button>
      ) : (
        <button type="button" onClick={() => wallet.signIn()}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default Home;
