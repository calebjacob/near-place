import type { Pixel, Pixels } from "@/../shared/types";
import { normalizePixels } from "@/utils/canvas";
import { memo, MouseEventHandler, useEffect, useState } from "react";

import * as S from "./styles";

interface Props {
  pixels?: Pixels;
  onPixelSelect?: (pixel: Pixel, target: HTMLDivElement) => void;
}

function CanvasInternal(props: Props) {
  const [pixels, setPixels] = useState<Pixel[]>([]);

  useEffect(() => {
    if (props.pixels) {
      setPixels(normalizePixels(props.pixels));
    }
  }, [props.pixels]);

  const handlePixelClick: MouseEventHandler = (event) => {
    const target = event.target as HTMLDivElement;
    const location = target.getAttribute("data-location");

    if (location) {
      const pixel = pixels.find((p) => p.location === location);
      if (pixel && props.onPixelSelect) props.onPixelSelect(pixel, target);
    }
  };

  return (
    <>
      <S.Canvas onClick={handlePixelClick}>
        {pixels.map((pixel) => (
          <S.Pixel
            role="button"
            aria-label="Edit Pixel"
            key={pixel.location}
            css={{ background: pixel.color }}
            data-location={pixel.location}
          />
        ))}
      </S.Canvas>
    </>
  );
}

export const Canvas = memo(CanvasInternal);
