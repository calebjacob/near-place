import { styled } from "@/styles/stitches";

export const Root = styled("div", {
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  width: "100%",
});

export const Header = styled("header", {
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
});

export const Title = styled("h1", {
  fontSize: "1.25rem",
  fontWeight: 200,
  letterSpacing: "0.25rem",
  textTransform: "uppercase",
});

export const Main = styled("main", {
  display: "flex",
  flexDirection: "column",
  flex: "1 0 auto",

  variants: {
    center: {
      true: {
        alignItems: "center",
        justifyContent: "center",
      },
    },
  },
});

export const Footer = styled("footer", {
  display: "flex",
  justifyContent: "center",
  padding: "1rem",
});

export const Logo = styled("img", {
  display: "block",
  height: "2rem",
});

export const BuiltOn = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.25rem",
  transition: "var(--transitions)",

  "&:hover, &:focus": {
    color: "var(--color-text-1)",
  },
});
