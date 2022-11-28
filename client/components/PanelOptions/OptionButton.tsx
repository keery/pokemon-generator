import React, { Fragment, useEffect } from "react";
import {
  Tooltip,
  IconButton,
  IconButtonProps,
  Kbd,
  Flex,
  Text,
  Box,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import Mousetrap from "mousetrap";

interface Props extends Omit<IconButtonProps, "aria-label"> {
  icon: JSX.Element;
  label?: string;
  withTooltip?: boolean;
  keyboard_shortcut: string[];
}

const OptionButton = ({
  icon,
  label,
  onClick,
  keyboard_shortcut,
  withTooltip = true,
  ...rest
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (isMobile) return;
    const shortcut = keyboard_shortcut.join("+").toLowerCase();
    Mousetrap.bind(shortcut, (event) => {
      if (!rest.isDisabled) {
        onClick(event);
      }
    });
    return () => {
      Mousetrap.unbind(shortcut);
    };
  }, [rest.isDisabled, onClick, isMobile]);

  const Button = (
    <IconButton
      icon={icon}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onClick={(e) => {
        onClick(e);
        onClose();
      }}
      color="new.1"
      aria-label="icon"
      borderRadius="sm"
      bgColor="transparent"
      minW={{ base: "auto", sm: 10 }}
      w="auto"
      h={{ base: "auto", sm: 10 }}
      p={1}
      _hover={{
        bgColor: "white",
      }}
      _active={{
        bgColor: "white",
        transform: "scale(0.9)",
      }}
      fontSize={{ base: "1.4rem", sm: "1.7rem" }}
      backdropFilter="none"
      border="none"
      {...rest}
    />
  );

  if (withTooltip && !isMobile)
    return (
      <Tooltip
        isOpen={isOpen}
        hasArrow={colorMode === "light"}
        shouldWrapChildren
        label={
          <Flex alignItems="center">
            <Text mr={2}>{label}</Text>
            {keyboard_shortcut.map((key, index) => (
              <Fragment key={key}>
                {index > 0 ? (
                  <Box px={0.5} pb={colorMode === "light" ? 0.5 : 0}>
                    +
                  </Box>
                ) : (
                  ""
                )}
                <Kbd>{key}</Kbd>
              </Fragment>
            ))}
          </Flex>
        }
        aria-label={label}
      >
        {Button}
      </Tooltip>
    );

  return Button;
};

export default OptionButton;
