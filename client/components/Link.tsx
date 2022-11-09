import React from "react";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useTranslation } from "next-i18next";

export interface Props
  extends Omit<LinkProps, "href" | "as">,
    Pick<NextLinkProps, "href" | "as"> {
  shallow?: boolean;
  style?: React.CSSProperties;
}

const Link = (props: Props) => {
  const { t } = useTranslation();
  const { children, href, as, shallow = false, style = {}, ...rest } = props;

  return (
    <NextLink href={href} shallow={shallow} as={t(as as string)} style={style}>
      <ChakraLink
        as="span"
        color="main"
        fontWeight="bold"
        {...rest}
        _focus={{
          outline: "none",
        }}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
};
export default Link;
