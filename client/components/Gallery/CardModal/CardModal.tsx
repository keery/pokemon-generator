import React, { useEffect } from "react";
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
import { QUERY_KEY } from "~hooks/useInfiniteCards";
import { cardAtom } from "~atoms/card";
import Heart from "public/assets/img/heart.svg";
import Report from "public/assets/img/report.svg";

interface Props {
  card: Card;
  queryKey: any[];
  indexPage: number;
}

const dateToText = (date) => {
  return format(new Date(date), "dd MMMM yyyy", { locale: fr }).toLowerCase();
};

const fadeAnimation = "appendFade 300ms forwards";

const CardModal = ({ card, queryKey, indexPage }: Props) => {
  const setCard = useSetRecoilState(cardModalAtom);
  const onClose = () => {
    setCard({ card: null, queryKey: null, indexPage: null });
    Router.push(ROUTE_GALLERY, null, { shallow: true });
  };
  console.log(card);
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
        }}
        exit={{ top: "100%", opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.4 }}
      >
        <Flex
          as={motion.div}
          style={{
            zIndex: 1000,
            pointerEvents: "auto",
            borderTopRightRadius: "4rem",
            borderTopLeftRadius: "4rem",
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
          backdropFilter="blur(25px) saturate(180%)"
          backgroundColor="rgb(20 27 40 / 60%)"
        >
          <Flex
            justifyContent="space-between"
            w="100%"
            opacity="0"
            animation={`${fadeAnimation} 200ms`}
          >
            <Heading
              as="h1"
              fontFamily="title"
              fontSize="4.2rem"
              fontWeight="800"
              layerStyle="ellipsis"
              pr="2rem"
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
                  <CardModalAttribute
                    label="Health Point"
                    value={`${card.hp} HP`}
                  />
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
                  <CardModalActions />
                  <LikeButton
                    card={card}
                    queryKey={queryKey}
                    indexPage={indexPage}
                  />
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
            <Flex flex={1}>
              <motion.div
                style={{
                  width: "100%",
                }}
                initial={{
                  translateY: "16rem",
                }}
                animate={{
                  translateY: 0,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.4,
                }}
              >
                <AspectRatio
                  ratio={500 / 700}
                  pos="relative"
                  w="100%"
                  alignSelf="flex-start"
                >
                  <CardImage card={card} />
                </AspectRatio>
              </motion.div>
            </Flex>
          </Flex>
        </Flex>
      </motion.div>
    </>
  );
};

const Wrapper = () => {
  const { query } = useRouter();
  const { card, indexPage, queryKey } = useRecoilValue(cardModalAtom);

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
        <CardModal
          card={card}
          indexPage={indexPage}
          queryKey={queryKey}
          key="card-modal"
        />
      )}
    </AnimatePresence>
  );
};

export default Wrapper;
