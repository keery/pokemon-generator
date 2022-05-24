import React, { useState } from "react";
import { Button, ButtonProps, Icon, Box, Flex } from "@chakra-ui/react";
import Heart from "public/assets/img/heart.svg";
import useLike from "~hooks/useLike";
import { Card } from "~@types/Card";
import { useQueryClient, InfiniteData } from "react-query";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { cardModalAtom } from "~atoms/card-modal";

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
        color="white"
        {...rest}
        cursor="pointer"
        _hover={{
          border: "1px solid white",
        }}
        _active={{
          transform: "scale(0.9)",
        }}
        transitionDuration="300ms"
        border={isLiked ? "1px solid transparent" : "1px solid #ccc"}
        borderColor="gray.400"
        display="flex"
        role="group"
        borderRadius="0.6rem"
        p="2rem 1.2rem"
        fontFamily="title"
        fontSize="2.6rem"
        overflow="hidden"
      >
        <Box pos="relative">
          <motion.div
            transition={{
              duration: 0.3,
            }}
            initial={{
              opacity: 1,
              top: "50%",
            }}
            animate={{
              top: isLiked ? "-100%" : "50%",
            }}
            style={{
              transform: "scale(1) translateY(-50%)",
              position: "absolute",
              left: 0,
            }}
          >
            <Icon
              as={Heart}
              transition="color 200ms, transform 200ms"
              _groupHover={{
                transform: "scale(1.15)",
              }}
              color="#ea4c89"
              display="flex"
              fontSize="1.9rem"
              className="heart-icon"
            />
          </motion.div>
          <Flex alignItems="center">
            {isLiked && (
              <Flex
                as={motion.div}
                pos="relative"
                transition="margin-top ease-in-out 300ms"
                color="#ea4c89"
                justifyContent="center"
                alignItems="center"
                fontSize="2.3rem"
                fontWeight="400"
                mr="0.7rem"
                minW="29px"
                initial={{
                  marginTop: "100px",
                }}
                animate={{
                  marginTop: "0",
                }}
              >
                {card.likes}
              </Flex>
            )}
            <Box fontWeight="200" pos="relative" pl={isLiked ? 0 : "2.5rem"}>
              {isLiked ? `Like${card.likes > 1 ? "s" : ""}` : "Like"}
            </Box>
          </Flex>
        </Box>
      </Button>
    </Box>
  );
};

export default LikeButton;
