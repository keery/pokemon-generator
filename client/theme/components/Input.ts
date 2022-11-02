const Input = {
  parts: ["field"],
  variants: {
    outline: {
      field: {
        borderRadius: "sm",
        bgColor: "rgb(255 255 255 / 30%)",
        borderColor: "#bdccde",
        _hover: {
          borderColor: "#77b2f5",
        },
        _focus: {
          boxShadow: "0px 0px 9px #a0c2ff !important",
          border: "1px solid #fefeff",
        },
      },
    },
    nes: {
      field: {
        borderRadius: "none",
        borderStyle: "solid",
        borderWidth: "4px",
        fontSize: "xs",
        backgroundColor: "white",
        borderImageSlice: 2,
        borderImageWidth: 2,
        borderImageSource: `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>')`,
        borderImageOutset: 2,
        width: "calc(100% - 8px)",
        padding: ".5rem 1rem",
        margin: "4px",
        backgroundClip: "padding-box",
      },
    },
  },
};

export default Input;
