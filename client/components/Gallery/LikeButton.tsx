import React, { useState, useEffect } from "react";
import { ButtonProps, Icon, Flex } from "@chakra-ui/react";
import Heart from "public/assets/img/heart.svg";
import useLike, { State } from "~hooks/useLike";
import Button from "~components/Button";
import { Card } from "~@types/Card";
import { useQueryClient, InfiniteData } from "react-query";
import { useRecoilState } from "recoil";
import { cardModalAtom } from "~atoms/card-modal";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { QUERY_KEY } from "~hooks/useCard";

interface Props extends ButtonProps {
  card: Card;
  isPage: boolean;
}

const LikeButton = ({ card, isPage, ...rest }: Props) => {
  const t = useTranslations();
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
    <Button
      onClick={onClick}
      layerColors={["new.1", "new.4", "new.3"]}
      color="white"
      p="0 1.7rem 0 1rem"
      display="flex"
      hasNoText
      {...rest}
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
          color={isLiked ? "new.4" : "transparent"}
          w="2.5rem"
          height="1.5rem"
          p="0.1rem"
          strokeWidth="2px"
          stroke={isLiked ? "new.4" : "white"}
        />
      </Flex>
      <Flex flexDirection="column" fontSize="1.2rem" userSelect="none">
        {isLiked ? t("modal.liked") : t("modal.like")}
      </Flex>
    </Button>
  );
};

export default LikeButton;
