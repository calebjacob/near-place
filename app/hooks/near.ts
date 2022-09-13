import { useEffect } from "react";
import { Contract } from "../utils/contract";
import { Wallet } from "../utils/wallet";

const contractId = "dev-1663085624023-20907305216118"; // TODO: Pull in through .env file
let wallet: Wallet | undefined;
let contract: Contract | undefined;

export function useNear() {
  useEffect(() => {
    if (!wallet || !contract) {
      wallet = new Wallet(contractId);
      contract = new Contract(wallet);
    }
  }, []);

  return {
    contract,
    wallet,
  };
}
