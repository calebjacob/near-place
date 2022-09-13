import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

import type { StitchesCSS, StitchesProps } from "@/styles/stitches";

import * as S from "./styles";

type Props = StitchesProps<typeof S.Button> & {
  css?: StitchesCSS;
};
type ButtonProps = Props & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, type = "button", ...props }, ref) => {
    return (
      <S.Button
        disabled={props.disabled || props.loading === true}
        type={type}
        ref={ref}
        {...props}
      >
        <S.Content>{children}</S.Content>
      </S.Button>
    );
  }
);
Button.displayName = "Button";
