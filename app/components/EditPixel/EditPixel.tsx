import type { Pixel } from "@/../shared/types";
import { useNear } from "@/hooks/near";
import { useSocket } from "@/hooks/socket";
import { useEffect, useState } from "react";
import { ChromePicker, ColorChangeHandler } from "react-color";
import { Button } from "../Button";
import { FeatherIcon } from "../FeatherIcon";
import { Flex } from "../Flex";

import * as S from "./styles";

interface Props {
  pixel?: Pixel;
  target?: HTMLDivElement;
  onCancel?: () => void;
  onUpdate?: (pixel: Pixel) => Promise<void> | void;
}

export function EditPixel(props: Props) {
  const { contract, wallet } = useNear();
  const [color, setColor] = useState("#000000");
  const [isUpdating, setIsUpdating] = useState(false);
  const { socket } = useSocket();
  const top = props.target?.offsetTop || 0;
  const left = props.target?.offsetLeft || 0;

  useEffect(() => {
    if (!props.target || !color) return;
    props.target.style.background = color;
  }, [props.target, color]);

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
    setColor(props.pixel?.color || "#000000");
  }, [props.pixel]);

  const onColorChange: ColorChangeHandler = (color) => {
    setColor(color.hex);
  };

  async function updatePixel() {
    if (!contract || !color || !props.pixel) return;

    try {
      setIsUpdating(true);

      const updatedPixel: Pixel = {
        color,
        location: props.pixel.location,
      };

      await contract.setPixel({
        pixel: updatedPixel,
      });

      socket?.emit("pixelUpdated", updatedPixel);

      if (props.onUpdate) {
        await props.onUpdate(updatedPixel);
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
