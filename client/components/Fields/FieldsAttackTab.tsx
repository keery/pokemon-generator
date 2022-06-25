import React from "react";
import { useTranslation } from "next-i18next";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import FieldsAttack from "~components/Fields/FieldsAttack";
import { GRADIENTS_COLOR } from "~constants";
interface Props {
  defaultIndex?: number;
}

const FieldsAttackTab = ({ defaultIndex = 0 }: Props) => {
  const [tabIndex, setTabIndex] = React.useState(defaultIndex);
  const { t } = useTranslation("generator");
  const fontSize = useColorModeValue("md", "0.65rem");
  const borderRadius = useColorModeValue("xl", "none");
  const variantActiv = useColorModeValue("glass", "nes-button-blue");
  const variantInactiv = useColorModeValue("line", "nes-button");
  const colorButtonNotSelected = useColorModeValue("white", "inherit");
  const px = useColorModeValue(null, "0.6rem");
  const selected = useColorModeValue(
    {
      background: "none",
    },
    {
      background: "none",
    }
  );

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="blue"
      defaultIndex={defaultIndex}
      onChange={handleTabsChange}
    >
      <TabList>
        <Tab _selected={selected} p={0} isSelected>
          <Button
            transition="border-radius 100ms"
            variant={tabIndex === 0 ? variantActiv : variantInactiv}
            fontSize={fontSize}
            borderRadius={borderRadius}
            px={px}
            color={
              tabIndex !== 0 ? colorButtonNotSelected : GRADIENTS_COLOR.water
            }
          >
            {t("attack1")}
          </Button>
        </Tab>
        <Tab _selected={selected}>
          <Button
            fontSize={fontSize}
            variant={tabIndex === 1 ? variantActiv : variantInactiv}
            borderRadius={borderRadius}
            px={px}
            color={
              tabIndex !== 1 ? colorButtonNotSelected : GRADIENTS_COLOR.water
            }
          >
            {t("attack2")}
          </Button>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel maxH="100%" px={0}>
          <FieldsAttack name="attack1" hasColorInverted />
        </TabPanel>
        <TabPanel px={0}>
          <FieldsAttack name="attack2" hasColorInverted />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FieldsAttackTab;
