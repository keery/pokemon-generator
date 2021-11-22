const Button = {
  baseStyle: {
    fontWeight: "500",
    borderRadius: "none",
    lineHeight: 1,
    _hover: {
      textDecoration: "none",
    },
    _focus: {
      boxShadow: "none",
    },
  },
  defaultProps: {
    colorScheme: "blue",
  },
  variants: {
    solid: {
      borderRadius: "xl",
      _hover: {
        opacity: 0.8,
      },
    },
    line: {
      _hover: {
        opacity: 0.8,
      },
    },
    "nes-button": {
      layerStyle: "nes-button",
      bgColor: "white",
      fontSize: "0.8rem",
    },
    "nes-button-red": {
      layerStyle: "nes-button",
      fontSize: "0.8rem",
      color: "white",
      backgroundColor: "#e76e55",
      _after: {
        content: '""',
        position: "absolute",
        top: "-4px",
        right: "-4px",
        bottom: "-4px",
        left: "-4px",
        boxShadow: "inset -4px -4px #8c2022",
      },
      _hover: {
        bgColor: "#ce372b",
        _after: {
          boxShadow: "inset -6px -6px #8c2022",
        },
      },
    },
    "nes-button-blue": {
      layerStyle: "nes-button",
      fontSize: "0.8rem",
      color: "white",
      backgroundColor: "#209cee",
      _after: {
        content: '""',
        position: "absolute",
        top: "-4px",
        right: "-4px",
        bottom: "-4px",
        left: "-4px",
        boxShadow: "inset -4px -4px #006bb3",
      },
      _hover: {
        bgColor: "#108de0",
        _after: {
          boxShadow: "inset -6px -6px #006bb3",
        },
      },
    },
  },
  sizes: {
    md: {
      fontSize: "14px",
      letterSpacing: ".5px",
    },
    sm: {
      fontWeight: "400",
      borderRadius: "sm",
      fontSize: "12px",
      px: "16px",
      letterSpacing: ".4px",
    },
    lg: {
      height: "52px",
    },
  },
};

export default Button;
