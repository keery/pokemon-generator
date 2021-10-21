import React from "react";

import { useTranslation } from "next-i18next";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import FieldsAttack from "~components/Fields/FieldsAttack";

interface Props {
  defaultIndex?: number;
}

const FieldsAttackTab = ({ defaultIndex = 0 }: Props) => {
  const { t } = useTranslation("generator");

  return (
    <Tabs variant="soft-rounded" colorScheme="blue" defaultIndex={defaultIndex}>
      <TabList>
        <Tab>{t("attack1")}</Tab>
        <Tab>{t("attack2")}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <FieldsAttack name="attack1" />
        </TabPanel>
        <TabPanel>
          <FieldsAttack name="attack2" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FieldsAttackTab;
