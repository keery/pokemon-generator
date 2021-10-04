import React, { useState, useEffect } from "react";
import { Image } from "react-konva";
import useImage from "use-image";

// calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
//   if (srcWidth > maxWidth || srcHeight > maxHeight) {
//     let height = 0
//     let width = 0

//     if (srcWidth > srcHeight) {
//       height = maxHeight + 4
//       width = (srcWidth / srcHeight) * height
//     } else {
//       width = maxWidth + 4
//       height = (srcHeight / srcWidth) * width
//     }

//     return { width, height }
//   }

//   return { width: srcWidth, height: srcHeight }
// }

function resize(width, height, maxWidth, maxHeight) {
  if (width > height) {
    if (width > maxWidth) {
      return {
        height: height * (maxWidth / width),
        width: (width = maxWidth),
      };
    }
  } else {
    if (height > maxHeight) {
      return {
        height: maxHeight,
        width: width * (maxHeight / height),
      };
    }
  }
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
  const [image] = useImage(`${prefixPath}${src}`, "anonymous");
  const [size, setSize] = useState([width, height]);

  useEffect(() => {
    if (image && maxHeight && maxWidth) {
      const res = resize(image.width, image.height, maxWidth, maxHeight);
      setSize([res.width, res.height]);
    }
  }, [image]);

  return (
    <Image
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
