import React from "react";
import { useWatch } from "react-hook-form";
import { Group } from "react-konva";
import ImageCanvas from "~components/Card/ImageCanvas";

const MainImage = ({ control, updateImgPos }) => {
  const { mainImage, mainImageX, mainImageY } = useWatch({
    control,
    name: ["mainImage", "mainImageX", "mainImageY"],
  });

  if (!Boolean(mainImage)) return null;

  return (
    <Group
      width={400}
      height={280}
      y={88}
      x={60}
      clipWidth={381}
      clipHeight={271}
      clipY={0}
      clipX={-2}
    >
      <ImageCanvas
        src={mainImage}
        // src="https://static01.nyt.com/images/2020/12/14/well/14google-photo/14google-photo-mediumSquareAt3X.jpg"
        prefixPath=""
        maxHeight={280}
        maxWidth={390}
        y={mainImageY}
        x={mainImageX}
        draggable
        name="mainImage"
        onDragEnd={updateImgPos}
      />
    </Group>
  );
};

export default MainImage;
