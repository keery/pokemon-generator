import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const InteractiveArea = ({
  x,
  y,
  height,
  width,
  children,
  handleClick,
  linkedGroup,
  focusField,
  setItem,
  name,
}) => {
  console.log(name)
  return (
    <Box
      pos="absolute"
      border="2px transparent"
      cursor="pointer"
      left={`${x}%`}
      top={`${y}%`}
      height={`${height}%`}
      width={`${width}%`}
      _hover={{
        backgroundColor: 'rgba(0, 0, 0, 0.54)',
        border: '2px dashed',
        borderColor: 'yellow.600',
      }}
      onClick={() => setItem(name)}
      // onClick={() => handleClick(linkedGroup, focusField)}
    >
      {children}
    </Box>
  )
}

InteractiveArea.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  linkedGroup: PropTypes.string.isRequired,
  focusField: PropTypes.string.isRequired,
}

InteractiveArea.defaultProps = {
  x: 0,
  y: 0,
  height: 5,
  width: 100,
}

export default InteractiveArea
