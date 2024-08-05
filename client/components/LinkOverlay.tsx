import React from "react";
import {
  LinkOverlay as LinkOverlayChakra,
  LinkOverlayProps,
} from "@chakra-ui/react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useTranslations } from "next-intl";

export interface Props
  extends Omit<LinkOverlayProps, "href" | "as">,
    Pick<NextLinkProps, "href" | "as"> {
  shallow?: boolean;
}

const LinkOverlay = (props: Props) => {
  const { children, href, as, shallow = false, ...rest } = props;

  return (
    <NextLink passHref href={href} shallow={shallow} as={as}>
      <LinkOverlayChakra
        color="main"
        fontWeight="bold"
        {...rest}
        _focus={{
          outline: "none",
        }}
      >
        {children}
      </LinkOverlayChakra>
    </NextLink>
  );
};
export default LinkOverlay;
