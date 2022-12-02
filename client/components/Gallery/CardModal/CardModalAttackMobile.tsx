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

const CardModalAttackMobile = ({
  type,
  amount,
  name,
  description,
  damage,
}: Props) => {
  return (
    <Flex
      layerStyle="glassModal"
      w="100%"
      padding="1rem 1.5rem 1rem 1rem"
      borderRadius="0.8rem"
      width="100%"
      justifyContent="space-between"
    >
      <Flex flexDir="column">
        <Flex alignItems="center">
          <Flex height="fit-content" mr="0.8rem">
            <CardAttackElement element={type} amount={amount} />
          </Flex>
          <Text
            fontWeight="800"
            fontSize="1.4rem"
            wordBreak="break-word"
            noOfLines={2}
          >
            {name}
          </Text>
        </Flex>

        <Flex flexDirection="column" w="100%" mt=".5rem">
          {description && (
            <Text noOfLines={{ base: 10, lg: 4 }} wordBreak="break-word">
              {description}
            </Text>
          )}
        </Flex>
      </Flex>
      {damage && (
        <Flex pl="1.5rem" ml="1.5rem" borderLeft="1px solid #a0aebf">
          <Text
            whiteSpace="nowrap"
            fontSize={{
              base: "2.2rem",
              md: "2.6rem",
            }}
            fontWeight="200"
            alignSelf="center"
            w={{
              base: "3.4rem",
              md: "4.5rem",
            }}
            textAlign="center"
          >
            {damage}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default CardModalAttackMobile;
