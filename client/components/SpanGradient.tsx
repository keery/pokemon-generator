import React, { useState, useRef, useEffect } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

interface SpanGradientProps extends FlexProps {
  words: string[];
}
const SpanGradient = ({ words, ...rest }: SpanGradientProps) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isActive, setActive] = useState(true);

  useInterval(() => {
    setActive(true);
    if (wordIndex + 1 >= words.length) {
      setWordIndex(0);
    } else {
      setWordIndex(wordIndex + 1);
    }
  }, 4000);

  return (
    <Flex
      display="inline-flex"
      onClick={() => {
        setActive(!isActive);
      }}
      as="div"
      {...rest}
      style={
        {
          // WebkitTextFillColor: "transparent",
          // WebkitBackgroundClip: "text",
          // WebkitTextStrokeColor: "#000",
          // WebkitTextStrokeWidth: "3px",
          // color: "transparent",
          // background: "-webkit-linear-gradient(#eee, #333)",
        }
      }
      overflow="hidden"
    >
      <AnimatePresence initial={false}>
        {words.map((word, i) => (
          <Flex key={word}>
            {wordIndex === i &&
              word.split("").map((letter, index) => (
                <motion.div
                  key={word + letter + index}
                  initial={{
                    y: 200,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: index * 0.03,
                      ease: "easeInOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                  }}
                >
                  {letter}
                </motion.div>
              ))}
          </Flex>
        ))}
      </AnimatePresence>
    </Flex>
  );
};

export default SpanGradient;
