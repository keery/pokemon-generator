import React from "react";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/next-js";
import { useLocale } from "next-intl";

const Link = (props: LinkProps) => {
  const locale = useLocale();
  const { children, href, as, shallow = false, style = {}, ...rest } = props;

  return (
    <ChakraLink
      href={`/${locale}${href}`}
      shallow={shallow}
      as={as}
      style={style}
      color="main"
      fontWeight="bold"
      {...rest}
      _focus={{
        outline: "none",
      }}
    >
      {children}
    </ChakraLink>
  );
};
export default Link;
