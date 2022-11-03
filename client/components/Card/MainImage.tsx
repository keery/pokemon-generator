import React from "react";
import { useWatch, Control } from "react-hook-form";
import { Group } from "react-konva";
import ImageCanvas from "~components/Card/ImageCanvas";

interface Props {
  updateImgPos: (event: any) => void;
  updateScale: (
    name: string,
    scaleX: number,
    scaleY: number,
    rotation: number,
    x: number,
    y: number
  ) => void;
  updateImgSize: (name: string, width: number, height: number) => void;
  onSelect: () => void;
  control: Control;
  isSelected?: boolean;
}

const MainImage = ({
  control,
  updateImgPos,
  updateScale,
  onSelect,
  updateImgSize,
  isSelected = false,
}: Props) => {
  const [
    mainImage,
    mainImageX,
    mainImageY,
    mainImageScaleY,
    mainImageScaleX,
    mainImageRotation,
  ] = useWatch({
    control,
    name: [
      "mainImage",
      "mainImageX",
      "mainImageY",
      "mainImageScaleX",
      "mainImageScaleY",
      "mainImageRotation",
    ],
  });

  if (!Boolean(mainImage)) return null;

  return (
    <Group
      width={400}
      height={280}
      y={88}
      x={60}
      onMouseEnter={(e) => {
        const container = e.target.getStage().container();
        container.style.cursor = "move";
      }}
      onMouseLeave={(e) => {
        const container = e.target.getStage().container();
        container.style.cursor = "default";
      }}
    >
      <ImageCanvas
        src={mainImage}
        prefixPath=""
        maxHeight={280}
        maxWidth={390}
        y={mainImageY}
        x={mainImageX}
        scaleX={mainImageScaleX}
        scaleY={mainImageScaleY}
        rotation={mainImageRotation}
        draggable
        name="mainImage"
        onDragEnd={updateImgPos}
        onTransformEnd={updateScale}
        isTransformable
        isSelected={isSelected}
        updateImgSize={updateImgSize}
        onSelect={onSelect}
        clipWidth={381}
        clipHeight={271}
        clipY={0}
        clipX={-2}
      />
    </Group>
  );
};

export default MainImage;
