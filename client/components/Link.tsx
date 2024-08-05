"use client";
import React from "react";
import { LinkProps as NextLinkProps } from "next/link";
import { Link as NextLink, LinkProps } from "@chakra-ui/next-js";
import { useTranslations } from "next-intl";

export interface Props
  extends Omit<LinkProps, "href" | "as">,
    Pick<NextLinkProps, "href" | "as"> {
  shallow?: boolean;
  style?: React.CSSProperties;
}

const Link = (props: Props) => {
  const t = useTranslations();
  const { children, href, as, shallow = false, style = {}, ...rest } = props;

  return (
    <NextLink
      href={href}
      shallow={shallow}
      style={style}
      color="main"
      fontWeight="bold"
      {...rest}
      _focus={{
        outline: "none",
      }}
    >
      {children}
    </NextLink>
  );
};
export default Link;
