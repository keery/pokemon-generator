import { Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Warning from "public/assets/img/warning.svg";

const WarningBox = ({ children, ...rest }) => {
  const { t } = useTranslation("common");
  return (
    <Flex
      bgColor="new.4"
      borderLeft="5px solid #8a5700"
      borderRadius="5px"
      px={8}
      py={5}
      direction="column"
      color="#603c01"
      {...rest}
    >
      <Flex alignItems="center" pb={2} fontSize="1.3rem">
        <Warning fill="#603c01" />
        <Text pl={2} fontWeight="bold" fontSize="1.1rem">
          {t("warning")}
        </Text>
      </Flex>
      {children}
    </Flex>
  );
};

export default WarningBox;
