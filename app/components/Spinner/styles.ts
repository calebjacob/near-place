import { keyframes, styled } from "@/styles/stitches";

const spinAnimation = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const Spinner = styled("div", {
  width: "2rem",
  height: "2rem",
  borderRadius: "100%",
  border: "2px solid currentColor",
  borderTopColor: "transparent",
  animation: `${spinAnimation} 700ms linear infinite`,

  variants: {
    center: {
      true: {
        margin: "auto",
      },
    },
  },
});
