import React from "react";
import { motion } from "framer-motion";
import Link from "~components/Link";
import { ROUTE_GALLERY } from "~constants";
import Router from "next/router";

const CardModalOverlay = () => {
  return (
    <motion.div
      onClick={() => {
        Router.push(ROUTE_GALLERY, null, { shallow: true });
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, delay: 0.15 }}
      style={{
        cursor: "pointer",
        pointerEvents: "auto",
        zIndex: 1000,
        position: "fixed",
        background: "rgba(0, 0, 0, 0.8)",
        willChange: "opacity",
        top: 0,
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "100vw",
      }}
    >
      <Link href={ROUTE_GALLERY} />
    </motion.div>
  );
};

export default CardModalOverlay;
