export interface Pixels {
  [location: string]: Pixel;
}

export interface Pixel {
  color: string;
}

export interface CanvasPixel extends Pixel {
  location: string;
  x: string;
  y: string;
}

export interface SetPixelOptions {
  location: string;
  pixel: Pixel;
}
