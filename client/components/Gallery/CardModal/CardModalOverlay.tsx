import React from "react";
import { motion } from "framer-motion";
import Link from "~components/Link";
import { ROUTE_GALLERY } from "~constants";

interface Props {
  onClose: () => void;
}

const CardModalOverlay = ({ onClose }: Props) => {
  return (
    <motion.div
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, delay: 0.15 }}
      style={{
        cursor: "pointer",
        pointerEvents: "auto",
        zIndex: 1000,
        position: "fixed",
        background: "rgb(0 0 0 / 33%)",
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
