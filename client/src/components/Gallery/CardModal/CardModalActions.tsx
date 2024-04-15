import React, { useState } from "react";
import { HStack } from "@chakra-ui/react";
import CardModalAction from "~src/components/Gallery/CardModal/CardModalAction";
import Print from "public/assets/img/print.svg";
import Facebook from "public/assets/img/facebook.svg";
import Twitter from "public/assets/img/twitter.svg";
import Email from "public/assets/img/email.svg";
import { Card } from "~@types/Card";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("gallery");
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

  function ImagetoPrint(source) {
    return (
      "<html><head><scri" +
      "pt>function step1(){\n" +
      "setTimeout('step2()', 10);}\n" +
      "function step2(){window.print();window.close()}\n" +
      "</scri" +
      "pt></head><body onload='step1()'>\n" +
      '<img style="width:6.3cm;" src=\'' +
      source +
      '\' /><img style="width:6.3cm; margin-left:20px;" src="/assets/img/pokemon-card-back.webp" /></body></html>'
    );
  }

  const onPrint = () => {
    const Pagelink = "about:blank";
    const pwa = window.open(Pagelink, "_new");
    pwa.document.open();
    pwa.document.write(ImagetoPrint(card.img));
    pwa.document.close();
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
        onClick={onPrint}
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
