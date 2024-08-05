import { Flex, Text } from "@chakra-ui/react";
import Link from "~components/Link";
import { useTranslations } from "next-intl";

export default function Custom404() {
  const t = useTranslations();
  return (
    <Flex
      id="ErrorBoundary"
      bgImage="assets/img/pokemon-landscape.png"
      h="100%"
      w="100%"
      bgSize="cover"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        layerStyle="glass"
        py={3}
        px={6}
        borderRadius="sm"
        direction="column"
      >
        <Text fontSize="2rem" fontFamily="nes">
          Error
        </Text>
        <Text fontSize="5rem" fontFamily="nes">
          404
        </Text>
        <Link href="/">
          <Text textAlign="center" fontSize="xs">
            {t("backHome")}
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
}
