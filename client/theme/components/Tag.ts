const Tag = {
  variants: {
    subtle: {
      container: {
        fontSize: 'sm',
        px: 2,
        textTransform: 'capitalize',
        borderRadius: 'md',
      },
    },
  },
  sizes: {
    sm: {
      container: {
        borderRadius: 0,
        lineHeight: 1.9,
      },
    },
    md: {
      container: {
        py: 1.5,
        letterSpacing: 'wide',
        borderRadius: 'sm',
      },
    },
  },
}

export default Tag
