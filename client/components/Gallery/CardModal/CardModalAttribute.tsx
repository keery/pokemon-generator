import React from "react";
import { Flex, Text, Box, StyleProps } from "@chakra-ui/react";

interface Props extends StyleProps {
  label: string;
  value?: string | JSX.Element;
  description?: string | JSX.Element;
  isAttack?: boolean;
}

const CardModalAttribute = ({
  label,
  value = null,
  description = null,
  isAttack,
  ...rest
}: Props) => {
  if (!value && !description) {
    return null;
  }

  return (
    <Flex direction="column" {...rest}>
      <Flex alignItems="center">
        <Text fontWeight="800" fontFamily="title" fontSize="1.5rem">
          {isAttack && description ? value : label}:
        </Text>
        {value && (!isAttack || (isAttack && !description)) && (
          <Box marginLeft="0.5rem">{value}</Box>
        )}
      </Flex>
      {description && <Text>{description}</Text>}
    </Flex>
  );
};

export default CardModalAttribute;
