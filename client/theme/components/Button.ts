import { GRADIENTS, GRADIENTS_COLOR } from "~constants";

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
      bgColor: "new.1",
      borderRadius: "2rem",
      color: "white",
      _hover: {
        bgColor: "new.1",
        opacity: 0.8,
      },
      _active: {
        bgColor: "new.1",
      },
    },
    outline: {
      color: "#bad3ff",
      borderRadius: "xl",
      bg: "transparent",
      overflow: "hidden",
      _hover: {
        bg: "transparent",
        _after: {
          left: "100%",
        },
      },
      _after: {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        zIndex: 2,
        background:
          "linear-gradient( 120deg, transparent, rgba(255,255,255, 0.4), transparent )",
        transition: "all 650ms",
      },
      _active: {
        bg: "transparent",
        transform: "scale(0.95)",
        color: "#bad3ff",
      },
    },
    glass: {
      bg: "white",
      color: GRADIENTS_COLOR.water,
      pos: "relative",
      overflow: "hidden",
      borderRadius: "xl",
      _before: {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        bg: GRADIENTS.water,
        color: GRADIENTS_COLOR.water,
        zIndex: 1,
        borderRadius: "xl",
      },
      _after: {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        zIndex: 2,
        background:
          "linear-gradient( 120deg, transparent, rgba(255,255,255, 0.4), transparent )",
        transition: "all 650ms",
      },
      _hover: {
        boxShadow: "1px 1px 25px 0px rgb(34 34 34 / 11%)",
        _disabled: {
          bg: "white",
        },
        _after: {
          left: "100%",
        },
      },
      _disabled: {
        opacity: 0.6,
      },
      _active: {
        transform: "scale(0.95)",
        _before: {
          bg: GRADIENTS.water,
          color: GRADIENTS_COLOR.water,
        },
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
