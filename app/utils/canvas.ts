import type { CanvasPixel, Pixels } from "@/../shared/types";

export function normalizePixels(pixels: Pixels) {
  const sizeX = 100;
  const sizeY = 100;
  const allPixels: Pixels = {};

  for (let y = 0; y < sizeY; y++) {
    for (let x = 0; x < sizeX; x++) {
      const location = `${x},${y}`;

      allPixels[location] = pixels[location] || {
        color: "",
      };
    }
  }

  const result: CanvasPixel[] = [];

  for (const [location, pixel] of Object.entries(allPixels)) {
    const x = location.split(",")[0];
    const y = location.split(",")[1];
    result.push({
      location,
      x,
      y,
      ...pixel,
    });
  }

  return result;
}
