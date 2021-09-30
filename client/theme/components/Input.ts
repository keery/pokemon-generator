const Input = {
  parts: ["field"],
  variants: {
    outline: {
      field: {
        borderRadius: "sm",
        bgColor: "rgb(255 255 255 / 30%)",
        borderColor: "#cacaca",
        _hover: {
          borderColor: "#77b2f5",
        },
        _focus: {
          boxShadow: "0px 0px 2px #868686",
          border: "1px solid white",
        },
      },
    },
  },
};

export default Input;
