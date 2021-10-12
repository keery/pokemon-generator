const Textarea = {
  variants: {
    outline: {
      bgColor: "rgb(255 255 255 / 30%)",
      borderColor: "#cacaca",
      borderRadius: "sm",
      maxH: "180px",
      minH: "110px",
      _hover: {
        borderColor: "#77b2f5",
      },
      _focus: {
        boxShadow: "0px 0px 9px #a0c2ff !important",
        border: "1px solid #fefeff",
      },
    },
  },
};

export default Textarea;
