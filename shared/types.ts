export interface Pixels {
  [location: string]: Pixel;
}

export interface Pixel {
  color: string;
}

export interface SetPixelOptions {
  location: string;
  pixel: Pixel;
}
