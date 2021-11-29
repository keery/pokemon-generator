import React from "react";
import { Skeleton, AspectRatio } from "@chakra-ui/react";

const CardThumbnailSkeleton = () => {
  return (
    <AspectRatio ratio={500 / 700} pos="relative">
      <Skeleton borderRadius="1rem" />
    </AspectRatio>
  );
};

export default CardThumbnailSkeleton;
