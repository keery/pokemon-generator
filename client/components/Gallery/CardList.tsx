import React, { useState, useRef } from "react";
import useInfiniteCards, { QUERY_KEY } from "~hooks/useInfiniteCards";
import useScrollBottom from "~hooks/useScrollBottom";
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
import Loader from "~components/Loader";

const CardList = (props: SimpleGridProps) => {
  const ref = useRef(null);
  const [sort, setSort] = useState("created_at,DESC");
  const nbSkeleton = useBreakpointValue({ base: 6, sm: 8, md: 12, lg: 16 });
  const queryParams = {
    sort,
    limit: nbSkeleton || 16,
  };

  const { status, isFetchingNextPage, data, fetchNextPage } = useInfiniteCards(
    {
      enabled: Boolean(nbSkeleton),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === nbSkeleton) return allPages.length;
      },
    },
    queryParams
  );

  useScrollBottom(ref, () => {
    fetchNextPage();
  });

  return (
    <>
      <SortList onChange={setSort} />
      <SimpleGrid columns={4} spacingX={8} spacingY={8} {...props} ref={ref}>
        <>
          {status === "loading" || !data ? (
            Array.from(Array(nbSkeleton)).map((n, i) => (
              <CardThumbnailSkeleton key={`skeleton-${i}`} />
            ))
          ) : (
            <>
              {data.pages.map((page, i) =>
                page.map((card) => (
                  <Flex direction="column" key={card.id}>
                    <CardThumbnail
                      card={card}
                      queryKey={[QUERY_KEY, queryParams]}
                      indexPage={i}
                    />
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
                      <LikesCounter
                        card={card}
                        queryKey={[QUERY_KEY, queryParams]}
                        indexPage={i}
                      />
                    </Flex>
                  </Flex>
                ))
              )}
            </>
          )}
        </>
      </SimpleGrid>
      {isFetchingNextPage && <Loader pt={10} />}
    </>
  );
};

export default CardList;
