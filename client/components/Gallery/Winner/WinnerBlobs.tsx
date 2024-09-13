import React from "react";
import { WATER } from "~constants";
import { Card } from "~@types/Card";
import { Element } from "~@types/CardGenerator";
import { motion, useTransform, useScroll } from "framer-motion";
import { screenPercent } from "~utils/helper";
import { END_ROTATION, START_ROTATION } from "~components/Gallery/HoloCard";

interface Props {
  winner: Card;
}

const BLOB_GRADIENTS: Record<Element, string[]> = {
  fire: [
    "linear-gradient(rgb(255 47 47 / 42%) 31.77%, rgb(247 109 109) 100%)",
    "linear-gradient(rgb(255 183 117 / 49%) 26.56%, rgb(255 170 153) 100%)",
  ],
  grass: [
    "linear-gradient(rgb(47 255 74 / 42%) 31.77%, rgb(109 247 169) 100%)",
    "linear-gradient(rgb(117 255 171 / 49%) 26.56%, rgb(220 255 153) 100%)",
  ],
  water: [
    "linear-gradient(rgb(64 47 255 / 42%) 31.77%, rgb(109 178 247) 100%)",
    "linear-gradient(rgb(98 229 255 / 49%) 26.56%, rgb(41 150 255) 100%)",
  ],
  electric: [
    "linear-gradient(rgb(255 222 0 / 42%) 31.77%, rgb(255 224 43) 100%)",
    "linear-gradient(rgb(233 169 8 / 49%) 26.56%, rgb(255 185 56) 100%)",
  ],
  psychic: [
    "linear-gradient(rgb(255 0 181 / 42%) 31.77%, rgb(172 6 177) 100%)",
    "linear-gradient(rgb(237 195 241 / 49%) 26.56%, rgb(194 126 215) 100%)",
  ],
  fighting: [
    "linear-gradient(rgb(255 148 0 / 42%) 31.77%, rgb(177 77 6) 100%)",
    "linear-gradient(rgb(255 255 255 / 49%) 26.56%, rgb(255 175 50) 100%)",
  ],
  normal: [
    "linear-gradient(rgb(120 142 221 / 42%) 31.77%, rgb(170 148 194) 100%)",
    "linear-gradient(rgb(90 209 230 / 49%) 26.56%, rgb(227 172 255) 100%)",
  ],
};

const WinnerBlobs = ({ winner }: Props) => {
  const element = winner ? winner.element : WATER;
  const { scrollY } = useScroll();
  const start = screenPercent(START_ROTATION);

  const x1 = useTransform(
    scrollY,
    [start, screenPercent(END_ROTATION)],
    [-300, 0]
  );
  const x2 = useTransform(
    scrollY,
    [start, screenPercent(END_ROTATION)],
    [-200, 0]
  );
  const y = 70;
  const y1 = useTransform(
    scrollY,
    [0, start, screenPercent(END_ROTATION + 20)],
    [screenPercent(y), screenPercent(y), screenPercent(y + 40)]
  );
  const y2 = useTransform(
    scrollY,
    [0, start, screenPercent(END_ROTATION + 20)],
    [screenPercent(y), screenPercent(y), screenPercent(y + 40)]
  );
  const opacity = useTransform(
    scrollY,
    [start, screenPercent(END_ROTATION)],
    [0, 1]
  );

  return (
    <>
      <motion.div
        style={{
          x: x1,
          y: y1,
          opacity,
          width: "500px",
          height: "500px",
          background: BLOB_GRADIENTS[element][0],
          position: "absolute",
          top: "0",
          left: "200px",
          zIndex: 5,
          borderRadius:
            "36.0512% 63.9488% 65.7321% 34.2679% / 51.0107% 53.7726% 46.2274% 48.9893%",
        }}
      />
      <motion.div
        style={{
          x: x2,
          y: y2,
          opacity,
          width: "500px",
          height: "500px",
          background: BLOB_GRADIENTS[element][1],
          position: "absolute",
          top: "0",
          left: "250px",
          zIndex: 5,
          borderRadius:
            "56.4253% 43.5747% 33.7529% 66.2471% / 52.5661% 47.8477% 52.1523% 47.4339%",
        }}
      />
    </>
  );
};

export default WinnerBlobs;
