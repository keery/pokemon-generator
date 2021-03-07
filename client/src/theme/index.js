import { extendTheme } from '@chakra-ui/react'
import { Input, Button, Accordion, Select, Textarea } from './components'

const overrides = {
  fonts: {
    body: 'Noto Sans Jp, sans-serif',
    heading: 'Noto Sans Jp, serif',
  },
  colors: {
    grey: {
      100: '#f5f8ff',
      500: '#8f9bbd',
    },
    pink: {
      500: '#fbba97',
    },
    blue: {
      50: '#E5F1FF',
      100: '#B8D7FF',
      200: '#8ABDFF',
      300: '#5CA2FF',
      400: '#2E88FF',
      500: '#006EFF',
      600: '#0058CC',
      700: '#004299',
      800: '#002C66',
      900: '#001633',
    },
    violet: {
      50: '#F2EBFA',
      100: '#D9C6F1',
      200: '#C1A1E8',
      300: '#A97CDE',
      400: '#9058D5',
      500: '#b58fe3',
      600: '#6029A3',
      700: '#481F7A',
      800: '#301452',
      900: '#180A29',
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
