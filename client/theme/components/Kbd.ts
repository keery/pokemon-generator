const Kbd = {
  baseStyle: ({ colorMode }) => ({
    borderColor: "#94b1c3",
    borderRadius: colorMode === "dark" ? "none" : "xs",
    textTransform: "uppercase",
    bg: "#2d3748",
    fontSize: "xs",
    my: 1,
    px: 1,
  }),
  defaultProps: {},
  variants: {},
};

export default Kbd;
