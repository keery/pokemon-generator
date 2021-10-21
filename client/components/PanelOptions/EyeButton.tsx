import React, { useEffect } from "react";
import Eye from "public/assets/img/eye.svg";
import EyeClose from "public/assets/img/eye-close.svg";
import OptionButton from "~components/PanelOptions/OptionButton";
import { useTranslation } from "next-i18next";
import { areaAtom } from "~atoms/area";
import { useRecoilState } from "recoil";
import { useBreakpointValue } from "@chakra-ui/react";

const EyeButton = () => {
  const { t } = useTranslation("generator");
  const [{ isVisible }, setArea] = useRecoilState(areaAtom);
  const isMobile = useBreakpointValue({ base: true, xl: false });

  useEffect(() => {
    if (isMobile && !isVisible) {
      setArea((s) => ({ ...s, isVisible: true }));
    }
  }, [isMobile, isVisible]);

  return (
    <OptionButton
      icon={isVisible ? <Eye /> : <EyeClose />}
      onClick={() => setArea((s) => ({ ...s, isVisible: !s.isVisible }))}
      label={isVisible ? t("hideZone") : t("showZone")}
      keyboard_shortcut={["ctrl", "h"]}
    />
  );
};

export default EyeButton;
