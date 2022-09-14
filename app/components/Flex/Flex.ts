import { styled } from "@/styles/stitches";

export const Flex = styled("div", {
  width: "100%",
  display: "flex",
  gap: "1rem",

  variants: {
    stack: {
      true: {
        flexDirection: "column",
      },
    },
  },
});
