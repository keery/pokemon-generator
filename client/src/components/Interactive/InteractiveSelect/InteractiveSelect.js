import React from 'react'
import PropTypes from 'prop-types'
import { Box, Select } from '@chakra-ui/react'

const InteractiveSelect = ({
  name,
  x,
  y,
  height,
  width,
  choices,
  onChange,
  addClass,
  value,
}) => {
  return (
    <Box
      pos="absolute"
      overflow="hidden"
      left={`${x}%`}
      top={`${y}%`}
      height={`${height}%`}
      width={`${width}%`}
      className={`InteractiveSelect ${addClass}`}
    >
      <Select
        variant="unstyled"
        name={name}
        onChange={onChange}
        value={value}
        position="absolute"
        color="transparent"
        w="125%"
        h="100%"
        right="-25%"
        backgroundColor="transparent"
        border="none"
        textAlign="justify"
        fontFamily="pokehp"
        fontSize="18px"
        border="2px dashed transparent"
        _hover={{
          border: '2px dashed',
          borderColor: 'yellow.600',
        }}
        _focus={{
          border: '2px solid',
          borderColor: 'yellow.600',
        }}
      >
        {choices.map((choice) => (
          <option key={`is-${choice}`}>{choice}</option>
        ))}
      </Select>
      <Box h="100%" w="100%" border="2px dashed transparent" />
    </Box>
  )
}

InteractiveSelect.propTypes = {
  name: PropTypes.string.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  choices: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  addClass: PropTypes.string,
  value: PropTypes.string,
}

InteractiveSelect.defaultProps = {
  x: 0,
  y: 0,
  height: 5,
  width: 100,
  choices: [],
  addClass: '',
  value: '',
}

export default InteractiveSelect
