import React, { useState, useRef, useMemo, useEffect } from "react";
import useInfiniteCards, { QUERY_KEY } from "~hooks/useInfiniteCards";
import useScrollBottom from "~hooks/useScrollBottom";
import {
  SimpleGrid,
  SimpleGridProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import CardThumbnailSkeleton from "~components/Gallery/CardThumbnailSkeleton";
import GlassButton from "~components/GlassButton";
import { Flex, Container } from "@chakra-ui/react";
import CardThumbnail from "~components/Gallery/CardThumbnail";
import SortList from "~components/Gallery/SortList";
import Loader from "~components/Loader";
import { useTranslation } from "next-i18next";
import { setCardListData } from "~utils/setCardListData";

const AUTO_LOADING_LIMIT = 3;

const CardList = (props: SimpleGridProps) => {
  const { t } = useTranslation("gallery");
  const ref = useRef(null);
  const [sort, setSort] = useState("created_at,DESC");
  const [cardHeight, setCardHeight] = useState<number>(0);
  const [loading, setLoading] = useState<number>(0);
  const nbCard = useBreakpointValue({ base: 6, sm: 8, md: 12, lg: 15 });
  const spacingLine = useBreakpointValue({ base: 40 });
  const queryParams = {
    sort,
    limit: nbCard,
  };

  const { status, isFetchingNextPage, data, fetchNextPage, hasNextPage } =
    useInfiniteCards(
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.length === nbCard) return allPages.length;
        },
        onSuccess: () => {
          setLoading(loading + 1);
        },
      },
      queryParams
    );

  const listOffsetTop = useMemo(() => {
    if (!ref || !ref.current) return 0;
    return ref.current.offsetTop - window.innerHeight / 1.15;
  }, [ref, ref.current]);

  useEffect(() => {
    const cards = document.getElementsByClassName("CardScrollAnimationWrapper");
    if (cards && cards.length > 0) {
      setCardHeight(cards[0].clientHeight);
    }
  }, [data]);

  useScrollBottom(ref, fetchNextPage, loading < AUTO_LOADING_LIMIT);

  return (
    <>
      <SortList onChange={setSort} />
      <Container mt={6} pb={10}>
        <SimpleGrid
          columns={3}
          spacingX={8}
          spacingY={`${spacingLine}px`}
          {...props}
          ref={ref}
        >
          <>
            {status === "loading" || !data ? (
              Array.from(Array(nbCard)).map((n, i) => (
                <CardThumbnailSkeleton key={`skeleton-${i}`} />
              ))
            ) : (
              <>
                {data.pages.flat().map((card, index) => {
                  const cachedQuery = {
                    key: [QUERY_KEY, queryParams],
                    indexPage: Math.floor(index / nbCard),
                    indexCard: index % nbCard,
                  };

                  return (
                    <Flex direction="column" key={card.id}>
                      <CardThumbnail
                        card={card}
                        cachedQuery={cachedQuery}
                        onMutate={setCardListData}
                      />
                    </Flex>
                  );
                })}
              </>
            )}
          </>
        </SimpleGrid>
        {hasNextPage && loading >= AUTO_LOADING_LIMIT && (
          <GlassButton
            w="full"
            mt={10}
            isLoading={isFetchingNextPage}
            onClick={() => {
              setLoading(0);
              fetchNextPage();
            }}
          >
            {t("loadMoreCards")}
          </GlassButton>
        )}
      </Container>
      {isFetchingNextPage && <Loader py={10} />}
    </>
  );
};

export default CardList;
