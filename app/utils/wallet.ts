import { providers } from "near-api-js";

import "@near-wallet-selector/modal-ui/styles.css";
import { setupModal } from "@near-wallet-selector/modal-ui";
import LedgerIconUrl from "@near-wallet-selector/ledger/assets/ledger-icon.png";
import MyNearIconUrl from "@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png";

import {
  setupWalletSelector,
  WalletSelector,
  Wallet as WalletInstance,
} from "@near-wallet-selector/core";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

const THIRTY_TGAS = "30000000000000";
const NO_DEPOSIT = "0";

// Wallet that simplifies using the wallet selector
export class Wallet {
  accountId?: string;
  contractId?: string;
  private wallet?: WalletInstance;
  private walletSelector?: WalletSelector;

  constructor(contractId?: string) {
    if (!contractId) {
      throw new Error('Failed to init wallet: missing "contractId" value');
    }

    this.contractId = contractId;
  }

  isSignedIn() {
    return this.walletSelector?.isSignedIn();
  }

  // To be called when the website loads
  async startUp() {
    this.walletSelector = await setupWalletSelector({
      network: "testnet",
      modules: [
        setupMyNearWallet({ iconUrl: MyNearIconUrl.src }),
        setupLedger({ iconUrl: LedgerIconUrl.src }),
      ],
    });

    const isSignedIn = this.walletSelector.isSignedIn();

    if (isSignedIn) {
      const { accounts } = this.walletSelector.store.getState();
      this.wallet = await this.walletSelector.wallet();
      this.accountId = accounts[0].accountId;
    }

    return isSignedIn;
  }

  // Sign-in method
  signIn() {
    if (!this.contractId) {
      throw new Error('Missing value: "contractId"');
    }

    if (!this.walletSelector) {
      throw new Error('Missing value: "walletSelector"');
    }

    const modal = setupModal(this.walletSelector, {
      contractId: this.contractId,
    });

    modal.show();
  }

  // Sign-out method
  signOut() {
    this.wallet?.signOut();
    this.wallet = this.accountId = this.contractId = undefined;
    window.location.href = "/";
  }

  // Make a read-only call to retrieve information from the network
  async viewMethod({
    contractId = this.contractId,
    method,
    args = {},
  }: {
    contractId?: string;
    method: string;
    args?: Record<string, any>;
  }) {
    if (!contractId) {
      throw new Error('Missing value: "contractId"');
    }

    if (!this.walletSelector) {
      throw new Error('Missing value: "walletSelector"');
    }

    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const res = await provider.query<any>({
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    });

    return JSON.parse(Buffer.from(res.result).toString());
  }

  // Call a method that changes the contract's state
  async callMethod({
    contractId = this.contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT,
  }: // gas = "100",
  // deposit = "0",
  {
    contractId?: string;
    method: string;
    args?: Record<string, any>;
    gas?: string;
    deposit?: string;
  }) {
    if (!contractId) {
      throw new Error('Missing value: "contractId"');
    }

    if (!this.accountId) {
      this.signIn();
      return;
    }

    if (!this.wallet) {
      throw new Error('Missing value: "wallet"');
    }

    // Sign a transaction with the "FunctionCall" action
    return await this.wallet.signAndSendTransaction({
      signerId: this.accountId,
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });
  }

  // Get transaction result from the network
  async getTransactionResult(txhash: string) {
    if (!this.walletSelector) {
      throw new Error('Missing value: "walletSelector"');
    }

    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve transaction result from the network
    const transaction = await provider.txStatus(txhash, "unused");
    return providers.getTransactionLastResult(transaction);
  }
}
