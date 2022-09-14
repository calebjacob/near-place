import * as DialogPrimitive from "@radix-ui/react-dialog";

import { keyframes, styled } from "@/styles/stitches";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const overlayHide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const contentShow = keyframes({
  "0%": { transform: "scale(0.9, 0.9)" },
  "100%": { transform: "scale(1, 1)" },
});

const contentHide = keyframes({
  "0%": { transform: "scale(1, 1)" },
  "100%": { transform: "scale(0.9, 0.9)" },
});

export const Overlay = styled(DialogPrimitive.Overlay, {
  "--animation-speed": "300ms",
  position: "fixed",
  zIndex: 500,
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(4px)",

  '&[data-state="open"]': {
    animation: `${overlayShow} var(--animation-speed) ease`,
  },
  '&[data-state="closed"]': {
    animation: `${overlayHide} var(--animation-speed) ease`,
  },
});

export const Content = styled(DialogPrimitive.Content, {
  backgroundColor: "var(--color-surface-2)",
  borderRadius: "1rem",
  boxShadow: "0 0 2rem rgba(0, 0, 0, 0.25)",
  width: "100%",
  maxHeight: "100%",
  overflow: "auto",
  scrollBehavior: "smooth",

  '&[data-state="open"]': {
    animation: `${contentShow} var(--animation-speed) ease`,
  },
  '&[data-state="closed"]': {
    animation: `${contentHide} var(--animation-speed) ease`,
  },

  variants: {
    size: {
      s: {
        maxWidth: "30rem",
      },
      m: {
        maxWidth: "50rem",
      },
    },
  },

  defaultVariants: {
    size: "m",
  },
});

export const ContentBody = styled("div", {
  padding: "2rem",
});

export const Header = styled("div", {
  display: "flex",
  alignItems: "center",
  position: "sticky",
  top: 0,
  zIndex: 100,
  gap: "1rem",
  padding: "1rem 2rem",
  background: "var(--color-surface-3)",
  borderBottom: "1px solid var(--color-surface-1)",

  "@mobile": {
    padding: "1rem",
  },
});

export const HeaderContent = styled("div", {
  flexGrow: "100",
});

export const Title = styled(DialogPrimitive.Title, {
  color: "var(--color-text-1)",
  fontWeight: 300,
  fontSize: "2rem",
});

export const CloseButton = styled(DialogPrimitive.Close, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.75rem",
  height: "1.75rem",
  flexShrink: "0",
  borderRadius: "100%",
  cursor: "pointer",
  color: "var(--color-text-2)",
  background: "var(--color-surface-2)",
  transition: "var(--transitions)",

  "&:hover": {
    background: "var(--color-surface-3)",
  },

  "&:focus": {
    outline: "var(--focus-outline)",
    outlineOffset: "var(--focus-outline-offset)",
  },
});
