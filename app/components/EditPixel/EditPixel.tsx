import type { CanvasPixel } from "@/../shared/types";
import { useNear } from "@/hooks/near";
import { useEffect, useState } from "react";
import { ChromePicker, ColorChangeHandler } from "react-color";
import { Button } from "../Button";
import { FeatherIcon } from "../FeatherIcon";
import { Flex } from "../Flex";

import * as S from "./styles";

interface Props {
  pixel?: CanvasPixel;
  target?: HTMLDivElement;
  onCancel?: () => void;
  onUpdate?: () => Promise<void> | void;
}

export function EditPixel(props: Props) {
  const { contract, wallet } = useNear();
  const [color, setColor] = useState<string | undefined>();
  const [isUpdating, setIsUpdating] = useState(false);
  const top = props.target?.offsetTop || 0;
  const left = props.target?.offsetLeft || 0;

  useEffect(() => {
    props.target?.classList.add("selected-pixel");
    props.target?.scrollIntoView();

    return () => {
      if (props.target) {
        props.target.classList.remove("selected-pixel");
        props.target.style.background = "";
      }
    };
  }, [props.target]);

  useEffect(() => {
    setColor(props.pixel?.color);

    return () => {
      setColor("");
    };
  }, [props.pixel]);

  const onColorChange: ColorChangeHandler = (color) => {
    if (!props.target) return;
    props.target.style.background = color.hex;
    setColor(color.hex);
  };

  async function updatePixel() {
    if (!contract || !color || !props.pixel) return;

    try {
      setIsUpdating(true);

      const result = await contract.setPixel({
        location: props.pixel.location,
        pixel: {
          color,
        },
      });

      console.log(result);

      if (props.onUpdate) {
        await props.onUpdate();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  }

  if (!props.pixel) return null;
  if (!props.target) return null;
  if (!wallet) return null;

  return (
    <S.Root css={{ "--top": `${top}px`, "--left": `${left}px` }}>
      <ChromePicker
        color={color}
        onChange={onColorChange}
        disableAlpha={true}
      />

      {wallet.isSignedIn() ? (
        <S.Buttons>
          <Button
            type="button"
            onClick={updatePixel}
            disabled={!color}
            loading={isUpdating}
          >
            Confirm
          </Button>

          <Button color="neutral" type="button" onClick={props.onCancel}>
            Cancel
          </Button>
        </S.Buttons>
      ) : (
        <Flex stack>
          <p>Connect your wallet to save your changes.</p>

          <Button type="button" onClick={() => wallet.signIn()}>
            <FeatherIcon icon="user" />
            Connect Wallet
          </Button>
        </Flex>
      )}
    </S.Root>
  );
}
