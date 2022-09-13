import type { CanvasPixel, Pixels } from "@/../shared/types";
import { normalizePixels } from "@/utils/canvas";
import { useEffect, useState } from "react";

import * as S from "./styles";

interface Props {
  pixels?: Pixels;
}

export function Canvas(props: Props) {
  const [pixels, setPixels] = useState<CanvasPixel[]>([]);

  useEffect(() => {
    if (props.pixels) {
      setPixels(normalizePixels(props.pixels));
    }
  }, [props.pixels]);

  return (
    <S.Root>
      {pixels.map((pixel) => (
        <S.Pixel key={pixel.location} css={{ background: pixel.color }} />
      ))}
    </S.Root>
  );
}
