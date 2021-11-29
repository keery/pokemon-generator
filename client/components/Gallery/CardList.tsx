import React from "react";
import useCards from "~hooks/useCards";
import {
  SimpleGrid,
  SimpleGridProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import CardThumbnail from "~components/Gallery/CardThumbnail";
import CardThumbnailSkeleton from "~components/Gallery/CardThumbailSkeleton";

const CardList = (props: SimpleGridProps) => {
  const { isLoading, data } = useCards();
  const nbSkeleton = useBreakpointValue({ base: 6, sm: 8, md: 12, lg: 16 });

  return (
    <SimpleGrid columns={4} spacingX={6} spacingY={8} {...props}>
      {isLoading
        ? Array.from(Array(nbSkeleton)).map(() => <CardThumbnailSkeleton />)
        : data.map((card) => <CardThumbnail key={card.id} card={card} />)}
    </SimpleGrid>
  );
};

export default CardList;
