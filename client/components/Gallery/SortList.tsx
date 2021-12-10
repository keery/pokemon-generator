import React from "react";
import Select from "~components/Select";
import { Flex, Text } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "next-i18next";
import TextShadow from "~components/TextShadow";

interface Props {
  onChange: (e: any) => void;
}

const SortList = ({ onChange }: Props) => {
  const { t } = useTranslation("gallery");
  const form = useForm({
    defaultValues: {
      sort: {
        value: "sort-newest",
        label: t("filters.mostRecent"),
      },
    },
  });

  return (
    <Flex pt={20} pb={4} alignItems="center" justifyContent="space-between">
      <TextShadow
        as="h2"
        text={t("lastCreation")}
        fontWeight="800"
        fontSize="5.8rem"
        fontFamily="title"
      />
      <FormProvider {...form}>
        <form>
          <Flex w="300px">
            <Select
              name="sort"
              iconPath={"{{value}}.svg"}
              control={form.control}
              onChange={(e) => {
                onChange(e.param);
              }}
              options={[
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
                  value: "sort-least-liked",
                  param: "likes,ASC",
                  label: t("filters.leastVoted"),
                },
                {
                  value: "random",
                  param: "random,ASC",
                  label: t("filters.random"),
                },
              ]}
            />
          </Flex>
        </form>
      </FormProvider>
    </Flex>
  );
};

export default SortList;
