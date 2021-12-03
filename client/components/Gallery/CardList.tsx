import React, { useState } from "react";
import useCards from "~hooks/useCards";
import {
  SimpleGrid,
  SimpleGridProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import CardThumbnailSkeleton from "~components/Gallery/CardThumbnailSkeleton";
import { Flex, Circle, Text } from "@chakra-ui/react";
import LikesCounter from "~components/Gallery/LikesCounter";
import CardThumbnail from "~components/Gallery/CardThumbnail";
import SortList from "~components/Gallery/SortList";

const CardList = (props: SimpleGridProps) => {
  const [sort, setSort] = useState("created_at,DESC");
  const { isLoading, data } = useCards(null, {
    sort,
  });
  const nbSkeleton = useBreakpointValue({ base: 6, sm: 8, md: 12, lg: 16 });

  return (
    <>
      <SortList onChange={setSort} />
      <SimpleGrid columns={4} spacingX={6} spacingY={8} {...props}>
        <>
          {isLoading
            ? Array.from(Array(nbSkeleton)).map((n, i) => (
                <CardThumbnailSkeleton key={`skeleton-${i}`} />
              ))
            : data.map((card) => (
                <Flex direction="column" key={card.id}>
                  <CardThumbnail card={card} />
                  <Flex
                    pt={2}
                    px={1}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Flex alignItems="center">
                      <Circle
                        size="25px"
                        bg="linear-gradient(to right top, rgb(6, 249, 168), rgb(168, 6, 249))"
                        mr={2}
                        border="2px solid white"
                        boxShadow="rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px"
                      />
                      <Text fontSize="xs" fontWeight="bold">
                        Guillaume E.
                      </Text>
                    </Flex>
                    <LikesCounter card={card} />
                  </Flex>
                </Flex>
              ))}
        </>
      </SimpleGrid>
    </>
  );
};

export default CardList;
