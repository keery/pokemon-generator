const Button = {
  baseStyle: {
    color: '#2589ec',
  },
  variants: {
    solid: {
      cursor: 'pointer',
      bg: 'blue.500',
      color: 'white',
      background: 'linear-gradient(to left, #ff9349 0%, #ffc27b 100%)',
      transition: 'ease-in-out 0.2s box-shadow',
      padding: '8px',
      fontSize: '1.4rem',
      _hover: {
        boxShadow: '0px 0px 12px #949090',
      },
    },
  },
}

export default Button
