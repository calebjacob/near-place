import { useNear } from "@/hooks/near";
import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "../Button";
import { FeatherIcon } from "../FeatherIcon";
import { Flex } from "../Flex";
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
        <Flex css={{ alignItems: "center", gap: "0.5rem" }}>
          <S.Logo src="/images/near-icon.svg" alt="NEAR" />
          <S.Title css={{ marginRight: "0.5rem" }}>Place</S.Title>
          <S.Tagline>A community canvas.</S.Tagline>
        </Flex>

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
            <FeatherIcon icon="user" />
            Connect Wallet
          </Button>
        )}
      </S.Header>

      <S.Main center={props.center}>{props.children}</S.Main>

      <S.Footer>
        <S.FooterBuiltOn href="https://near.org/" target="_blank">
          <span>Built on</span>
          <S.FooterLogo src="/images/near-logo.svg" alt="NEAR" />
        </S.FooterBuiltOn>
      </S.Footer>
    </S.Root>
  );
}
