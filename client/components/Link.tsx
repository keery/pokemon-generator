import React from "react";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useTranslation } from "next-i18next";

export interface Props
  extends Omit<LinkProps, "href" | "as">,
    Pick<NextLinkProps, "href" | "as"> {
  shallow?: boolean;
}

const Link = (props: Props) => {
  const { t } = useTranslation();
  const { children, href, as, shallow = false, ...rest } = props;

  return (
    <NextLink passHref href={href} shallow={shallow} as={t(href as string)}>
      <ChakraLink
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
