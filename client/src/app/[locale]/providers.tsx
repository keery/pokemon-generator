"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { client } from "~api/client-react-query";
import { QueryClientProvider } from "react-query";
import usePathname from "~hooks/usePathname";
import { RecoilRoot } from "recoil";
import { useForm, FormProvider } from "react-hook-form";
import { CARD_DEFAULT_STATE } from "~data/card";
import { decrypt } from "~utils/cache";
import { ROUTE_GENERATOR } from "~constants";

// import { LazyMotion, domAnimation } from "framer-motion";

import theme from "../../../theme";

const GeneratorFromProvider = ({ children }) => {
  const cachedCard =
    typeof window !== "undefined"
      ? localStorage.getItem(process.env.NEXT_PUBLIC_KEY_CACHE)
      : null;

  const form = useForm({
    defaultValues: cachedCard
      ? decrypt(cachedCard, process.env.NEXT_PUBLIC_ENCRYPT_KEY)
      : CARD_DEFAULT_STATE,
    shouldUnregister: false,
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};

interface IProviders {
  children: React.ReactNode;
}

export function Providers({ children }: IProviders) {
  const pathname = usePathname();

  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        {/* @ts-ignore */}
        <RecoilRoot>
          {pathname === ROUTE_GENERATOR || pathname.startsWith("/modal") ? (
            <GeneratorFromProvider>{children}</GeneratorFromProvider>
          ) : (
            children
          )}
        </RecoilRoot>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
