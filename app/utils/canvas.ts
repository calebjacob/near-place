import type { Pixel, Pixels } from "@/../shared/types";

export function normalizePixels(pixels: Pixels) {
  const sizeX = 100;
  const sizeY = 100;
  const allPixels: Pixels = {};

  for (let y = 0; y < sizeY; y++) {
    for (let x = 0; x < sizeX; x++) {
      const location = `${x},${y}`;
      const defaultPixel: Pixel = {
        color: "",
        location,
        x,
        y,
      };
      const pixel: Pixel = {
        ...defaultPixel,
        ...pixels[location],
      };
      allPixels[location] = pixel;
    }
  }

  return allPixels;
}
