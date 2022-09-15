import type { Pixels, SetPixelOptions } from "../../shared/types";
import type { Wallet } from "./wallet";

export class Contract {
  wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  async getPixels() {
    const pixels: Pixels = {};
    const response = await this.wallet.viewMethod({ method: "get_pixels" });

    response.forEach((item: any) => {
      pixels[item[0]] = {
        location: item[0],
        ...item[1],
      };
    });

    return pixels;
  }

  async resetPixels() {
    return await this.wallet.callMethod({
      method: "reset_pixels",
    });
  }

  async setPixel(options: SetPixelOptions) {
    return await this.wallet.callMethod({
      method: "set_pixel",
      args: options,
    });
  }
}
