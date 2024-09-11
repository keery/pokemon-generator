import React, { useState } from "react";
import { HStack } from "@chakra-ui/react";
import CardModalAction from "~components/Gallery/CardModal/CardModalAction";
import Print from "public/assets/img/print.svg";
import Facebook from "public/assets/img/facebook.svg";
import Twitter from "public/assets/img/twitter.svg";
import Email from "public/assets/img/email.svg";
import { Card } from "~@types/Card";
import { useTranslation } from "next-i18next";
import { onPrintCard, getUrlToDisplayCard } from "~utils/card";

enum Actions {
  PRINT = "print",
  TWITTER = "twitter",
  FACEBOOK = "facebook",
  EMAIL = "email",
}

interface Props {
  card: Card;
}

const CardModalActions = ({ card }: Props) => {
  const { t } = useTranslation("gallery");
  const [active, setActive] = useState(null);

  const onFacebook = () => {
    const currentUrl = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      "_ blank"
    );
  };

  const onTwitter = () => {
    const currentUrl = encodeURIComponent(`
      ${t("modal.shareSocial", {
        name: card.name,
        href: window.location.href,
      })} Check this out! I created ${card.name} my new pokemon card ${
      window.location.href
    }`);

    window.open(
      `https://twitter.com/intent/tweet?text=${currentUrl}`,
      "_ blank"
    );
  };

  const onEmail = () => {
    const currentUrl = encodeURIComponent(
      `Check this out! I created ${card.name} my new pokemon card ${window.location.href}`
    );

    window.open(`mailto:?body=${currentUrl}`);
  };

  return (
    <HStack
      spacing={{
        base: "0.5rem",
        md: "1rem",
      }}
      mt={{
        base: 4,
        lg: 0,
      }}
    >
      <CardModalAction
        name={Actions.PRINT}
        onClick={() => {
          const cardUrl = getUrlToDisplayCard(card);
          onPrintCard(cardUrl);
        }}
        onHover={setActive}
        isHidden={active !== null && active !== Actions.PRINT}
      >
        <Print />
      </CardModalAction>
      <CardModalAction
        name={Actions.FACEBOOK}
        onClick={onFacebook}
        onHover={setActive}
        isHidden={active !== null && active !== Actions.FACEBOOK}
      >
        <Facebook />
      </CardModalAction>
      <CardModalAction
        name={Actions.TWITTER}
        onClick={onTwitter}
        onHover={setActive}
        isHidden={active !== null && active !== Actions.TWITTER}
      >
        <Twitter />
      </CardModalAction>
      <CardModalAction
        name={Actions.EMAIL}
        onClick={onEmail}
        onHover={setActive}
        isHidden={active !== null && active !== Actions.EMAIL}
      >
        <Email />
      </CardModalAction>
    </HStack>
  );
};

export default CardModalActions;
