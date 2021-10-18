import React from "react";
import { Flex, Box, VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import CardFormHeader from "~components/CardFormHeader";
import CardFieldsGroup from "~components/CardFieldsGroup";
import FieldsPokemonInfo from "~components/FieldsPokemonInfo";
import FieldsEvolution from "~components/FieldsEvolution";
import FieldsAttack from "~components/FieldsAttack";
import FieldsSubInfo from "~components/FieldsSubInfo";
import FieldsBottomInfo from "~components/FieldsBottomInfo";
import CacheForm from "~components/CacheForm";
import Logo from "~components/Logo";

const CardForm = () => {
  const { t } = useTranslation("generator");

  return (
    <Flex
      height="100%"
      flex={1}
      w="500px"
      minW={{ base: "300px", lg: "350px" }}
      display={{
        base: "none",
        md: "flex",
      }}
    >
      <Flex pos="relative" flex={1}>
        <CacheForm />
        <Box
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
          layerStyle="glass"
          borderRadius="md"
          px={{ base: 4, lg: 8 }}
          py={8}
          direction="column"
          zIndex={10}
        >
          <Flex alignItems="center">
            <Logo />
          </Flex>
          <VStack
            overflow="scroll"
            mt={10}
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
                id={`field-attack1-label`}
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
