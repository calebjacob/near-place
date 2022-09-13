import { useNear } from "@/hooks/near";
import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "../Button";
import { FeatherIcon } from "../FeatherIcon";
import * as S from "./styles";

interface Props {
  center?: boolean;
  children: ReactNode;
}

export function Layout(props: Props) {
  const { wallet } = useNear();

  return (
    <S.Root>
      <S.Header>
        <S.Title>Place</S.Title>

        {wallet?.isSignedIn() ? (
          <Button
            color="neutral"
            type="button"
            onClick={() => wallet?.signOut()}
          >
            <FeatherIcon icon="log-out" />
            Sign Out
          </Button>
        ) : (
          <Button type="button" onClick={() => wallet?.signIn()}>
            <FeatherIcon icon="log-in" />
            Sign In
          </Button>
        )}
      </S.Header>

      <S.Main center={props.center}>{props.children}</S.Main>

      <S.Footer>
        <S.BuiltOn href="https://near.org/" target="_blank">
          <span>Built on</span>
          <S.Logo src="/images/near-logo.svg" alt="NEAR" />
        </S.BuiltOn>
      </S.Footer>
    </S.Root>
  );
}
