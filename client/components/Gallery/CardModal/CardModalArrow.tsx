import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { cardModalAtom } from "~atoms/card-modal";
import { useSetRecoilState } from "recoil";
import { getHrefCardModal } from "~utils/card";
import Router from "next/router";
import { motion } from "framer-motion";
import useKeybordShortcut from "~hooks/useKeybordShortcut";

interface Props {
  isDisabled: boolean;
  direction: "prev" | "next";
  setModalAnimation: (anim: string) => void;
  setArrowAnimation: (anim: string) => void;
  arrowAnimation: string;
  onClick: () => any;
  children: React.ReactNode;
  setDisabled: (isDisabled: boolean) => void;
  keyboardShortcut: string[];
}

const CardModalArrow = ({
  children,
  isDisabled,
  onClick,
  setModalAnimation,
  arrowAnimation,
  setArrowAnimation,
  direction,
  keyboardShortcut,
  setDisabled,
}: Props) => {
  const setCard = useSetRecoilState(cardModalAtom);

  const handleClick = () => {
    setDisabled(true);
    setModalAnimation(`${direction}-leave`);
    setArrowAnimation("leave");
    setTimeout(() => {
      const res = onClick();
      const { href, as } = getHrefCardModal(res.card);
      Router.push(href, as, { shallow: true });
      setCard(res);
      setModalAnimation(`${direction}-arrive`);
      setArrowAnimation("arrive");
    }, 600);

    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };

  useKeybordShortcut({
    isDisabled: isDisabled,
    callback: handleClick,
    keyboardShortcut,
  });

  return (
    <motion.div
      style={{
        zIndex: 1000,
        position: "absolute",
        top: "50%",
        left: direction === "prev" ? 0 : "auto",
        right: direction === "next" ? 0 : "auto",
        translateY: "-50%",
      }}
      initial={{
        opacity: 0,
        x: direction === "next" ? 10 : -10,
      }}
      variants={{
        first: {
          opacity: 1,
          x: 0,
          transition: {
            delay: 0.8,
          },
        },
        arrive: {
          opacity: 1,
          x: 0,
          transition: {
            ease: "easeInOut",
            delay: 0.3,
          },
        },
        leave: {
          opacity: 0,
          x: direction === "next" ? 40 : -40,
        },
      }}
      animate={arrowAnimation}
    >
      <Button
        variant="unstyled"
        disabled={isDisabled}
        opacity={isDisabled ? 0.4 : 1}
        onClick={handleClick}
        color="white"
        fontSize="3.9rem"
        height="fit-content"
        width="2rem"
        _hover={{ opacity: isDisabled ? 0.4 : 0.6 }}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default CardModalArrow;
