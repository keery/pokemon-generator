const Tooltip = {
  baseStyle: ({ colorMode }) => ({
    borderRadius: colorMode === "dark" ? "none" : "sm",
    bgColor: "gray.700",
    color: "white",
    fontSize: colorMode === "dark" ? "xs" : "md",
    boxShadow: "none",
  }),
  defaultProps: {},
  variants: {},
  sizes: {},
};

export default Tooltip;
