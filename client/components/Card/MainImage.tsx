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
    x: number,
    y: number
  ) => void;
  onSelect: () => void;
  control: Control;
  isSelected?: boolean;
}

const MainImage = ({
  control,
  updateImgPos,
  updateScale,
  onSelect,
  isSelected = false,
}: Props) => {
  const [mainImage, mainImageX, mainImageY, mainImageScaleY, mainImageScaleX] =
    useWatch({
      control,
      name: [
        "mainImage",
        "mainImageX",
        "mainImageY",
        "mainImageScaleX",
        "mainImageScaleY",
      ],
    });

  if (!Boolean(mainImage)) return null;

  return (
    <Group width={400} height={280} y={88} x={60}>
      <ImageCanvas
        src={mainImage}
        prefixPath=""
        maxHeight={280}
        maxWidth={390}
        y={mainImageY}
        x={mainImageX}
        scaleX={mainImageScaleX}
        scaleY={mainImageScaleY}
        draggable
        name="mainImage"
        onDragEnd={updateImgPos}
        onTransformEnd={updateScale}
        isTransformable
        isSelected={isSelected}
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
