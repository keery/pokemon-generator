import React, { useState } from "react";
import { Box, HStack, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useController, useWatch, Control } from "react-hook-form";
import { Select } from "~@types/Card";

const styleEl = {
  width: "1.8rem",
  height: "1.8rem",
  borderRadius: "100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "50%",
  position: "relative",
  backgroundSize: "contain",
  outline: "none",
};

const styleDeleteBtn = {
  content: '""',
  position: "absolute",
  display: "block",
  backgroundColor: "#c1c1c1",
  left: "50%",
  top: "50%",
  width: "7%",
  height: "50%",
};

const stylePreview: BoxProps = {
  display: "block",
  backgroundPosition: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  boxSizing: "content-box",
};

interface Props {
  name: string;
  x: number;
  y: number;
  size?: number;
  removeButton?: boolean;
  control: Control;
  options: { value: string; label: string }[];
}

const ButtonList = ({
  name,
  x,
  y,
  size = 3,
  options,
  removeButton = true,
  control,
}: Props) => {
  const { field } = useController({ control, name });
  const value = useWatch({ control, name });
  const [isVisible, setVisible] = useState(false);

  return (
    <Box
      className="ButtonList"
      left={`${x}%`}
      top={`${y}%`}
      pos="absolute"
      display="inline-block"
      role="group"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Box
        borderRadius="100%"
        border="2px dashed transparent"
        _hover={{
          border: "2px dashed #fdd705",
        }}
      >
        <Box
          {...stylePreview}
          bgImage={
            Boolean(value) ? `assets/img/1-gen/${value.value}.png)` : null
          }
          height={`${size}rem`}
          width={`${size}rem`}
        />
      </Box>
      {isVisible && (
        <motion.div
          style={{
            position: "absolute",
            bottom: "calc(100% + 15px)",
            left: "50%",
            minWidth: "100%",
            x: "-50%",
          }}
          animate={{
            y: 0,
          }}
          initial={{
            y: "10px",
          }}
        >
          <HStack
            spacing=".3rem"
            backgroundColor="#eff0f1"
            p="10px 20px"
            borderRadius="8px"
            boxShadow="0px 0px 11px #d5d5d5"
            display="inline-flex"
            _before={{
              content: '""',
              display: "block",
              position: "absolute",
              left: "0",
              right: "0",
              height: "30px",
              top: "100%",
            }}
          >
            {removeButton && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ outline: "none" }}
              >
                <Box
                  {...styleEl}
                  backgroundColor="#fff"
                  transition="box-shadow ease-in-out .1s"
                  border="1px solid #d8d8d8"
                  _before={{
                    ...styleDeleteBtn,
                    transform:
                      "translateX(-50%) translateY(-50%) rotate(45deg)",
                  }}
                  _after={{
                    ...styleDeleteBtn,
                    transform:
                      "translateX(-50%) translateY(-50%) rotate(-45deg)",
                  }}
                  onClick={() => field.onChange(null)}
                />
              </motion.button>
            )}
            {options.map((item) => (
              <motion.button
                key={item.value}
                className={item.value}
                style={{
                  ...styleEl,
                  backgroundImage: `url(assets/img/1-gen/${item.value}.png)`,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => field.onChange(item)}
              />
            ))}
          </HStack>
        </motion.div>
      )}
    </Box>
  );
};

export default ButtonList;
