import { keyframes, styled } from "@/styles/stitches";

const spinAnimation = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const Content = styled("span", {
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  overflow: "hidden",
});

export const Button = styled("button", {
  borderRadius: "0.25rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontWeight: 500,
  fontFamily: "var(--font-primary)",
  padding: "0 0.75rem",
  flexShrink: 0,
  transition: "var(--transitions)",
  position: "relative",
  userSelect: "none",
  whiteSpace: "nowrap",
  fontSize: "1rem",
  height: "2rem",

  "&:disabled": {
    opacity: 0.5,
    pointerEvents: "none",
  },

  "&:focus": {
    outline: "var(--focus-outline)",
    outlineOffset: "var(--focus-outline-offset)",
  },

  variants: {
    color: {
      primary: {
        background: "var(--color-cta-primary)",
        color: "var(--color-cta-primary-text)",
        "&:hover": {
          background: "var(--color-cta-primary-highlight)",
        },
      },
      neutral: {
        background: "transparent",
        boxShadow: "inset 0 0 0 1px var(--color-surface-2)",
        color: "var(--color-text-1)",
        "&:hover": {
          background: "var(--color-surface-2)",
        },
      },
    },

    loading: {
      true: {
        pointerEvents: "none",

        "&:disabled": {
          opacity: 1,
        },

        [`& ${Content}`]: {
          opacity: 0,
        },

        "&:before": {
          content: "",
          display: "block",
          width: "1.2em",
          height: "1.2em",
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          margin: "-0.6em auto 0",
          borderRadius: "100%",
          border: "3px solid currentColor",
          borderTopColor: "transparent",
          animation: `${spinAnimation} 700ms linear infinite`,
        },
      },
    },
  },

  defaultVariants: {
    color: "primary",
  },
});
