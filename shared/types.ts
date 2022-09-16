export interface Pixel {
  color: string;
  location: string;
  x: number;
  y: number;
}

export interface Pixels {
  [location: string]: Pixel;
}

export interface SetPixelOptions {
  color: string;
  location: string;
}
