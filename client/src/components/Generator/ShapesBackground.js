import React from 'react'
import { Box, Circle, Icon } from '@chakra-ui/react'

const Shape = ({ children, ...rest }) => (
  <Icon
    pos="absolute"
    // opacity={0}
    fillRule="evenodd"
    transform="translateX(-50%) translateY(-50%)"
    {...rest}
  >
    {children}
  </Icon>
)

//   #shape-2 {
//     animation-delay: 0.3s;
//   }

//   #shape-3 {
//     animation-delay: 0.6s;
//   }

//   .shape {
//     position: absolute;
//     opacity: 0;
//     transform: translateX(-50%) translateY(-50%);
//     fill-rule: evenodd;
//     animation: appendShape 0.5s forwards;
//   }
const ShapeBackground = () => {
  return (
    <Box pos="absolute" left="0" right="0" top="0" bottom="0" z-index="-1">
      <Shape
        fontSize="30rem"
        viewBox="0 0 839 783"
        left="50%"
        top="39%"
        maxW="440px"
        fill="pink.500"
      >
        <path d="M417,9C581.813,25.749,841,231.508,839,361S745,609.688,669,678,467,857.556,237,708,3,523.361,1,403-11,235.147,125,107,299-2.992,417,9Z" />
      </Shape>
      <Shape
        fontSize="30rem"
        viewBox="0 0 632 669"
        maxW="380px"
        left="60%"
        top="50%"
        fill="violet.500"
      >
        <path d="M386,2c96.9,36.313,196,224.529,212,265s54,103.656,20,162S508,564.756,468,597s-86,93.757-168,64S106,584.7,76,569,0,494.583,0,439,22,270.44,30,226s10-89.626,32-114S188,52.32,254,32,370-4,386,2Z" />
      </Shape>
      <Shape
        fontSize="30rem"
        viewBox="0 0 632 669"
        left="46%"
        top="67%"
        maxW="420px"
        fill="yellow.400"
      >
        <path d="M386,2c96.9,36.313,196,224.529,212,265s54,103.656,20,162S508,564.756,468,597s-86,93.757-168,64S106,584.7,76,569,0,494.583,0,439,22,270.44,30,226s10-89.626,32-114S188,52.32,254,32,370-4,386,2Z" />
      </Shape>
      <Circle
        pos="absolute"
        left="10%"
        top="26%"
        size="130px"
        bg="yellow.400"
      />
      <Circle pos="absolute" left="80%" top="16%" size="30px" bg="violet.500" />
      <Circle pos="absolute" left="92%" top="34%" size="80px" bg="pink.500" />
      <Circle pos="absolute" left="10%" top="26%" size="80px" bg="yellow.400" />
    </Box>
  )
}

export default ShapeBackground
