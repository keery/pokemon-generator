import React, { useState, useEffect } from "react";
import { Image as KonvaImage } from "react-konva";
import useImage from "use-image";

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  if (srcWidth <= maxWidth && srcHeight <= maxHeight)
    return { width: srcWidth, height: srcHeight };
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}

interface Props {
  src: string;
  width?: number;
  height?: number;
  maxHeight?: number;
  maxWidth?: number;
  x?: number;
  y?: number;
  prefixPath?: string;
  draggable?: boolean;
  name?: string;
  onDragEnd?: (event: any) => void;
}

const ImageCanvas = ({
  src,
  width,
  height,
  x,
  y,
  maxHeight = null,
  maxWidth = null,
  prefixPath = "assets/img/",
  draggable = false,
  name = "",
  onDragEnd = () => null,
}: Props) => {
  const [size, setSize] = useState([width, height]);

  const [image] = useImage(`${prefixPath}${src}`, "anonymous");

  useEffect(() => {
    if (image && maxHeight && maxWidth) {
      const { width, height } = calculateAspectRatioFit(
        image.width,
        image.height,
        maxWidth,
        maxHeight
      );
      setSize([width, height]);
    }
  }, [image]);

  if (!image) return null;

  return (
    <KonvaImage
      name={name}
      image={image}
      width={size[0]}
      height={size[1]}
      x={x}
      y={y}
      draggable={draggable}
      onDragEnd={onDragEnd}
    />
  );
};

export default ImageCanvas;
