import React from 'react'
import { Box } from '@chakra-ui/react'

const Shape = ({ color, size }) => (
  <Box
    pos="absolute"
    bgImage={`radial-gradient(50% 50%, ${color}, transparent)`}
    boxSize={size}
    top="0"
  />
)

const ShapeBackground = () => {
  return (
    <Box pos="absolute" left="0" right="0" top="0" bottom="0" z-index="-1">
      <Shape
        color="rgb(220, 193, 228)"
        size="400px"
        left="50%"
        transform="translateX(-40%)"
      />
      <Shape
        color="rgb(230, 155, 108)"
        size="700px"
        left="50%"
        transform="translateX(20%)"
      />
      <Shape color="rgb(244, 206, 148)" size="500px" />
    </Box>
  )
}

export default ShapeBackground
