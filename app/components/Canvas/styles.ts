import { styled } from "@/styles/stitches";

export const Canvas = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, 0.5rem)",
  width: "50rem",
  height: "50rem",
  boxShadow: "0 0 0 1px var(--color-surface-2)",
});

export const Pixel = styled("div", {
  display: "block",
  aspectRatio: 1,
  position: "relative",
  cursor: "pointer",
  boxShadow:
    "inset 0 0 0 1px rgba(255, 255, 255, 0), 0 0 0 1px rgba(0, 0, 0, 0)",
  transition: "var(--transitions)",

  "&:hover, &.selected-pixel": {
    zIndex: 5,
    boxShadow:
      "inset 0 0 0 1px rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.3)",
  },
});
