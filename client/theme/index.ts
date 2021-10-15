// @ts-nocheck
import { extendTheme } from "@chakra-ui/react";
import {
  Button,
  Select,
  Tag,
  Container,
  Divider,
  Input,
  Textarea,
  Spinner,
  Kbd,
} from "./components";

const theme = extendTheme({
  styles: {
    global: {
      h1: {
        fontSize: "5xl",
        fontWeight: "900",
      },
    },
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, serif",
    nes: '"Press Start 2P"',
  },
  fontSizes: {
    xs: "12px",
    sm: ".925rem",
    md: "1rem",
    lg: "1.2rem",
    xl: "1.35rem",
    "2xl": "1.6rem",
    "3xl": "2.15rem",
  },
  colors: {
    main: "#516fb3",
    main2: "#f4e8fb",
    text: "#3b434c",
  },
  radii: {
    xs: "0.3rem",
    sm: "0.5rem",
    md: "2rem",
  },
  shadows: {},
  components: {
    Button,
    Container,
    Select,
    Tag,
    Divider,
    Input,
    Textarea,
    Spinner,
    Kbd,
  },
  textStyles: {},
  breakpoints: {},
  gradient: {},
  space: {
    full: "-1.5rem",
    px: "1px",
    0: "0",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    22: "5.5rem",
    24: "6rem",
    26: "6.5rem",
    28: "7rem",
    30: "7.5rem",
    32: "8rem",
    34: "8.5rem",
    36: "9rem",
    38: "9.5rem",
    40: "10rem",
    42: "10.5rem",
    44: "11rem",
    46: "11.5rem",
    48: "12rem",
    50: "12.5rem",
    52: "13rem",
    54: "13.5rem",
    56: "14rem",
    58: "14.5rem",
    60: "15rem",
    62: "15.5rem",
    64: "16rem",
  },
  layerStyles: {
    glass: {
      backdropFilter: "blur(8px) saturate(180%)",
      bgColor: "rgb(255 255 255 / 25%)",
      border: "1px solid rgb(255 255 255 / 60%)",
    },
    "neuro-flat": {
      backgroundColor: "#e0e0e0",
      boxShadow: "5px 5px 10px #cccccc, -5px -5px 10px #f4f4f4",
    },
    "neuro-inset": {
      backgroundColor: "#e0e0e0",
      boxShadow: "inset 5px 5px 10px #cccccc, inset -5px -5px 10px #f4f4f4",
    },
    disabled: {
      opacity: 0.4,
      pointerEvents: "none",
    },
  },
});

export default extendTheme(theme);
