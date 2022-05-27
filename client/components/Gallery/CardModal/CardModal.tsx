import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import {
  AspectRatio,
  Box,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Icon,
  VStack,
  Text,
} from "@chakra-ui/react";
import CardModalOverlay from "~components/Gallery/CardModal/CardModalOverlay";
import CardModalAttack from "~components/Gallery/CardModal/CardModalAttack";
import CardElement from "~components/Gallery/CardElement";
import CardModalAttribute from "~components/Gallery/CardModal/CardModalAttribute";
import CardModalArrows from "~components/Gallery/CardModal/CardModalArrows";
import CardModalActions from "~components/Gallery/CardModal/CardModalActions";
import CardImage from "~components/Gallery/CardImage";
import { cardModalAtom } from "~atoms/card-modal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Card } from "~@types/Card";
import { getSeoCardDescription } from "~utils/card";
import { NextSeo } from "next-seo";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";
import { ROUTE_GALLERY } from "~constants";
import Router from "next/router";
import LikeButton from "~components/Gallery/LikeButton";
import useKeybordShortcut from "~hooks/useKeybordShortcut";
import Heart from "public/assets/img/heart.svg";
import Report from "public/assets/img/report.svg";
import { CachedQuery } from "~@types/CachedQuery";

interface Props {
  card: Card;
  cachedQuery: CachedQuery;
}

const dateToText = (date) => {
  return format(new Date(date), "dd MMMM yyyy", { locale: fr }).toLowerCase();
};

const fadeAnimation = "appendFade 300ms forwards";

const getNextPrevAnimation = (orderPrev, orderNext) => {
  return {
    "prev-leave": {
      transform: "translateX(20rem)",
      opacity: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.2,
        delay: orderNext * 0.1,
      },
      transitionEnd: {
        transform: "translateX(-20rem)",
      },
    },
    "next-leave": {
      transform: "translateX(-20rem)",
      opacity: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.2,
        delay: orderPrev * 0.1,
      },
      transitionEnd: {
        transform: "translateX(20rem)",
      },
    },
    "prev-arrive": {
      transform: "translateX(0rem)",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        delay: orderNext * 0.15,
      },
    },
    "next-arrive": {
      transform: "translateX(0rem)",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        delay: orderPrev * 0.15,
      },
    },
  };
};

