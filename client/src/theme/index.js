import { extendTheme } from '@chakra-ui/react'
import { Input, Button, Accordion, Select, Textarea } from './components'

const overrides = {
  colors: {
    grey: {
      100: '#f5f8ff',
      500: '#8f9bbd',
    },
    pink: {
      500: '#fbba97',
    },
    violet: {
      500: '#b58fe3',
    },
    yellow: {
      400: '#fde59d',
      500: '#ffc919',
      600: '#fdd705',
    },
    orange: {
      400: '#fac0a0',
      500: '#fbba97',
      900: '#ff9d54',
      600: '#ff9349',
    },
  },
  components: {
    Input,
    Button,
    Accordion,
    Select,
    Textarea,
  },
}
export default extendTheme(overrides)
