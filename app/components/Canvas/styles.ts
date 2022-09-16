import { keyframes, styled } from "@/styles/stitches";

const show = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const Canvas = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, 0.5rem)",
  width: "50rem",
  height: "50rem",
  boxShadow: "0 0 0 1px var(--color-surface-2)",
  animation: `${show} 200ms`,
});

export const Pixel = styled("div", {
  display: "block",
  aspectRatio: 1,
  position: "relative",
  cursor: "pointer",
  transition: "var(--transitions)",

  "&:hover, &.selected-pixel": {
    zIndex: 5,
    boxShadow:
      "inset 0 0 0 1px rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.5)",
  },
});
