import type { Pixels, SetPixelOptions } from "../../shared/types";
import { normalizePixels } from "./canvas";
import type { Wallet } from "./wallet";

export class Contract {
  wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  async getPixels() {
    let pixels: Pixels = {};
    const response = await this.wallet.viewMethod({ method: "get_pixels" });

    response.forEach((item: any) => {
      pixels[item[0]] = {
        location: item[0],
        ...item[1],
      };
    });

    pixels = normalizePixels(pixels);

    return pixels;
  }

  async resetPixels() {
    return await this.wallet.callMethod({
      method: "reset_pixels",
    });
  }

  async setPixel(options: SetPixelOptions) {
    try {
      return await this.wallet.callMethod({
        method: "set_pixel",
        args: options,
      });
    } catch (e) {
      console.error(e);
    }
  }
}
