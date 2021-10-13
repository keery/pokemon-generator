import React, { useState, useEffect, useRef } from "react";
import { Image as KonvaImage, Transformer, Group } from "react-konva";
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
  isTransformable?: boolean;
  maxWidth?: number;
  x?: number;
  y?: number;
  prefixPath?: string;
  draggable?: boolean;
  name?: string;
  onDragEnd?: (event: any) => void;
  clipWidth?: number;
  clipHeight?: number;
  scaleY?: number;
  scaleX?: number;
  clipY?: number;
  clipX?: number;
  onSelect?: () => void;
  isSelected?: boolean;
  onTransformEnd?: (name: string, scaleX: number, scaleY: number) => void;
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
  isTransformable = false,
  onDragEnd = () => null,
  clipWidth = null,
  clipHeight = null,
  clipY = null,
  clipX = null,
  scaleY = 1,
  scaleX = 1,
  onSelect = null,
  isSelected = false,
  onTransformEnd = null,
}: Props) => {
  const [size, setSize] = useState([width, height]);
  const trRef = useRef(null);
  const imgRef = useRef(null);
  const [image] = useImage(`${prefixPath}${src}`, "anonymous");

  useEffect(() => {
    if (isSelected && isTransformable && !!trRef.current && !!imgRef) {
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, trRef, imgRef, isTransformable]);

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
    <>
      {isTransformable && isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
      <Group
        clipWidth={clipWidth}
        clipHeight={clipHeight}
        clipY={clipY}
        clipX={clipX}
      >
        <KonvaImage
          ref={imgRef}
          name={name}
          image={image}
          width={size[0]}
          height={size[1]}
          x={x}
          y={y}
          scaleX={scaleX}
          scaleY={scaleY}
          draggable={draggable}
          onDragEnd={onDragEnd}
          isSelected={isSelected}
          onClick={() => (isTransformable ? onSelect() : null)}
          onTransformEnd={() => {
            const node = imgRef.current;
            onTransformEnd(name, node.scaleX(), node.scaleY());
          }}
        />
      </Group>
    </>
  );
};

export default ImageCanvas;
