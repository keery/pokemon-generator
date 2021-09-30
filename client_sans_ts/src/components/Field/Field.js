import PropTypes from 'prop-types'
import { FormLabel, FormControl } from '@chakra-ui/react'
import React from 'react'

const Field = ({ label, children }) => (
  <FormControl py={1}>
    <FormLabel>{label}</FormLabel>
    {children}
  </FormControl>
)

Field.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Field
