import { styled } from "@/styles/stitches";

export const Root = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, 1rem)",
  width: "10rem",
  height: "10rem",
  boxShadow: "0 0 0 1px var(--color-surface-2)",
});

export const Pixel = styled("div", {
  aspectRatio: 1,
  position: "relative",
  cursor: "pointer",
  boxShadow:
    "inset 0 0 0 1px rgba(255, 255, 255, 0), 0 0 0 1px rgba(0, 0, 0, 0)",
  transition: "var(--transitions)",

  "&:hover": {
    zIndex: 5,
    boxShadow:
      "inset 0 0 0 1px rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.2)",
  },
});
