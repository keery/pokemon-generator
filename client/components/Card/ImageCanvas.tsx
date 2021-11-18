import React, { useState, useEffect, useRef } from "react";
import { Image as KonvaImage, Transformer, Group } from "react-konva";
import useImage from "use-image";
import { calculateAspectRatioFit, getCenter, getDistance } from "~utils/image";

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
  rotation?: number;
  scaleY?: number;
  scaleX?: number;
  clipY?: number;
  clipX?: number;
  noClip?: boolean;
  onSelect?: () => void;
  getImgSize?: (name: string, width: number, height: number) => void;
  isSelected?: boolean;
  onTransformEnd?: (
    name: string,
    scaleX: number,
    scaleY: number,
    rotation: number,
    x: number,
    y: number
  ) => void;
}

const ImageCanvas = ({
  src,
  width = null,
  height = null,
  x,
  y,
  maxHeight = null,
  maxWidth = null,
  prefixPath = "../assets/img/",
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
  rotation = 0,
  onSelect = null,
  isSelected = false,
  onTransformEnd = null,
  getImgSize = null,
  noClip = false,
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
    if (image && maxHeight && maxWidth && !width && !height) {
      const { width: newWidth, height: newHeight } = calculateAspectRatioFit(
        image.width,
        image.height,
        maxWidth,
        maxHeight
      );

      if (getImgSize) getImgSize(name, newWidth, newHeight);
      setSize([newWidth, newHeight]);
    }
  }, [image, width, height]);

  if (!image) return null;

  let lastCenter = null;
  let lastDist = 0;

  return (
    <>
      <Group
        clipWidth={noClip ? 0 : clipWidth}
        clipHeight={noClip ? 0 : clipHeight}
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
          rotation={rotation}
          draggable={draggable}
          onDragEnd={onDragEnd}
          isSelected={isSelected}
          onClick={() => {
            if (isTransformable) {
              onSelect();
            }
          }}
          onTransformEnd={() => {
            const node = imgRef.current;
            onTransformEnd(
              name,
              node.scaleX(),
              node.scaleY(),
              node.attrs.rotation,
              node.attrs.x,
              node.attrs.y
            );
          }}
          onTouchEnd={() => {
            const node = imgRef.current;
            if (!!node.attrs.x) {
              onTransformEnd(
                name,
                node.scaleX(),
                node.scaleY(),
                node.attrs.rotation,
                node.attrs.x,
                node.attrs.y
              );
            }
          }}
          onTouchMove={(e) => {
            if (!isTransformable) return;
            const node = imgRef.current;
            e.evt.preventDefault();
            const touch1 = e.evt.touches[0];
            const touch2 = e.evt.touches[1];

            if (touch1 && touch2) {
              if (node.isDragging()) {
                node.stopDrag();
              }

              const p1 = {
                x: touch1.clientX,
                y: touch1.clientY,
              };
              const p2 = {
                x: touch2.clientX,
                y: touch2.clientY,
              };

              if (!lastCenter) {
                lastCenter = getCenter(p1, p2);
                return;
              }
              const newCenter = getCenter(p1, p2);

              const dist = getDistance(p1, p2);

              if (!lastDist) {
                lastDist = dist;
              }

              // local coordinates of center point
              const pointTo = {
                x: (newCenter.x - node.x()) / node.scaleX(),
                y: (newCenter.y - node.y()) / node.scaleX(),
              };

              const scale = node.scaleX() * (dist / lastDist);

              node.scaleX(scale);
              node.scaleY(scale);

              // calculate new position of the node
              const dx = newCenter.x - lastCenter.x;
              const dy = newCenter.y - lastCenter.y;

              const newPos = {
                x: newCenter.x - pointTo.x * scale + dx,
                y: newCenter.y - pointTo.y * scale + dy,
              };

              node.position(newPos);

              lastDist = dist;
              lastCenter = newCenter;
            }
          }}
        />
      </Group>
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
    </>
  );
};

export default ImageCanvas;
