import { useRouter } from "next/navigation";
type Router = ReturnType<typeof useRouter>;

const openModalWithUrl = (
  router: Router,
  name: string,
  open: () => void
): void => {
  router.push(`/?modal=${name}`);
  open();
};

const closeModalWithUrl = (router: Router, close: () => void): void => {
  router.push(`/`);
  close();
};

const useModalWithUrl = ({
  name,
  onClose = null,
  onOpen,
}: {
  name: string;
  onOpen?: () => void;
  onClose?: () => void;
}) => {
  const router = useRouter();
  return {
    onOpenModalWithUrl: onOpen
      ? () => openModalWithUrl(router, name, onOpen)
      : null,
    onCloseModalWithUrl: () =>
      onClose ? closeModalWithUrl(router, onClose) : null,
  };
};

export default useModalWithUrl;
