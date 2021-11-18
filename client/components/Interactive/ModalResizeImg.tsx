import React, { useState, useMemo } from "react";
import Modal from "~components/Modal";
import { Box, Button, AspectRatio } from "@chakra-ui/react";
import { Layer, Stage, Group, Rect, Line } from "react-konva";
import ImageCanvas from "~components/Card/ImageCanvas";
import { useWatch, useFormContext } from "react-hook-form";
import { useTranslation } from "next-i18next";

interface Props {
  name: string;
  modalName: string;
  onClose: () => void;
  originalHeight: number;
  originalWidth: number;
}

const HEIGHT_IMG_AREA = 266;
const WIDTH_IMG_AREA = 305;
const GLOBAL_HEIGHT = 350;
const GLOBAL_WIDTH = 400;
const PADDING_X = 47.5;
const PADDING_Y = 42;

const ModalResizeImg = ({
  name,
  modalName,
  onClose,
  originalWidth,
  originalHeight,
}: Props) => {
  const strechWidthRatio = useMemo(
    () => WIDTH_IMG_AREA / originalWidth,
    [originalWidth]
  );
  const strechHeightRatio = useMemo(
    () => HEIGHT_IMG_AREA / originalHeight,
    [originalHeight]
  );
  const { control, setValue } = useFormContext();
  const { t } = useTranslation("generator");
  const [
    picture,
    pictureX,
    pictureY,
    pictureScaleY,
    pictureScaleX,
    pictureRotation,
  ] = useWatch({
    control,
    name: [
      `${name}`,
      `${name}X`,
      `${name}Y`,
      `${name}ScaleX`,
      `${name}ScaleY`,
      `${name}Rotation`,
    ],
  });
  const [coord, setCoord] = useState({
    x: pictureX * strechWidthRatio,
    y: pictureY * strechHeightRatio,
    scaleX: pictureScaleX,
    scaleY: pictureScaleY,
    rotation: pictureRotation,
  });

  const onDragEnd = (event) => {
    const { x, y, rotation, scaleX, scaleY } = event.target.attrs;
    setCoord({
      x,
      y,
      scaleX,
      scaleY,
      rotation,
    });
  };

  const onSubmit = () => {
    const reduceWidthRatio = originalWidth / WIDTH_IMG_AREA;
    const reduceHeightRatio = originalHeight / HEIGHT_IMG_AREA;

    setValue(`${name}X`, coord.x * reduceWidthRatio);
    setValue(`${name}Y`, coord.y * reduceHeightRatio);
    onClose();
  };

  return (
    <Modal
      title={t("resizeImg")}
      name={modalName}
      onClose={onClose}
      footer={
        <>
          <Button variant="line" cursor="pointer" onClick={onClose}>
            {t("common:cancel")}
          </Button>
          <Button ml={3} cursor="pointer" onClick={onSubmit}>
            {t("common:confirm")}
          </Button>
        </>
      }
      withCloseButton
    >
      <AspectRatio
        ratio={GLOBAL_WIDTH / GLOBAL_HEIGHT}
        className="resize-stage"
        borderRadius="sm"
        overflow="hidden"
      >
        <Stage width={GLOBAL_WIDTH} height={GLOBAL_HEIGHT}>
          <Layer>
            <Group x={PADDING_X} y={PADDING_Y}>
              <ImageCanvas
                noClip
                src={picture}
                prefixPath=""
                x={coord.x}
                y={coord.y}
                draggable
                name={name}
                maxWidth={WIDTH_IMG_AREA + 10}
                maxHeight={HEIGHT_IMG_AREA + 10}
                width={WIDTH_IMG_AREA}
                height={HEIGHT_IMG_AREA}
                clipHeight={HEIGHT_IMG_AREA}
                clipWidth={WIDTH_IMG_AREA}
                clipY={0}
                clipX={0}
                scaleX={pictureScaleX}
                scaleY={pictureScaleY}
                rotation={pictureRotation}
                onDragEnd={onDragEnd}
                isTransformable
                t={t}
              />
              <Line
                x={0}
                y={0}
                stroke="#000000"
                strokeWidth={2}
                dash={[8, 8]}
                points={[
                  0,
                  0,
                  WIDTH_IMG_AREA,
                  0,
                  WIDTH_IMG_AREA,
                  HEIGHT_IMG_AREA,
                  0,
                  HEIGHT_IMG_AREA,
                  0,
                  0,
                ]}
              />
            </Group>
            <Rect
              x={0}
              y={0}
              width={PADDING_X}
              height={GLOBAL_HEIGHT}
              fill="#000000"
              opacity={0.5}
            />
            <Rect
              x={GLOBAL_WIDTH - PADDING_X}
              y={0}
              width={PADDING_X}
              height={GLOBAL_HEIGHT}
              fill="#000000"
              opacity={0.5}
            />
            <Rect
              x={PADDING_X - 0.2}
              y={0}
              width={GLOBAL_WIDTH - PADDING_X * 2 + 0.4}
              height={PADDING_Y}
              fill="#000000"
              opacity={0.5}
            />
            <Rect
              x={PADDING_X - 0.2}
              y={GLOBAL_HEIGHT - PADDING_Y}
              width={GLOBAL_WIDTH - PADDING_X * 2 + 0.4}
              height={PADDING_Y}
              fill="#000000"
              opacity={0.5}
            />
          </Layer>
        </Stage>
      </AspectRatio>
    </Modal>
  );
};

export default ModalResizeImg;
