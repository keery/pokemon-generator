import React from "react";
import { useWatch } from "react-hook-form";
import { Group } from "react-konva";
import ImageCanvas from "~components/Card/ImageCanvas";

const MainImage = ({ control, updateImgPos, onSelect, isSelected = false }) => {
  const { mainImage, mainImageX, mainImageY } = useWatch({
    control,
    name: ["mainImage", "mainImageX", "mainImageY"],
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
        draggable
        name="mainImage"
        onDragEnd={updateImgPos}
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
