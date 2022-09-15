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
      };

      allPixels[location] = pixels[location] || defaultPixel;
    }
  }

  return Object.values(allPixels);
}
