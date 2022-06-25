import React, { useState, useMemo, useEffect } from "react";
import Modal from "~components/Modal";
import { Button, AspectRatio, Flex, useColorModeValue } from "@chakra-ui/react";
import { Layer, Stage, Group, Line } from "react-konva";
import ImageCanvas from "~components/Card/ImageCanvas";
import { useWatch, useFormContext } from "react-hook-form";
import { useTranslation } from "next-i18next";

interface Props {
  name: string;
  modalName: string;
  onClose: () => void;
  resizeModalConf: {
    originalWidth: number;
    originalHeight: number;
    heightImgArea: number;
    widthImgArea: number;
    width: number;
    height: number;
  };
}

const ModalResizeImg = ({
  name,
  modalName,
  onClose,
  resizeModalConf: {
    originalWidth,
    originalHeight,
    width,
    height,
    heightImgArea,
    widthImgArea,
  },
}: Props) => {
  const strechWidthRatio = useMemo(
    () => widthImgArea / originalWidth,
    [originalWidth, widthImgArea]
  );
  const strechHeightRatio = useMemo(
    () => heightImgArea / originalHeight,
    [originalHeight, heightImgArea]
  );
  const paddingX = (width - widthImgArea) / 2;
  const paddingY = (height - heightImgArea) / 2;
  const { control, setValue } = useFormContext();
  const { t } = useTranslation("generator");

  const [
    picture,
    pictureX,
    pictureY,
    pictureScaleY,
    pictureScaleX,
    pictureWidth,
    pictureHeight,
    pictureRotation,
  ] = useWatch({
    control,
    name: [
      `${name}`,
      `${name}X`,
      `${name}Y`,
      `${name}ScaleX`,
      `${name}ScaleY`,
      `${name}Width`,
      `${name}Height`,
      `${name}Rotation`,
    ],
  });

  const [coord, setCoord] = useState({
    x: pictureX * strechWidthRatio,
    y: pictureY * strechHeightRatio,
    scaleX: pictureScaleX,
    scaleY: pictureScaleY,
    rotation: pictureRotation,
    width: pictureWidth * strechWidthRatio,
    height: pictureHeight * strechHeightRatio,
  });

  useEffect(() => {
    setCoord((s) => ({
      ...s,
      x: pictureX * strechWidthRatio,
      y: pictureY * strechHeightRatio,
      width: pictureWidth * strechWidthRatio,
      height: pictureHeight * strechHeightRatio,
    }));
  }, [pictureWidth, pictureHeight, pictureY, pictureX]);

  const onDragEnd = (event) => {
    const { x, y, rotation, scaleX, scaleY } = event.target.attrs;
    setCoord((s) => ({
      ...s,
      x,
      y,
      scaleX,
      scaleY,
      rotation,
    }));
  };

  const onTransformEnd = (
    name,
    scaleX: number,
    scaleY: number,
    rotation: number,
    x: number,
    y: number
  ) => {
    setCoord((s) => ({
      ...s,
      x,
      y,
      scaleX,
      scaleY,
      rotation,
    }));
  };

  const onSubmit = () => {
    const reduceWidthRatio = originalWidth / widthImgArea;
    const reduceHeightRatio = originalHeight / heightImgArea;

    setValue(`${name}X`, coord.x * reduceWidthRatio);
    setValue(`${name}Y`, coord.y * reduceHeightRatio);
    setValue(`${name}ScaleX`, coord.scaleX);
    setValue(`${name}ScaleY`, coord.scaleY);
    setValue(`${name}Rotation`, coord.rotation);
    onClose();
  };

  const deleteFile = () => {
    setValue(name, null);
    onClose();
  };

  const variantRemove = useColorModeValue("outline", "nes-button-red");
  const variantConfirm = useColorModeValue("glass", "nes-button-blue");
  const colorDeleteButton = useColorModeValue("#fb6565!important", "white");
  const borderRadius = useColorModeValue("sm", "none");
  const layerStyle = useColorModeValue("", "nes-container");

  return (
    <Modal
      title={t("resizeImg")}
      name={modalName}
      onClose={onClose}
      footer={
        <Flex justifyContent="space-between" w="100%">
          <Button
            color={colorDeleteButton}
            cursor="pointer"
            onClick={deleteFile}
            variant={variantRemove}
          >
            {t("remove")}
          </Button>
          <Flex>
            <Button
              ml={3}
              cursor="pointer"
              onClick={onSubmit}
              variant={variantConfirm}
            >
              {t("common:confirm")}
            </Button>
          </Flex>
        </Flex>
      }
      withCloseButton
    >
      <AspectRatio
        ratio={width / height}
        className="resize-stage"
        borderRadius={borderRadius}
        overflow="hidden"
        transform="translateZ(1)"
        layerStyle={layerStyle}
      >
        <Stage width={width} height={height}>
          <Layer>
            <Group x={paddingX} y={paddingY}>
              <ImageCanvas
                onMouseEnter={(e) => {
                  const container = e.target.getStage().container();
                  container.style.cursor = "move";
                }}
                onMouseLeave={(e) => {
                  const container = e.target.getStage().container();
                  container.style.cursor = "default";
                }}
                noClip
                src={picture}
                prefixPath=""
                x={coord.x}
                y={coord.y}
                draggable
                name={name}
                maxWidth={widthImgArea + 10}
                maxHeight={heightImgArea + 10}
                width={coord.width}
                height={coord.height}
                clipHeight={heightImgArea}
                clipWidth={widthImgArea}
                clipY={0}
                clipX={0}
                scaleX={pictureScaleX}
                scaleY={pictureScaleY}
                rotation={pictureRotation}
                onDragEnd={onDragEnd}
                onTransformEnd={onTransformEnd}
                isTransformable
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
                  widthImgArea,
                  0,
                  widthImgArea,
                  heightImgArea,
                  0,
                  heightImgArea,
                  0,
                  0,
                ]}
              />
            </Group>
            <Line
              x={0}
              y={0}
              stroke="#000000"
              fill="#000000"
              opacity={0.5}
              closed
              points={[
                0,
                0,
                paddingX,
                0,
                paddingX,
                height - paddingY,
                paddingX + widthImgArea,
                paddingY + heightImgArea,
                paddingX + widthImgArea,
                paddingY,
                paddingX,
                paddingY,
                paddingX,
                0,
                width,
                0,
                width,
                height,
                0,
                height,
                0,
                0,
              ]}
            />
          </Layer>
        </Stage>
      </AspectRatio>
    </Modal>
  );
};

export default ModalResizeImg;
