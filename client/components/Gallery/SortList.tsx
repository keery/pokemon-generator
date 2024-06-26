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
      value: "sort-recent-winner",
      param: "winner,DESC",
      label: t("filters.recentWinner"),
    },
    {
      value: "sort-old-winner",
      param: "winner,ASC",
      label: t("filters.oldWinner"),
    },
    {
      value: "sort-most-liked",
      param: "likes,DESC",
      label: t("filters.mostVoted"),
    },
    {
      value: "sort-most-liked-week",
      param: "sort-most-liked-week,DESC",
      label: t("filters.mostVotedWeek"),
    },
    {
      value: "random",
      param: "random,ASC",
      label: t("filters.random"),
    },
  ];

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
      <Box mt={{ base: 0, md: 20 }} id="top-list" />
      <Flex
        ref={ref}
        zIndex={50}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        top="-1px"
        position="sticky"
        layerStyle={isSticky ? "darkBlur" : ""}
        border="none"
      >
        <Container>
          <FormProvider {...form}>
            <form>
              <Title>
                <SortSelect
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
