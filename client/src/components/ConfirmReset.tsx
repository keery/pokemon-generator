import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

const ConfirmReset = ({ isOpen, setOpen, confirm }) => {
  const cancelRef = useRef();
  const t = useTranslations("generator");
  const contentStyle = useColorModeValue(
    {},
    { layerStyle: "nes-container", padding: "0rem 0.5rem" }
  );
  const variant = useColorModeValue("solid", "nes-button-blue");
  const headerFontSize = useColorModeValue("lg", "md");
  const bodyFontSize = useColorModeValue("md", "xs");
  const px = useBreakpointValue({ base: 3, sm: 6 });

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => setOpen(false)}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          borderRadius="sm"
          w="95%"
          color="text"
          bgColor="white"
          {...contentStyle}
        >
          <AlertDialogHeader
            fontSize={headerFontSize}
            fontWeight="bold"
            px={px}
          >
            {t("resetTitle")}
          </AlertDialogHeader>
          <AlertDialogBody fontSize={bodyFontSize} px={px}>
            {t("confirmReset")}
          </AlertDialogBody>
          <AlertDialogFooter px={px}>
            <Button
              fontSize={bodyFontSize}
              variant="line"
              cursor="pointer"
              ref={cancelRef}
              onClick={() => setOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button onClick={confirm} ml={3} cursor="pointer" variant={variant}>
              {t("confirm")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmReset;
