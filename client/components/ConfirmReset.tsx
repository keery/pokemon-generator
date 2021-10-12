import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

const ConfirmReset = ({ isOpen, setOpen, confirm }) => {
  const cancelRef = React.useRef();
  const { t } = useTranslation("generator");
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => setOpen(false)}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent borderRadius="sm">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t("resetTitle")}
          </AlertDialogHeader>
          <AlertDialogBody>{t("confirmReset")}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant="line"
              ref={cancelRef}
              onClick={() => setOpen(false)}
            >
              {t("common:cancel")}
            </Button>
            <Button onClick={confirm} ml={3}>
              {t("common:confirm")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmReset;
