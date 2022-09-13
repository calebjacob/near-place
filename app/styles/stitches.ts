import { createStitches, CSS, VariantProps } from "@stitches/react";
import type { JSXElementConstructor } from "react";

export const { config, getCssText, keyframes, styled } = createStitches({});

export type StitchesCSS = CSS<typeof config>;

export type StitchesProps<T extends JSXElementConstructor<any>> =
  VariantProps<T> & {
    css?: CSS;
  };
