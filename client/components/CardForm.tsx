import React from "react";
import { Flex, Box, VStack, useBreakpointValue } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import CardFormHeader from "~components/CardFormHeader";
import CardFieldsGroup from "~components/CardFieldsGroup";
import FieldsPokemonInfo from "~components/FieldsPokemonInfo";
import FieldsEvolution from "~components/FieldsEvolution";
import FieldsAttack from "~components/Fields/FieldsAttack";
import FieldsSubInfo from "~components/FieldsSubInfo";
import FieldsBottomInfo from "~components/FieldsBottomInfo";
import Logo from "~components/Logo";

const CardForm = () => {
  const { t } = useTranslation("generator");
  const isDesktop = useBreakpointValue({ base: false, xl: true });

  return (
    <Flex
      zIndex={8}
      height="100%"
      flex={1}
      w={{ base: "100%", xl: "500px" }}
      minW={{ base: "300px", lg: "350px" }}
    >
      <Flex pos="relative" flex={1}>
        <Box
          display={{ base: "none", sm: "block" }}
          background="radial-gradient(50% 50%, rgb(220, 193, 228), transparent)"
          pos="absolute"
          top="70%"
          left="50%"
          w="500px"
          h="500px"
          transform="translate(-50%, -50%)"
        />
        <Flex
          pos="absolute"
          left={0}
          right={0}
          bottom={0}
          top={0}
          flex={1}
          height="100%"
          layerStyle={isDesktop ? "glass" : ""}
          borderRadius={{ base: "none", xl: "md" }}
          px={{ base: 4, lg: 8 }}
          pt={{ base: 10, xl: 8 }}
          pb={{ base: 0, xl: 8 }}
          direction="column"
          zIndex={10}
        >
          {isDesktop && (
            <Flex alignItems="center">
              <Logo />
            </Flex>
          )}
          <VStack
            overflowY="scroll"
            mt={{ base: 0, xl: 10 }}
            spacing={14}
            alignItems="stretch"
            borderRadius="12px"
            direction="column"
            w="100%"
            color="#3b434c"
          >
            <Box>
              <CardFormHeader step={1} title={t("basicInfo")} />
              <CardFieldsGroup>
                <FieldsPokemonInfo />
              </CardFieldsGroup>
            </Box>
            <Box>
              <CardFormHeader step={2} title={t("evolution")} />
              <CardFieldsGroup>
                <FieldsEvolution />
              </CardFieldsGroup>
            </Box>
            <Box flex={1}>
              <CardFormHeader
                step={3}
                title={t("attack1")}
                id={`field-attack1-label`}
              />
              <CardFieldsGroup>
                <FieldsAttack name="attack1" />
              </CardFieldsGroup>
            </Box>
            <Box flex={1}>
              <CardFormHeader
                step={4}
                title={t("attack2")}
                id={`field-attack2-label`}
              />
              <CardFieldsGroup>
                <FieldsAttack name="attack2" />
              </CardFieldsGroup>
            </Box>
            <Box>
              <CardFormHeader step={5} title={t("weaknessResistanceRetreat")} />
              <CardFieldsGroup>
                <FieldsSubInfo />
              </CardFieldsGroup>
            </Box>
            <Box>
              <CardFormHeader step={6} title={t("additionalInformation")} />
              <CardFieldsGroup>
                <FieldsBottomInfo />
              </CardFieldsGroup>
            </Box>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardForm;
