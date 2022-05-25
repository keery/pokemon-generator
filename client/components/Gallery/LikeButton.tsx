import React, { useState } from "react";
import { ButtonProps, Icon, Box, Flex } from "@chakra-ui/react";
import Heart from "public/assets/img/heart.svg";
import useLike from "~hooks/useLike";
import { Card } from "~@types/Card";
import { useQueryClient, InfiniteData } from "react-query";
import { useSetRecoilState } from "recoil";
import { cardModalAtom } from "~atoms/card-modal";
import { motion } from "framer-motion";

interface Props extends ButtonProps {
  card: Card;
  queryKey: any[];
  indexPage: number;
}

const LikeButton = ({ card, queryKey, indexPage, ...rest }: Props) => {
  const queryClient = useQueryClient();
  const setCard = useSetRecoilState(cardModalAtom);
  const [isLiked, setLiked] = useState(card?.has_liked > 0);

  const { mutate } = useLike({
    onMutate: async () => {
      const previousValue =
        queryClient.getQueryData<InfiniteData<Card[]>>(queryKey);

      if (previousValue) {
        queryClient.setQueryData<InfiniteData<Card[]>>(queryKey, (old) => {
          const page = old.pages[indexPage];
          const index = page.findIndex((c) => c.id === card.id);

          if (index === -1) return old;

          const newPage = [...page];

          newPage[index] = {
            ...newPage[index],
            likes: isLiked ? page[index].likes - 1 : page[index].likes + 1,
            has_liked: isLiked ? 0 : 1,
          };

          setLiked(!isLiked);

          setCard((c) => {
            return {
              ...c,
              card: {
                ...c.card,
                likes: isLiked ? c.card.likes - 1 : c.card.likes + 1,
              },
            };
          });

          old.pages.splice(indexPage, 1, newPage);

          return {
            pageParams: old.pageParams,
            pages: old.pages,
          };
        });
      }

      return { previousValue, isLiked };
    },
    onError: (
      err,
      variables,
      context: { previousValue: InfiniteData<Card[]>; isLiked: boolean }
    ) => {
      if (context?.previousValue) {
        queryClient.setQueryData<InfiniteData<Card[]>>(
          queryKey,
          context.previousValue
        );
        setLiked(context.isLiked);
      }
    },
  });

  return (
    <motion.div
      style={{
        display: "inline-flex",
        borderRadius: "0.8rem",
        padding: "0.5rem 2.3rem 0.5rem 0.5rem",
        alignItems: "center",
        backdropFilter: "blur(15px) saturate(180%)",
        transitionDuration: "100ms",
        transitionTimingFunction: "ease-in-out",
        transitionProperty: "transform",
        color: "white",
        cursor: "pointer",
        backgroundColor: "rgb(255 255 255 / 28%)",
      }}
      initial={{
        scale: 1,
      }}
      whileTap={{
        scale: 0.9,
      }}
      whileHover={{
        scale: 1.05,
      }}
      onClick={() => {
        mutate({
          cardId: card.id,
        });
      }}
    >
      <Flex
        borderRadius="0.8rem"
        bgColor="myPink"
        justifyContent="center"
        alignItems="center"
        mr="0.9rem"
        w="2.5rem"
        h="2.5rem"
        alignSelf="center"
      >
        <Icon as={Heart} />
      </Flex>
      <Flex flexDirection="column">
        <Box>
          {card.likes}
          {` like${card.likes > 1 ? "s" : ""}`}
        </Box>
      </Flex>
    </motion.div>
  );
};

export default LikeButton;
