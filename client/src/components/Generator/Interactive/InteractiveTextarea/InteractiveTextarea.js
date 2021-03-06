import React from 'react'
import PropTypes from 'prop-types'
import { Box, Textarea } from '@chakra-ui/react'

const InteractiveTextarea = ({
  name,
  x,
  y,
  height,
  width,
  fontSize,
  fontFamily,
  value,
  onChange,
}) => {
  return (
    <Box
      pos="absolute"
      left={`${x}%`}
      top={`${y}%`}
      height={`${height}%`}
      width={`${width}%`}
    >
      <Textarea
        variant="unstyled"
        name={name}
        type="text"
        fontSize={`${fontSize}px`}
        fontFamily={fontFamily}
        onChange={onChange}
        value={value}
        borderRadius={0}
        minH="0"
        width="100%"
        border="3px solid transparent"
        height="100%"
        backgroundColor="transparent"
        outline="none"
        resize="none"
        overflow="hidden"
        transition="border ease-in-out 0.08s"
        lineHeight="1"
        color="transparent"
        style={{
          caretColor: 'black',
        }}
        _hover={{
          border: '3px solid #000',
        }}
        _focus={{
          border: '3px solid #000',
        }}
      />
    </Box>
  )
}

InteractiveTextarea.propTypes = {
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

InteractiveTextarea.defaultProps = {
  x: 0,
  y: 0,
  height: 5,
  width: 100,
  fontSize: 16,
  fontFamily: 'pokevolution',
  value: '',
}

export default InteractiveTextarea
