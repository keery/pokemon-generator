import React from "react";
import {
  Flex,
  Box,
  useBreakpointValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  useColorMode,
  Image,
} from "@chakra-ui/react";
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
  const layerStyle = useColorModeValue("glass", "nes-container");
  const borderRadius = useColorModeValue("md", "none");
  const { colorMode } = useColorMode();

  const Form = [
    {
      header: <CardFormHeader step={1} title={t("basicInfo")} />,
      fields: <FieldsPokemonInfo />,
    },
    {
      header: <CardFormHeader step={2} title={t("evolution")} />,
      fields: <FieldsEvolution />,
    },
    {
      header: (
        <CardFormHeader
          step={3}
          title={t("attack1")}
          id={`field-attack1-label`}
        />
      ),
      fields: <FieldsAttack name="attack1" />,
    },
    {
      header: (
        <CardFormHeader
          step={4}
          title={t("attack2")}
          id={`field-attack2-label`}
        />
      ),
      fields: <FieldsAttack name="attack2" />,
    },
    {
      header: (
        <CardFormHeader step={5} title={t("weaknessResistanceRetreat")} />
      ),
      fields: <FieldsSubInfo />,
    },
    {
      header: <CardFormHeader step={6} title={t("additionalInformation")} />,
      fields: <FieldsBottomInfo />,
    },
  ];

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
          layerStyle={isDesktop ? layerStyle : ""}
          borderRadius={{ base: "none", xl: borderRadius }}
          px={{ base: 2, lg: 4 }}
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
          <Accordion
            defaultIndex={[0, 1, 2, 3, 4, 5]}
            overflowY="scroll"
            allowMultiple
            allowToggle
            mt={{ base: 0, xl: 10 }}
            w="100%"
            color="#3b434c"
          >
            {Form.map(({ header, fields }) => (
              <AccordionItem border="none" mt={4}>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      justifyContent="space-between"
                      textAlign="left"
                      py={0}
                      px={2}
                      borderRadius="sm"
                      w="100%"
                    >
                      {header}
                      {colorMode === "dark" ? (
                        <Image
                          src="/assets/img/pixel/chevron.png"
                          w="20px"
                          transition="transform ease-in-out 200ms"
                          transform={isExpanded ? null : "rotate(180deg)"}
                        />
                      ) : (
                        <AccordionIcon
                          color={{ base: "white", xl: "#3b434c" }}
                        />
                      )}
                    </AccordionButton>
                    <AccordionPanel px={0}>
                      <CardFieldsGroup>{fields}</CardFieldsGroup>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardForm;
