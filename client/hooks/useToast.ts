import { useToast as useChakraToast } from "@chakra-ui/react";

const useToast = () => {
  const toast = useChakraToast();

  return {
    errorToast: (message) =>
      toast({
        description: message,
        position: "top",
        status: "error",
        duration: 4000,
      }),
    successToast: (message) =>
      toast({
        description: message,
        position: "top",
        status: "success",
        duration: 4000,
      }),
    infoToast: (message) =>
      toast({
        description: message,
        position: "top",
        status: "info",
        duration: 4000,
      }),
  };
};

export default useToast;
