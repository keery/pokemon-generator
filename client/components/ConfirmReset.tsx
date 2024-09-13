import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button as ChakraButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import Button from "~components/Button";
import { useTranslations } from "next-intl";

const ConfirmReset = ({ isOpen, setOpen, confirm }) => {
  const cancelRef = useRef();
  const t = useTranslations();
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
          color="white"
          backdropFilter="blur(25px) saturate(180%)"
          backgroundColor="rgb(20 27 40 / 60%)"
        >
          <AlertDialogHeader
            fontSize={{ base: "md", sm: "lg", md: "1.6rem" }}
            fontWeight="800"
            px={px}
          >
            {t("resetTitle")}
          </AlertDialogHeader>
          <AlertDialogBody fontSize={"md"} px={px}>
            {t("confirmReset")}
          </AlertDialogBody>
          <AlertDialogFooter px={px}>
            <ChakraButton
              fontSize={"md"}
              variant="line"
              cursor="pointer"
              ref={cancelRef}
              onClick={() => setOpen(false)}
            >
              {t("cancel")}
            </ChakraButton>
            <Button
              onClick={confirm}
              ml={3}
              cursor="pointer"
              variant={"solid"}
              color={"white"}
              layerColors={["new.2", "new.4", "new.3"]}
            >
              {t("confirm")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmReset;
