import { NearBindgen, UnorderedMap, call, view } from "near-sdk-js";
import { SetPixelOptions } from "../../shared/types";

@NearBindgen({})
export class NearPlace {
  pixels: UnorderedMap;

  constructor() {
    this.pixels = new UnorderedMap("pixels");
  }

  @view({}) // This method is read-only and can be called for free
  get_pixels() {
    return this.pixels.toArray();
  }

  @call({}) // This method changes the state, for which it cost gas
  set_pixel({ pixel }: SetPixelOptions): void {
    this.pixels.set(pixel.location, {
      color: pixel.color,
    });
  }

  @call({}) // This method changes the state, for which it cost gas
  reset_pixels(): void {
    this.pixels.clear();
  }
}
