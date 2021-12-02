import React, { useState } from "react";
import { Button, ButtonProps, Icon, IconProps, Box } from "@chakra-ui/react";
import Heart from "public/assets/img/heart.svg";
import useLike from "~hooks/useLike";
import { Card } from "~@types/Card";
import { useQueryClient } from "react-query";
import { motion } from "framer-motion";

interface Props extends ButtonProps {
  card: Card;
}

const style: IconProps = {
  pos: "absolute",
  top: "50%",
  left: "50%",
};

const variants = {
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0,
  },
};

const LikeButton = ({ card, ...rest }: Props) => {
  const queryClient = useQueryClient();

  const [isLiked, setLiked] = useState(card?.myLikes > 0);

  const { mutate, isLoading } = useLike({
    onMutate: async () => {
      const previousValue = queryClient.getQueryData<Card[]>(["cards"]);

      if (previousValue) {
        queryClient.setQueryData<Card[]>(["cards"], (old: Card[]) => {
          const index = old.findIndex((c) => c.id === card.id);
          if (index === -1) return old;

          const newList = [...old];
          newList[index] = {
            ...newList[index],
            likes: isLiked ? old[index].likes - 1 : old[index].likes + 1,
            myLikes: isLiked ? 0 : 1,
          };

          setLiked(!isLiked);

          return newList;
        });
      }

      return { previousValue, isLiked };
    },
    onError: (
      err,
      variables,
      context: { previousValue: Card[]; isLiked: boolean }
    ) => {
      if (context?.previousValue) {
        queryClient.setQueryData<Card[]>(["cards"], context.previousValue);
        setLiked(context.isLiked);
      }
    },
  });

  return (
    <Box pos="relative">
      <Button
        // isLoading={isLoading}
        onClick={() => {
          mutate({
            cardId: card.id,
          });
        }}
        minW="0"
        variant="unstyled"
        pos="relative"
        color={isLiked ? "#ea4c89" : "#9e9ea7"}
        {...rest}
        cursor="pointer"
        _hover={{
          border: "0 solid transparent",
          boxShadow: "0px 2px 6px #d3d3d3!important",
        }}
        _active={{
          transform: "scale(0.9)",
        }}
        transitionDuration="300ms"
        border={isLiked ? "0 solid transparent" : "1px solid #ccc"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="30px"
        h="30px"
        role="group"
        borderRadius="100%"
      >
        <Box layerStyle="cover" overflow="hidden" borderRadius="100%">
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translateX(-50%) translateY(-50%)",
            }}
            transition={{
              duration: 0.3,
            }}
            initial={{
              opacity: 1,
            }}
            animate={{
              transform: `translateX(-50%) translateY(-50%) scale(${
                isLiked ? 4 : 1
              })`,
            }}
          >
            <Icon
              as={Heart}
              transition="color 200ms, transform 200ms"
              _groupHover={{
                transform: "scale(1.15)",
                color: "#ea4c89",
              }}
              display="flex"
              fontSize="13px"
              className="heart-icon"
            />
          </motion.div>
        </Box>
        {isLiked && (
          <>
            <Box layerStyle="cover">
              <motion.div
                style={{
                  backgroundColor: "#fff",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  borderRadius: "100%",
                  width: "75%",
                  height: "75%",
                }}
                initial={{
                  transform: "translateX(-50%) translateY(-50%) scale(0)",
                }}
                animate={{
                  transform: "translateX(-50%) translateY(-50%) scale(1)",
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.5,
                }}
              />
              <motion.div
                style={{
                  backgroundColor: "#ea4c89",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  borderRadius: "100%",
                  width: "75%",
                  height: "75%",
                }}
                initial={{
                  transform: "translateX(-50%) translateY(-50%) scale(0)",
                }}
                animate={{
                  transform: "translateX(-50%) translateY(-50%) scale(1.1)",
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                }}
              />
              <motion.div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                }}
                initial={{
                  fontSize: 0,
                }}
                animate={{
                  fontSize: "0.8rem",
                }}
              >
                <Icon as={Heart} color="#fff" display="flex" />
              </motion.div>
            </Box>
          </>
        )}
      </Button>
      {isLiked && (
        <>
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              borderRadius: "100%",
              backgroundColor: "#fbc9dc",
              width: "100%",
              height: "100%",
              zIndex: -1,
            }}
            transition={{
              duration: 0.6,
              times: [0, 0.3, 1],
            }}
            initial={{
              opacity: 1,
              transform: "translateX(-50%) translateY(-50%) scale(0)",
            }}
            animate={{
              opacity: [1, 1, 0],
              transform: "translateX(-50%) translateY(-50%) scale(1.8)",
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              borderRadius: "100%",
              backgroundColor: "#f9adca",
              width: "100%",
              height: "100%",
              zIndex: -1,
            }}
            transition={{
              duration: 0.6,
              times: [0, 0.3, 1],
            }}
            initial={{
              opacity: 1,
              transform: "translateX(-50%) translateY(-50%) scale(0)",
            }}
            animate={{
              opacity: [1, 1, 0],
              transform: "translateX(-50%) translateY(-50%) scale(1.5)",
            }}
          />
        </>
      )}
    </Box>
  );
};

export default LikeButton;
