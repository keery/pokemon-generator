import React, { useRef } from "react";
import SortSelect from "~components/Gallery/SortSelect";
import { Flex, Box, Container } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "next-i18next";
import Title from "~components/Title";
import useIsIntersecting from "~hooks/useIsIntersecting";

interface Props {
  onChange: (e: any) => void;
}

const SortList = ({ onChange }: Props) => {
  const ref = useRef();
  const { t } = useTranslation("gallery");

  const options = [
    {
      value: "sort-newest",
      param: "created_at,DESC",
      label: t("filters.mostRecent"),
    },
    {
      value: "sort-oldest",
      param: "created_at,ASC",
      label: t("filters.mostOld"),
    },
    {
      value: "sort-most-liked",
      param: "likes,DESC",
      label: t("filters.mostVoted"),
    },
    {
      value: "random",
      param: "random,ASC",
      label: t("filters.random"),
    },
  ];

  const isReduced = useIsIntersecting(ref, {
    threshold: 1,
    rootMargin: "-15px 0px 0px 0px",
  });

  const isSticky = useIsIntersecting(ref, {
    threshold: 1,
    rootMargin: "0px 0px 500px 0px",
  });

  const form = useForm({
    defaultValues: {
      sort: options[0],
    },
  });

  return (
    <>
      <Box pt={20} />
      <Flex
        ref={ref}
        zIndex={50}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        top="-1px"
        position="sticky"
        layerStyle={isSticky ? "glassMd" : ""}
        border="none"
      >
        <Container>
          <FormProvider {...form}>
            <form>
              <Title>
                <SortSelect
                  fontSize={isReduced ? "4rem" : "5.8rem"}
                  name="sort"
                  control={form.control}
                  onChange={(e) => {
                    onChange(e.param);
                  }}
                  options={options}
                />
              </Title>
            </form>
          </FormProvider>
        </Container>
      </Flex>
    </>
  );
};

export default SortList;
