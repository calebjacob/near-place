import { SetPixelOptions } from "../../shared/types";
import { Wallet } from "./wallet";

export class Contract {
  wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  async getPixels() {
    return await this.wallet.viewMethod({ method: "get_pixels" });
  }

  async setPixel(options: SetPixelOptions) {
    return await this.wallet.callMethod({
      method: "set_pixel",
      args: options,
    });
  }
}
