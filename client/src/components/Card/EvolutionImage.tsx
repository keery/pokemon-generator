import React from "react";
import { useWatch } from "react-hook-form";
import { Group } from "react-konva";
import ImageCanvas from "~src/components/Card/ImageCanvas";

const EvolutionImage = ({
  control,
  updateImgPos,
  isSelected,
  onSelect,
  updateScale,
  updateImgSize,
}) => {
  const [
    evolvePicture,
    evolvePictureX,
    evolvePictureY,
    evolvePictureScaleY,
    evolvePictureScaleX,
    evolvePictureRotation,
  ] = useWatch({
    control,
    name: [
      "evolvePicture",
      "evolvePictureX",
      "evolvePictureY",
      "evolvePictureScaleY",
      "evolvePictureScaleX",
      "evolvePictureRotation",
    ],
  });

  if (!Boolean(evolvePicture)) return null;

  return (
    <Group
      width={66}
      height={60}
      y={55}
      x={43}
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
        isTransformable
        isSelected={isSelected}
        src={evolvePicture}
        y={evolvePictureY}
        x={evolvePictureX}
        scaleX={evolvePictureScaleX}
        scaleY={evolvePictureScaleY}
        rotation={evolvePictureRotation}
        onSelect={onSelect}
        maxWidth={61}
        maxHeight={53}
        name="evolvePicture"
        onDragEnd={updateImgPos}
        onTransformEnd={updateScale}
        updateImgSize={updateImgSize}
        draggable
        prefixPath=""
        clipWidth={61}
        clipHeight={53}
        clipY={0}
        clipX={0}
      />
    </Group>
  );
};

export default EvolutionImage;
