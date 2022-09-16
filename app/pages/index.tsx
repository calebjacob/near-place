import { Layout } from "@/components/Layout";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import type { Pixel, Pixels } from "../../shared/types";
import { Canvas } from "../components/Canvas";
import { useNear } from "../hooks/near";
import * as Dialog from "@/components/Dialog";
import { EditPixel } from "@/components/EditPixel";
import Head from "next/head";
import { useSocket } from "@/hooks/socket";
import { Spinner } from "@/components/Spinner";

const Home: NextPage = () => {
  const [pixels, setPixels] = useState<Pixels>();
  const { contract, wallet } = useNear();
  const { socket } = useSocket();
  const [selectedPixelLocation, setSelectedPixelLocation] = useState<
    string | undefined
  >();
  const [selectedPixelTarget, setSelectedPixelTarget] = useState<
    HTMLDivElement | undefined
  >();

  const selectedPixel = pixels && pixels[selectedPixelLocation || ""];

  const onPixelSelect = useCallback((pixel: Pixel, target: HTMLDivElement) => {
    setSelectedPixelLocation(pixel.location);
    setSelectedPixelTarget(target);
  }, []);

  const onPixelDeselect = useCallback(() => {
    setSelectedPixelLocation(undefined);
    setSelectedPixelTarget(undefined);
  }, []);

  const onPixelUpdate = useCallback((pixel: Pixel) => {
    setPixels((current) => {
      return {
        ...current,
        [pixel.location]: pixel,
      };
    });

    setSelectedPixelLocation((value) => {
      if (value === pixel.location) {
        setSelectedPixelTarget(undefined);
        return undefined;
      }
      return value;
    });
  }, []);

  useEffect(() => {
    if (contract) {
      const loadPixels = async () => {
        try {
          const result = await contract.getPixels();
          setPixels(result);
        } catch (e) {
          console.log(e);
        }
      };

      loadPixels();
    }
  }, [contract]);

  useEffect(() => {
    if (socket) {
      socket.on("pixelUpdated", (pixel: Pixel) => {
        setPixels((current) => {
          return {
            ...current,
            [pixel.location]: pixel,
          };
        });
      });
    }
  }, [socket]);

  if (!contract || !wallet) return null;

  return (
    <>
      <Head>
        <title>Place</title>
      </Head>

      <Layout center>
        {pixels ? (
          <>
            <Canvas pixels={pixels} onPixelSelect={onPixelSelect} />

            <EditPixel
              pixel={selectedPixel}
              target={selectedPixelTarget}
              onCancel={onPixelDeselect}
              onUpdate={onPixelUpdate}
            />
          </>
        ) : (
          <Spinner />
        )}
      </Layout>
    </>
  );
};

export default Home;
