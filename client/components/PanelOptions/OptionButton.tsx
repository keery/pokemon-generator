import React, { Fragment, useEffect } from "react";
import {
  Tooltip,
  IconButton,
  IconButtonProps,
  Kbd,
  Flex,
  Text,
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
  useEffect(() => {
    const shortcut = keyboard_shortcut.join("+").toLowerCase();
    Mousetrap.bind(shortcut, (event) => {
      if (!rest.isDisabled) {
        onClick(event);
      }
    });
    return () => {
      Mousetrap.unbind(shortcut);
    };
  }, [rest.isDisabled, onClick]);

  const Button = (
    <IconButton
      icon={icon}
      onClick={onClick}
      color="main"
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

  if (withTooltip)
    return (
      <Tooltip
        hasArrow
        shouldWrapChildren
        label={
          <Flex alignItems="center">
            <Text mr={2}>{label}</Text>
            {keyboard_shortcut.map((key, index) => (
              <Fragment key={key}>
                {index > 0 ? "+" : ""}
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
