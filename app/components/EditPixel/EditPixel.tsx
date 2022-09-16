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
  onUpdate?: (pixel: Pixel) => void;
}

export function EditPixel(props: Props) {
  const { contract, wallet } = useNear();
  const [color, setColor] = useState<string>("#000000");
  const [isUpdating, setIsUpdating] = useState(false);
  const { socket } = useSocket();
  const top = props.target?.offsetTop || 0;
  const left = props.target?.offsetLeft || 0;

  useEffect(() => {
    function closeOnEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        props.onCancel && props.onCancel();
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [props]);

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

        setTimeout(() => {
          if (props.target) {
            props.target.style.background = "";
          }
        }, 100);
      }
    };
  }, [props.target]);

  useEffect(() => {
    setIsUpdating(false);

    if (props.pixel?.color) {
      setColor(props.pixel.color);
    }
  }, [props.pixel]);

  const onColorChange: ColorChangeHandler = (color) => {
    setColor(color.hex);
  };

  async function updatePixel() {
    if (!contract || !props.pixel) return;

    const updatedColor = color;
    const updatedLocation = props.pixel.location;

    try {
      setIsUpdating(true);

      const updatedPixel: Pixel = {
        color: updatedColor,
        location: updatedLocation,
        x: parseInt(updatedLocation.split(",")[0]),
        y: parseInt(updatedLocation.split(",")[1]),
      };

      // We will be optimistic that "setPixel()" will work, and make the UI respond instantly:

      contract.setPixel({
        color: updatedColor,
        location: updatedLocation,
      });

      socket?.emit("pixelUpdated", updatedPixel);

      if (props.onUpdate) {
        props.onUpdate(updatedPixel);
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
