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
  Container,
  useTheme,
  VStack,
  Text,
  useBreakpointValue,
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
import { dateToText } from "~utils/helper";
import { NextSeo } from "next-seo";
import { ROUTE_GALLERY } from "~constants";
import Router from "next/router";
import ReportButton from "~components/Gallery/CardModal/ReportButton";
import useKeybordShortcut from "~hooks/useKeybordShortcut";
import { CachedQuery } from "~@types/CachedQuery";
import { useTranslation, Trans } from "next-i18next";
import dynamic from "next/dynamic";

const LikeButton = dynamic(() => import("~components/Gallery/LikeButton"), {
  ssr: false,
});

interface Props {
  card: Card;
  cachedQuery: CachedQuery;
  isPage?: boolean;
}

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

export const modalStyles = {
  height: "calc(100% - 3rem)",
  borderTopRightRadius: "4rem",
  borderTopLeftRadius: "4rem",
  color: "white",
};

export const CardModalContent = ({ card, animation, isPage = false }) => {
  const { t, i18n } = useTranslation("gallery");
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
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
        paddingTop: "2rem",
        paddingBottom: "1.6rem",
        alignItems: "flex-start",
        position: "relative",
        maxWidth: "80rem",
        flexDirection: "column",
        gap: 0,
      }}
    >
      <Container display="flex" flexDirection="column" h="100%">
        <Flex
          justifyContent="space-between"
          w="100%"
          opacity="0"
          animation={`${fadeAnimation} 200ms`}
          alignSelf="center"
          alignItems={{
            base: "flex-start",
            sm: "center",
          }}
          flexDir={{
            base: "column",
            sm: "row",
          }}
        >
          <Heading
            as={motion.h1}
            fontFamily="title"
            fontWeight="800"
            fontSize={{
              base: "2.7rem",
              sm: "3.8rem",
              md: "4.2rem",
            }}
            layerStyle="ellipsis"
            pt="0.3rem"
            pr={{
              base: 0,
              sm: "2rem",
            }}
            lineHeight={{
              base: "0.9",
              md: "1",
              lg: "1.33",
            }}
            mb={{ base: 2, sm: 0 }}
            variants={getNextPrevAnimation(0, 1)}
            animate={animation}
            width={{ base: "100%", sm: "auto" }}
          >
            {card.name}
          </Heading>
          {isMobile && <LikeButton card={card} isPage={isPage} minW="8rem" />}
        </Flex>
        <Flex
          w="100%"
          flex={1}
          opacity="0"
          animation={`${fadeAnimation} 300ms`}
        >
          <Flex
            direction="column"
            pr={{
              base: 0,
              lg: "7rem",
            }}
            justifyContent="space-between"
            h="auto"
            w={{
              base: "100%",
              lg: "65%",
            }}
            as={motion.div}
            variants={getNextPrevAnimation(0, 1)}
            animate={animation}
          >
            <Flex direction="column" flex={1}>
              <Flex direction="column">
                {!isMobile && (
                  <Text fontWeight="300">
                    <Trans
                      i18nKey="gallery:modal.created"
                      values={{
                        date: dateToText(card.created_at, i18n.language),
                        author: card.author,
                      }}
                      components={{
                        b: <b />,
                      }}
                    />
                  </Text>
                )}
                {isMobile && (
                  <Flex
                    my={{
                      base: 3,
                      md: 8,
                    }}
                    as={motion.div}
                    variants={getNextPrevAnimation(1, 0)}
                    animate={animation}
                    w="100%"
                    alignSelf="center"
                    maxW="30rem"
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
                )}
                <HStack
                  mt="1rem"
                  pb="2rem"
                  alignItems="center"
                  spacing="2rem"
                  divider={<Box h="3rem" w="1px" borderColor="#a0aebf" />}
                  justifyContent="space-between"
                >
                  <CardModalAttribute
                    label={t("modal.type")}
                    value={<CardElement element={card.element} mt="0.2rem" />}
                  />
                  <CardModalAttribute label="HP" value={card.hp} />
                  <CardModalAttribute
                    label={t("modal.likes")}
                    value={card.likes ?? 0}
                  />
                </HStack>
              </Flex>
              <Flex
                direction="column"
                overflowY={isPage ? "unset" : "auto"}
                height={isPage ? "auto" : "0"}
                flex="1 1 0"
              >
                {isMobile && (
                  <Text fontWeight="300" mb={3}>
                    <Trans
                      i18nKey="gallery:modal.created"
                      values={{
                        date: dateToText(card.created_at, i18n.language),
                        author: card.author,
                      }}
                      components={{
                        b: <b />,
                      }}
                    />
                  </Text>
                )}
                {card.description && (
                  <Box>
                    <Text fontWeight="800" mr="0.8rem" fontSize="1.4rem">
                      {t("modal.description")}
                    </Text>
                    <Text noOfLines={{ base: 0, md: 4 }} fontWeight="300">
                      {card.description}
                    </Text>
                  </Box>
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
              </Flex>
            </Flex>
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
                <ReportButton card={card} />
                {!isMobile && <LikeButton card={card} isPage={isPage} />}
              </Flex>
            </Box>
          </Flex>
          {!isMobile && (
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
          )}
        </Flex>
      </Container>
    </Flex>
  );
};

const CardModal = ({ card, cachedQuery }: Props) => {
  const [animation, setAnimation] = useState("");
  const setCard = useSetRecoilState(cardModalAtom);
  const theme = useTheme();
  const onClose = () => {
    setCard({ card: null, cachedQuery: null, onMutate: null });
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
          zIndex: 900,
          position: "fixed",
          left: "0",
          right: "0",
          ...modalStyles,
          ...theme.layerStyles.darkBlur,
        }}
        exit={{ top: "100%", opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.4 }}
      >
        <CloseButton
          pos="absolute"
          zIndex={1001}
          top="2rem"
          right="3.5rem"
          fontSize="1.9rem"
          onClick={onClose}
          _hover={{ opacity: 0.6 }}
        />
        <CardModalContent card={card} animation={animation} />
        {cachedQuery && typeof cachedQuery?.indexPage !== "undefined" && (
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
    // @ts-ignore
    <AnimatePresence>
      {query.idCard && card && (
        <CardModal card={card} cachedQuery={cachedQuery} key="card-modal" />
      )}
    </AnimatePresence>
  );
};

export default Wrapper;
