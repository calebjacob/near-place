export interface Pixel {
  color: string;
  location: string;
}

export interface Pixels {
  [location: string]: Pixel;
}

export interface SetPixelOptions {
  pixel: Pixel;
}
