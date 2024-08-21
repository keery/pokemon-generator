import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
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
          color="text"
          bgColor="white"
        >
          <AlertDialogHeader fontSize="lg" fontWeight="bold" px={px}>
            {t("resetTitle")}
          </AlertDialogHeader>
          <AlertDialogBody fontSize={"md"} px={px}>
            {t("confirmReset")}
          </AlertDialogBody>
          <AlertDialogFooter px={px}>
            <Button
              fontSize={"md"}
              variant="line"
              cursor="pointer"
              ref={cancelRef}
              onClick={() => setOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button onClick={confirm} ml={3} cursor="pointer" variant={"solid"}>
              {t("confirm")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmReset;
