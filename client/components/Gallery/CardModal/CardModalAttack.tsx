import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Element } from "~@types/CardGenerator";
import CardAttackElement from "~components/Gallery/CardAttackElement";

interface Props {
  type: Element;
  amount: string;
  name: string;
  description: string;
  damage: string;
}

const CardModalAttack = ({
  type,
  amount,
  name,
  description,
  damage,
}: Props) => {
  if (!name) return null;
  return (
    <Flex
      layerStyle="glassModal"
      w="100%"
      padding="1rem 1.5rem 1rem 1rem"
      borderRadius="0.8rem"
      width="100%"
    >
      <Flex height="fit-content">
        <CardAttackElement element={type} amount={amount} />
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        ml="1.5rem"
        flex="1"
      >
        <Flex flexDirection="column" w="100%">
          <Text
            fontWeight="800"
            mr="0.8rem"
            fontSize="1.4rem"
            wordBreak="break-word"
            noOfLines={2}
          >
            {name}
          </Text>
          {description && (
            <Text noOfLines={4} wordBreak="break-word">
              {description}
            </Text>
          )}
        </Flex>
      </Flex>
      {damage && (
        <Flex pl="1.5rem" ml="1.5rem" borderLeft="1px solid #a0aebf">
          <Text
            whiteSpace="nowrap"
            fontSize="2.6rem"
            fontWeight="200"
            alignSelf="center"
            w="4.5rem"
            textAlign="center"
          >
            {damage}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default CardModalAttack;
