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
interface Props {
  defaultIndex?: number;
}

const FieldsAttackTab = ({ defaultIndex = 0 }: Props) => {
  const [tabIndex, setTabIndex] = React.useState(defaultIndex);
  const { t } = useTranslation("generator");
  const fontSize = useColorModeValue("md", "0.65rem");
  const borderRadius = useColorModeValue("xl", "none");
  const variantActiv = useColorModeValue("solid", "nes-button-blue");
  const variantInactiv = useColorModeValue("line", "nes-button");
  const px = useColorModeValue(null, "0.6rem");
  const selected = useColorModeValue(
    {},
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
        <Tab _selected={selected} p={0}>
          <Button
            transition="border-radius 100ms"
            variant={tabIndex === 0 ? variantActiv : variantInactiv}
            fontSize={fontSize}
            borderRadius={borderRadius}
            px={px}
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
          >
            {t("attack2")}
          </Button>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel maxH="100%" px={0}>
          <FieldsAttack name="attack1" />
        </TabPanel>
        <TabPanel px={0}>
          <FieldsAttack name="attack2" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FieldsAttackTab;
