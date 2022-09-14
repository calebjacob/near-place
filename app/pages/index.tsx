import { Layout } from "@/components/Layout";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import type { CanvasPixel, Pixels } from "../../shared/types";
import { Canvas } from "../components/Canvas";
import { useNear } from "../hooks/near";
import * as Dialog from "@/components/Dialog";
import { EditPixel } from "@/components/EditPixel";
import Head from "next/head";

const Home: NextPage = () => {
  const [pixels, setPixels] = useState<Pixels>();
  const { contract, wallet } = useNear();
  const [selectedPixel, setSelectedPixel] = useState<CanvasPixel | undefined>();
  const [selectedPixelTarget, setSelectedPixelTarget] = useState<
    HTMLDivElement | undefined
  >();

  const onPixelSelect = useCallback(
    (pixel: CanvasPixel, target: HTMLDivElement) => {
      setSelectedPixel(pixel);
      setSelectedPixelTarget(target);
    },
    []
  );

  const onPixelDeselect = useCallback(() => {
    setSelectedPixel(undefined);
    setSelectedPixelTarget(undefined);
  }, []);

  const onPixelUpdate = useCallback(async () => {
    if (!contract) return;

    try {
      const result = await contract.getPixels();
      setPixels(result);
      setSelectedPixel(undefined);
      setSelectedPixelTarget(undefined);
    } catch (e) {
      console.log(e);
    }
  }, [contract]);

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

  if (!contract || !wallet) return null;

  return (
    <>
      <Head>
        <title>Place</title>
      </Head>

      <Layout center>
        <Canvas pixels={pixels} onPixelSelect={onPixelSelect} />
        <EditPixel
          pixel={selectedPixel}
          target={selectedPixelTarget}
          onCancel={onPixelDeselect}
          onUpdate={onPixelUpdate}
        />
      </Layout>
    </>
  );
};

export default Home;
