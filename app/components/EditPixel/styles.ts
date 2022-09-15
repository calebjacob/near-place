import { keyframes, styled } from "@/styles/stitches";

const show = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const Root = styled("div", {
  position: "absolute",
  zIndex: 100,
  top: "calc(var(--top) + 1rem)",
  left: "calc(var(--left) - 8rem)",
  width: "16rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  background: "var(--color-surface-2)",
  boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.25)",
  borderRadius: "0.25rem",
  padding: "1rem",
  animation: `${show} 200ms`,

  "&::before": {
    content: "",
    display: "block",
    width: 0,
    height: 0,
    position: "absolute",
    left: "50%",
    top: "-4px",
    marginLeft: "-1px",
    borderBottom: "4px solid var(--color-surface-2)",
    borderLeft: "4px solid transparent",
    borderRight: "4px solid transparent",
    pointerEvents: "none",
  },
});

export const Buttons = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "1fr",
  gap: "1rem",
});
