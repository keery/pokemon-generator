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
import NesButton from "~components/NesButton";
import PublishButton from "~components/Publishing/PublishButton";

const CardForm = () => {
  const { t } = useTranslation("generator");
  const isDesktop = useBreakpointValue({ base: false, xl: true });
  const layerStyle = useColorModeValue("glass", "nes-container");
  const borderRadius = useColorModeValue("md", "none");
  const pt = useColorModeValue(8, 2);
  const mt = useColorModeValue(10, 7);
  const { colorMode } = useColorMode();

  const Form = [
    {
      id: "basic-info",
      header: <CardFormHeader step={1} title={t("basicInfo")} />,
      fields: <FieldsPokemonInfo />,
    },
    {
      id: "evolution",
      header: <CardFormHeader step={2} title={t("evolution")} />,
      fields: <FieldsEvolution />,
    },
    {
      id: "attack1",
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
      id: "attack2",
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
      id: "weakresretreat",
      header: (
        <CardFormHeader step={5} title={t("weaknessResistanceRetreat")} />
      ),
      fields: <FieldsSubInfo />,
    },
    {
      id: "addinfo",
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
          pt={{ base: 10, xl: pt }}
          pb={{ base: 0, xl: 4 }}
          direction="column"
          zIndex={10}
          justifyContent="space-between"
        >
          <Flex direction="column" flexGrow={1} h="1%">
            {isDesktop && (
              <Flex alignItems="center" justifyContent="space-between">
                <Logo />
                <NesButton noColorChange={false} />
              </Flex>
            )}
            <Accordion
              defaultIndex={[0, 1, 2, 3, 4, 5]}
              overflowY="scroll"
              allowMultiple
              allowToggle
              mt={{ base: 0, xl: mt }}
              w="100%"
              color="#3b434c"
              borderRadius="sm"
            >
              {Form.map(({ id, header, fields }) => (
                <AccordionItem border="none" mt={4} key={id}>
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        justifyContent="space-between"
                        textAlign="left"
                        py={0}
                        px={2}
                        borderRadius="sm"
                        w="100%"
                        color="white!important"
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
          {/* <PublishButton /> */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardForm;
