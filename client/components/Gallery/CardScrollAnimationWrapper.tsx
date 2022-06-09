import React from "react";
import { CachedQuery, Card } from "~@types";
import CardThumbnail from "~components/Gallery/CardThumbnail";
import { motion, useTransform, useViewportScroll } from "framer-motion";

interface Props {
  card: Card;
  layoutPrefix?: string;
  cachedQuery: CachedQuery;
  listOffsetTop: number;
  lineNumber: number;
  cardHeight: number;
  spacingLine: number;
  columnNumber: number;
}

const CardScrollAnimationWrapper = ({
  card,
  cachedQuery,
  layoutPrefix = "",
  listOffsetTop,
  lineNumber,
  cardHeight,
  spacingLine,
  columnNumber,
}: Props) => {
  const { scrollY } = useViewportScroll();

  const startingPoint =
    listOffsetTop + (cardHeight + spacingLine) * lineNumber + columnNumber * 15;
  const range = [startingPoint, startingPoint + 150];

  const y = useTransform(scrollY, range, [350, 0]);
  const opacity = useTransform(scrollY, range, [0, 1]);

  return (
    <motion.div
      style={{
        y,
        opacity,
        flex: 1,
      }}
      className="CardScrollAnimationWrapper"
    >
      <CardThumbnail
        card={card}
        cachedQuery={cachedQuery}
        layoutPrefix={layoutPrefix}
      />
    </motion.div>
  );
};

export default CardScrollAnimationWrapper;
