import { useCallback } from "react";
import { useQuery, UseQueryOptions } from "react-query";
import { client } from "~api/client";
import { Card } from "~@types/Card";
import { useDisclosure } from "@chakra-ui/react";
import { openModalWithUrl } from "~utils/helper";
import { useRouter } from "next/navigation";

export const QUERY_KEY = "cards";

const useModal = (name: string) => {
  const { onOpen: onOpenDisclosure, onClose } = useDisclosure();
  const router = useRouter();

  const onOpen = useCallback(() => {
    openModalWithUrl(name, onOpenDisclosure, router);
  }, [name]);

  return { onOpen, onClose };
};

export default useModal;
