import React, { useState, useEffect, useRef, useCallback } from "react";
import { Image as KonvaImage, Transformer, Group } from "react-konva";
import { Html } from "react-konva-utils";
import { useDisclosure } from "@chakra-ui/react";
import useImage from "use-image";
import useLongPress from "~hooks/useLongPress";
import { calculateAspectRatioFit } from "~utils/helper";
import PressMenu from "~components/PressMenu";
import Trash from "public/assets/img/trash.svg";
import Resize from "public/assets/img/resize.svg";
import { TFunction } from "next-i18next";

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
  onSelect?: () => void;
  onDelete?: () => void;
  isSelected?: boolean;
  t?: TFunction;
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
  width,
  height,
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
  onDelete = null,
  t,
}: Props) => {
  const [size, setSize] = useState([width, height]);
  const [isDragging, setDragging] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);
  const trRef = useRef(null);
  const imgRef = useRef(null);
  const [image] = useImage(`${prefixPath}${src}`, "anonymous");
  const { onOpen, onClose, isOpen: menuIsOpen } = useDisclosure();

  const onLongPress = useCallback(
    (e) => {
      if (isDragging) return;
      if (
        e.type === "touchstart" ||
        e.type === "touchmove" ||
        e.type === "touchend" ||
        e.type === "touchcancel"
      ) {
        setMenuPosition(e.currentTarget.pointerPos);
      }
      onOpen();
    },
    [isDragging]
  );

  const longPressEvent = useLongPress(onLongPress);

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
          rotation={rotation}
          draggable={draggable}
          onDragStart={() => {
            setMenuPosition(null);
            setDragging(true);
          }}
          onDragEnd={(event) => {
            setDragging(false);
            onDragEnd(event);
          }}
          isSelected={isSelected}
          onTap={() => {
            if (isTransformable) {
              onSelect();
            }
          }}
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
          {...longPressEvent}
        />
        {isTransformable && (
          <Html>
            <PressMenu
              position={menuPosition}
              onClose={onClose}
              isOpen={menuIsOpen}
              items={[
                { name: t("remove"), icon: <Trash />, onClick: onDelete },
                { name: t("resize"), icon: <Resize />, onClick: onSelect },
              ]}
            />
          </Html>
        )}
      </Group>
    </>
  );
};

export default ImageCanvas;
