import React, { useState, useEffect } from "react";
import { ButtonProps, Icon, Flex } from "@chakra-ui/react";
import Heart from "public/assets/img/heart.svg";
import useLike, { State } from "~hooks/useLike";
import { Card } from "~@types/Card";
import { useQueryClient, InfiniteData } from "react-query";
import { useRecoilState } from "recoil";
import { cardModalAtom } from "~atoms/card-modal";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { QUERY_KEY } from "~hooks/useCard";

interface Props extends ButtonProps {
  card: Card;
  isPage: boolean;
}

const LikeButton = ({ card, isPage, ...rest }: Props) => {
  const { t } = useTranslation("gallery");
  const queryClient = useQueryClient();
  const [{ cachedQuery, onMutate }, setCard] = useRecoilState(cardModalAtom);
  const [isLiked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(card.hasLiked);
  }, [card.id, card.hasLiked]);

  const { mutate } = useLike({
    onMutate: async () => {
      if (!isPage) {
        setCard((c) => {
          return {
            ...c,
            card: {
              ...c.card,
              likes: isLiked ? c.card.likes - 1 : c.card.likes + 1,
            },
          };
        });
      }
      if (!cachedQuery) return;
      const previousValue = onMutate(isLiked, queryClient, cachedQuery, card);

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
    onSuccess: (res) => {
      setLiked(res.state === State.LIKED);

      queryClient.setQueryData<Card>([QUERY_KEY, card.id], {
        ...card,
        likes: res.nb,
      });
    },
  });

  const onClick = async () => {
    mutate({
      cardId: card.id,
    });
  };

  return (
    <motion.div
      style={{
        display: "inline-flex",
        borderRadius: "0.8rem",
        padding: "0.5rem 1.5rem 0.5rem 0.8rem",
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
      onClick={onClick}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        mr="0.4rem"
        w="2.5rem"
        h="2.5rem"
        alignSelf="center"
      >
        <Icon
          as={Heart}
          color={isLiked ? "new.1" : "transparent"}
          w="2.5rem"
          height="1.5rem"
          p="0.1rem"
          strokeWidth="2px"
          stroke={isLiked ? "new.1" : "white"}
        />
      </Flex>
      <Flex flexDirection="column" fontSize="1.2rem" userSelect="none">
        {isLiked ? t("modal.liked") : t("modal.like")}
      </Flex>
    </motion.div>
  );
};

export default LikeButton;
