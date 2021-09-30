import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

interface Props {
  src: string;
  width: number;
  height: number;
  x?: number;
  y?: number;
  draggable?: boolean;
  name?: string;
}

const ImageCanvas = ({
  src,
  width,
  height,
  x,
  y,
  draggable = false,
  name = "",
}: Props) => {
  const [image] = useImage(`assets/img/${src}`, "anonymous");

  return (
    <Image
      name={name}
      image={image}
      width={width}
      height={height}
      x={x}
      y={y}
      draggable={draggable}
    />
  );
};

export default ImageCanvas;
