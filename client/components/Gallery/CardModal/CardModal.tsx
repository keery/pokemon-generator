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
  VStack,
  Text,
} from "@chakra-ui/react";
import CardModalOverlay from "~components/Gallery/CardModal/CardModalOverlay";
import CardModalAction from "~components/Gallery/CardModal/CardModalAction";
import CardElement from "~components/Gallery/CardElement";
import CardModalAttribute from "~components/Gallery/CardModal/CardModalAttribute";
import CardImage from "~components/Gallery/CardImage";
import { cardModalAtom } from "~atoms/card-modal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Card } from "~@types/Card";
import { getSeoCardDescription } from "~utils/card";
import { NextSeo } from "next-seo";
import Print from "public/assets/img/print.svg";
import Facebook from "public/assets/img/facebook.svg";
import Twitter from "public/assets/img/twitter.svg";
import Instagram from "public/assets/img/instagram.svg";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";
import { ROUTE_GALLERY } from "~constants";
import Router from "next/router";
import LikeButton from "~components/Gallery/LikeButton";
import { QUERY_KEY } from "~hooks/useInfiniteCards";
import { cardAtom } from "~atoms/card";

interface Props {
  card: Card;
  queryKey: any[];
  indexPage: number;
}

const dateToText = (date) => {
  return format(new Date(date), "dd MMMM yyyy", { locale: fr }).toLowerCase();
};

const CardModal = ({ card, queryKey, indexPage }: Props) => {
  const setCard = useSetRecoilState(cardModalAtom);
  const onClose = () => {
    setCard({ card: null, queryKey: null, indexPage: null });
    Router.push(ROUTE_GALLERY, null, { shallow: true });
  };

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
          <Flex justifyContent="space-between" w="100%">
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
            <CloseButton fontSize="1.9rem" onClick={onClose} />
          </Flex>
          <Flex w="100%" flex={1}>
            <Flex
              direction="column"
              pr="7rem"
              justifyContent="space-between"
              h="100%"
              w="65%"
            >
              <Box>
                <Text>Créé le {dateToText(card.created_at)}</Text>
                <VStack alignItems="flex-start" pt="2rem" spacing="1rem">
                  <CardModalAttribute
                    label="Type"
                    value={<CardElement element={card.element} />}
                  />
                  <CardModalAttribute
                    isAttack
                    label="Attaque n°1"
                    value={card.attack1Name ?? card.attack2Name}
                    description={
                      card.attack1Description ?? card.attack2Description
                    }
                  />
                  <CardModalAttribute
                    isAttack
                    label="Attaque n°2"
                    value={card.attack2Name}
                    description={card.attack2Description}
                  />
                  <CardModalAttribute
                    label="Description"
                    description={card.description}
                  />
                </VStack>
              </Box>
              <Box>
                <Flex
                  borderBottom="1px solid"
                  borderColor="gray.400"
                  alignItems="center"
                  mb="1.5rem"
                  pb="1.5rem"
                >
                  <LikeButton
                    card={card}
                    queryKey={queryKey}
                    indexPage={indexPage}
                  />
                </Flex>
                <HStack spacing="1rem">
                  <CardModalAction onClick={() => null}>
                    <Print />
                  </CardModalAction>
                  <CardModalAction onClick={() => null}>
                    <Facebook />
                  </CardModalAction>
                  <CardModalAction onClick={() => null}>
                    <Instagram />
                  </CardModalAction>
                  <CardModalAction onClick={() => null}>
                    <Twitter />
                  </CardModalAction>
                </HStack>
              </Box>
            </Flex>
            <Flex flex={1}>
              <AspectRatio
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
