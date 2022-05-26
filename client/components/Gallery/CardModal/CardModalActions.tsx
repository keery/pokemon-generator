import React, { useState } from "react";
import { HStack } from "@chakra-ui/react";
import CardModalAction from "~components/Gallery/CardModal/CardModalAction";
import Print from "public/assets/img/print.svg";
import Facebook from "public/assets/img/facebook.svg";
import Twitter from "public/assets/img/twitter.svg";
import Instagram from "public/assets/img/instagram.svg";

enum Actions {
  PRINT = "print",
  TWITTER = "twitter",
  FACEBOOK = "facebook",
  INSTAGRAM = "instagram",
}

const CardModalActions = () => {
  const [active, setActive] = useState(null);

  return (
    <HStack spacing="1rem">
      <CardModalAction
        name={Actions.PRINT}
        onClick={() => null}
        onHover={setActive}
        isHidden={active !== null && active !== Actions.PRINT}
      >
        <Print />
      </CardModalAction>
      <CardModalAction
        name={Actions.FACEBOOK}
        onClick={() => null}
        onHover={setActive}
        isHidden={active !== null && active !== Actions.FACEBOOK}
      >
        <Facebook />
      </CardModalAction>
      <CardModalAction
        name={Actions.INSTAGRAM}
        onClick={() => null}
        onHover={setActive}
        isHidden={active !== null && active !== Actions.INSTAGRAM}
      >
        <Instagram />
      </CardModalAction>
      <CardModalAction
        name={Actions.TWITTER}
        onClick={() => null}
        onHover={setActive}
        isHidden={active !== null && active !== Actions.TWITTER}
      >
        <Twitter />
      </CardModalAction>
    </HStack>
  );
};

export default CardModalActions;
