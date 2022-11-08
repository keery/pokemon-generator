import React, { useEffect, useState } from "react";
import { Button, ButtonProps, Icon, Box } from "@chakra-ui/react";
import Heart from "public/assets/img/heart.svg";
import useLike from "~hooks/useLike";
import { Card } from "~@types/Card";
import { CachedQuery } from "~@types/CachedQuery";
import { useQueryClient, InfiniteData } from "react-query";
import { setCardListData } from "~utils/setCardListData";

interface Props extends ButtonProps {
  card: Card;
  cachedQuery: CachedQuery;
}

const LikeButtonRound = ({ card, cachedQuery, ...rest }: Props) => {
  const queryClient = useQueryClient();
  const [isLiked, setLiked] = useState(card.hasLiked);

  useEffect(() => {
    setLiked(card.hasLiked);
  }, [card.id, card.hasLiked]);

  const { mutate } = useLike({
    onMutate: async () => {
      if (!cachedQuery) return;
      const previousValue = setCardListData(
        isLiked,
        queryClient,
        cachedQuery,
        card
      );

      setLiked(!isLiked);

      return { previousValue, isLiked };
    },
    onError: (
      err,
      variables,
      context: { previousValue: InfiniteData<Card[]>; isLiked: boolean }
    ) => {
      if (context?.previousValue) {
        queryClient.setQueryData<InfiniteData<Card[]>>(
          cachedQuery.key,
          context.previousValue
        );
        setLiked(context.isLiked);
      }
    },
  });

  return (
    <Box pos="relative">
      <Button
        onClick={() => {
          mutate({
            cardId: card.id,
          });
        }}
        minW="0"
        variant="unstyled"
        pos="relative"
        color={"white"}
        {...rest}
        cursor="pointer"
        _active={{
          transform: "scale(0.9)",
        }}
        transitionDuration="300ms"
        border={"1px solid white"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="2.6rem"
        h="2.6rem"
        role="group"
        borderRadius="100%"
        data-component-name="LikeButtonRound"
      >
        <Box overflow="hidden" layerStyle="cover" borderRadius="100%">
          <Box
            sx={{
              '[data-component-name="LikeButtonRound"]:hover &': {
                opacity: 1,
              },
            }}
            transition="opacity 200ms ease-in-out"
            borderRadius="100%"
            layerStyle="cover"
            opacity={isLiked ? 1 : 0}
            filter="blur(4px)"
            boxShadow="rgb(255 255 255 / 60%) 0px 0px 0px 0.5px inset, rgb(250 112 154) 8px 8px 0px 0px inset, rgb(120 75 160) 16px 16px 0px 0px inset, rgb(43 134 197) 35px 35px 0px 0px inset"
          />
        </Box>
        <Icon
          as={Heart}
          transition="color 200ms, transform 200ms"
          sx={{
            '[data-component-name="LikeButtonRound"]:hover &': {
              transform: "scale(1.15)",
            },
          }}
          display="flex"
          fontSize="1rem"
          className="heart-icon"
          zIndex="9"
        />
      </Button>
    </Box>
  );
};

export default LikeButtonRound;
