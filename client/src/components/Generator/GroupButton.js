import React from 'react'
import { AccordionButton, AccordionIcon, Flex, Text } from '@chakra-ui/react'

const GroupButton = ({ number, label }) => {
  return (
    <AccordionButton w="100%" py={4}>
      <Flex w="100%" alignItems="center">
        <Text color="yellow.500" fontWeight="700" fontSize="1.3rem" mr={4}>
          {number}
        </Text>
        <Text fontWeight="500">{label}</Text>
      </Flex>
      <AccordionIcon />
    </AccordionButton>
  )
}

export default GroupButton