const CardModal = ({ card, cachedQuery }: Props) => {
  const [animation, setAnimation] = useState("");
  const setCard = useSetRecoilState(cardModalAtom);
  const onClose = () => {
    setCard({ card: null, cachedQuery: null });
    Router.push(ROUTE_GALLERY, null, { shallow: true });
  };

  useKeybordShortcut({
    callback: onClose,
    keyboardShortcut: ["esc"],
  });

  return (
    <>
      <NextSeo title={card.name} description={getSeoCardDescription(card)} />
      <CardModalOverlay onClose={onClose} />
      <motion.div
        key="modal"
        className="card-content-container is-open"
        initial={{
          top: "100%",
        }}
        animate={{
          top: "3rem",
        }}
        style={{
          zIndex: 9000,
          position: "fixed",
          left: "0",
          right: "0",
          height: "calc(100% - 3rem)",
          backdropFilter: "blur(25px) saturate(180%)",
          backgroundColor: "rgb(20 27 40 / 60%)",
          borderTopRightRadius: "4rem",
          borderTopLeftRadius: "4rem",
        }}
        exit={{ top: "100%", opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.4 }}
      >
        <Flex
          as={motion.div}
          style={{
            zIndex: 1000,
            pointerEvents: "auto",
            overflow: "hidden",
            width: "100%",
            height: "100%",
            margin: "0 auto",
            display: "flex",
            alignItems: "flex-start",
            position: "relative",
            padding: "2rem 3.5rem",
            flexDirection: "column",
            gap: 0,
            color: "white",
          }}
        >
          <Flex
            justifyContent="space-between"
            w="100%"
            opacity="0"
            animation={`${fadeAnimation} 200ms`}
          >
            <Heading
              as={motion.h1}
              fontFamily="title"
              fontSize="4.2rem"
              fontWeight="800"
              layerStyle="ellipsis"
              pr="2rem"
              variants={getNextPrevAnimation(0, 1)}
              animate={animation}
            >
              {card.name}
            </Heading>
            <CloseButton
              fontSize="1.9rem"
              onClick={onClose}
              _hover={{ opacity: 0.6 }}
            />
          </Flex>
          <Flex w="100%" flex={1}>
            <Flex
              direction="column"
              pr="7rem"
              justifyContent="space-between"
              h="100%"
              w="65%"
              as={motion.div}
              variants={getNextPrevAnimation(0, 1)}
              animate={animation}
            >
              <Box opacity="0" animation={`${fadeAnimation} 300ms`}>
                <Text fontWeight="300">
                  Créé le {dateToText(card.created_at)}
                </Text>
                <HStack
                  mt="1rem"
                  pb="2rem"
                  alignItems="center"
                  spacing="2rem"
                  divider={<Box h="3rem" w="1px" borderColor="#a0aebf" />}
                  justifyContent="space-between"
                >
                  <CardModalAttribute
                    label="Type"
                    value={<CardElement element={card.element} mt="0.2rem" />}
                  />
                  <CardModalAttribute label="HP" value={card.hp} />
                  <CardModalAttribute label="Likes" value={card.likes ?? 0} />
                </HStack>
                {card.description && (
                  <>
                    <Text fontWeight="800" mr="0.8rem" fontSize="1.4rem">
                      Description
                    </Text>
                    <Text noOfLines={4} fontWeight="300">
                      {card.description}
                    </Text>
                  </>
                )}
                <VStack alignItems="flex-start" pt="2rem" spacing="1rem">
                  <CardModalAttack
                    name={card.attack1Name ?? card.attack2Name}
                    damage={card.attack1Damage ?? card.attack2Damage}
                    description={
                      card.attack1Description ?? card.attack2Description
                    }
                    type={card.attack1Type ?? card.attack2Type}
                    amount={card.attack1Amount ?? card.attack2Amount}
                  />
                  <CardModalAttack
                    name={card.attack2Name}
                    damage={card.attack2Damage}
                    description={card.attack2Description}
                    type={card.attack2Type}
                    amount={card.attack2Amount}
                  />
                </VStack>
              </Box>
              <Box opacity="0" animation={`${fadeAnimation} 400ms`}>
                <Flex
                  borderBottom="1px solid"
                  borderColor="gray.400"
                  alignItems="center"
                  mb="1.5rem"
                  pb="1.5rem"
                />
                <Flex justifyContent="space-between" alignItems="center">
                  <CardModalActions card={card} />
                  <LikeButton card={card} cachedQuery={cachedQuery} />
                  {/* <motion.div
                    style={{
                      cursor: "pointer",
                      alignItems: "center",
                      display: "flex",
                      backdropFilter: "blur(15px) saturate(180%)",
                      backgroundColor: "rgb(255 255 255 / 28%)",
                      padding: "0.6rem 1rem",
                      borderRadius: "0.8rem",
                      transitionDuration: "100ms",
                      transitionTimingFunction: "ease-in-out",
                      transitionProperty: "transform",
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
                  >
                    <Icon as={Report} fontSize="1.4rem" />
                    <Box ml="0.3rem">Report card</Box>
                  </motion.div> */}
                </Flex>
              </Box>
            </Flex>
            <Flex
              as={motion.div}
              flex={1}
              flexDirection="column"
              w="100%"
              variants={getNextPrevAnimation(1, 0)}
              animate={animation}
            >
              <AspectRatio
                opacity="0"
                animation={`${fadeAnimation} 300ms`}
                ratio={500 / 700}
                pos="relative"
                w="100%"
                alignSelf="flex-start"
              >
                <CardImage card={card} />
              </AspectRatio>
            </Flex>
          </Flex>
        </Flex>
        {cachedQuery && (
          <CardModalArrows
            cachedQuery={cachedQuery}
            setAnimation={setAnimation}
          />
        )}
      </motion.div>
    </>
  );
};

const Wrapper = () => {
  const { query } = useRouter();
  const { card, cachedQuery } = useRecoilValue(cardModalAtom);

  useEffect(() => {
    if (card) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "inherit";
    }
  }, [card]);

  return (
    <AnimatePresence>
      {query.idCard && card && (
        <CardModal card={card} cachedQuery={cachedQuery} key="card-modal" />
      )}
    </AnimatePresence>
  );
};

export default Wrapper;
