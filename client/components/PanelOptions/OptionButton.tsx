import React from "react";
import { Tooltip, IconButton, IconButtonProps } from "@chakra-ui/react";

interface Props extends Omit<IconButtonProps, "aria-label"> {
  icon: JSX.Element;
  label?: string;
  withTooltip?: boolean;
}

const OptionButton = ({
  icon,
  label,
  onClick,
  withTooltip = true,
  ...rest
}: Props) => {
  const Button = (
    <IconButton
      icon={icon}
      onClick={onClick}
      color="main"
      aria-label="icon"
      borderRadius="sm"
      bgColor="transparent"
      _hover={{
        bgColor: "white",
      }}
      fontSize="1.7rem"
      backdropFilter="none"
      border="none"
      {...rest}
    />
  );

  if (withTooltip)
    return (
      <Tooltip hasArrow shouldWrapChildren label={label} aria-label={label}>
        {Button}
      </Tooltip>
    );

  return Button;
};

export default OptionButton;
