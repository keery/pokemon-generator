import React from "react";
import { useTranslations } from "next-intl";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import FieldsAttack from "~components/Fields/FieldsAttack";

interface Props {
  defaultIndex?: number;
}

const selected = {
  background: "none",
};
const variantActiv = "solid";
const variantInactiv = "line";

const FieldsAttackTab = ({ defaultIndex = 0 }: Props) => {
  const [tabIndex, setTabIndex] = React.useState(defaultIndex);
  const t = useTranslations();

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
        <Tab _selected={selected} p={0} as="div">
          <Button
            transition="border-radius 100ms"
            variant={tabIndex === 0 ? variantActiv : variantInactiv}
            fontSize="md"
            borderRadius={"2rem"}
            px={null}
            color={"white"}
          >
            {t("attack1")}
          </Button>
        </Tab>
        <Tab _selected={selected} as="div">
          <Button
            fontSize="md"
            variant={tabIndex === 1 ? variantActiv : variantInactiv}
            borderRadius={"2rem"}
            px={null}
            color={"white"}
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
