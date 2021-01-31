import React from 'react'
import PropTypes from 'prop-types'
import { Box, Input } from '@chakra-ui/react'

const InteractiveInput = ({
  name,
  x,
  y,
  height,
  width,
  fontSize,
  fontFamily,
  onChange,
  value,
}) => {
  return (
    <Box
      pos="absolute"
      border="2px solid transparent"
      left={`${x}%`}
      top={`${y}%`}
      height={`${height}%`}
      width={`${width}%`}
    >
      <Input
        variant="unstyled"
        w="100%"
        type="text"
        border="2px dashed transparent"
        height="100%"
        color="transparent"
        style={{
          caretColor: 'black',
        }}
        fontSize={`${fontSize}px`}
        fontFamily={fontFamily}
        _hover={{
          border: '2px dashed',
          borderColor: 'yellow.600',
        }}
        _focus={{
          border: '2px solid',
          borderColor: 'yellow.600',
        }}
        onChange={onChange}
        name={name}
        autoComplete="off"
        value={value}
      />
    </Box>
  )
}

InteractiveInput.propTypes = {
  name: PropTypes.string.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  fontSize: PropTypes.number,
  fontFamily: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

InteractiveInput.defaultProps = {
  value: '',
  x: 0,
  y: 0,
  height: 5,
  width: 100,
  fontSize: 15,
  fontFamily: 'pokename',
}

export default InteractiveInput
