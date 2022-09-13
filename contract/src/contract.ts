import { NearBindgen, near, call, view } from "near-sdk-js";
import { Pixel, Pixels, SetPixelOptions } from "../../shared/types";

const defaultPixels: Pixels = {
  "0,0": { color: "#005bbc" },
  "1,0": { color: "#005bbc" },
  "2,0": { color: "#005bbc" },
  "0,1": { color: "#ffd600" },
  "1,1": { color: "#ffd600" },
  "2,1": { color: "#ffd600" },
  "0,2": { color: "#005bbc" },
  "1,2": { color: "#005bbc" },
  "2,2": { color: "#005bbc" },
};

@NearBindgen({})
export class NearPlace {
  pixels: Pixels = defaultPixels;

  @view({}) // This method is read-only and can be called for free
  get_pixels(): Pixels {
    return this.pixels || defaultPixels;
  }

  @call({}) // This method changes the state, for which it cost gas
  set_pixel(params: SetPixelOptions): void {
    near.log(`Saving pixel ${params.location} - ${params.pixel}`);
    this.pixels = this.pixels || {};
    this.pixels[params.location] = params.pixel;
  }
}
