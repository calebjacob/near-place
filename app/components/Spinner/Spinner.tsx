import type { ComponentProps } from "react";

import * as S from "./styles";

type Props = ComponentProps<typeof S.Spinner>;

export function Spinner(props: Props) {
  return <S.Spinner role="status" {...props} aria-label="Loading..." />;
}
