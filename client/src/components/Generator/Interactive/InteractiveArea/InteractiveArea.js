import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const InteractiveArea = ({
  name,
  x,
  y,
  height,
  width,
  children,
  setSelected,
}) => {
  return (
    <motion.div
      layoutId={`area-${name}`}
      style={{
        position: 'absolute',
        border: '2px transparent',
        cursor: 'pointer',
        left: `${x}%`,
        top: `${y}%`,
        height: `${height}%`,
        width: `${width}%`,
        backgroundColor: 'rgba(0, 0, 0, 0.54)',
      }}
      // _hover: {{,
      //   backgroundColor: 'rgba(0, 0, 0, 0.54)',
      //   border: '2px dashed',
      //   borderColor: 'yellow.600',
      // }}
      onClick={() => setSelected(name)}
    >
      {/* <Box
        pos="absolute"
        border="2px transparent"
        cursor="pointer"
        left={`${x}%`}
        top={`${y}%`}
        height={`${height}%`}
        width={`${width}%`}
        backgroundColor="rgba(0, 0, 0, 0.54)"
        _hover={{
          backgroundColor: 'rgba(0, 0, 0, 0.54)',
          border: '2px dashed',
          borderColor: 'yellow.600',
        }}
        onClick={() => setSelected(name)}
      > */}
      {children}
      {/* </Box> */}
    </motion.div>
  )
}

InteractiveArea.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
}

InteractiveArea.defaultProps = {
  x: 0,
  y: 0,
  height: 5,
  width: 100,
}

export default InteractiveArea
