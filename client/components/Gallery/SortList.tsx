import React, { useRef } from "react";
import SortSelect from "~components/Gallery/SortSelect";
import { Flex, Box, Container } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import useIsIntersecting from "~hooks/useIsIntersecting";
import { hideLogoAtom } from "~atoms/hide-logo";
import { useSetRecoilState } from "recoil";

interface Props {
  onChange: (e: any) => void;
}

const SortList = ({ onChange }: Props) => {
  const ref = useRef();
  const setHideLogo = useSetRecoilState(hideLogoAtom);

  const options = [
    {
      value: "sort-newest",
      param: "created_at,DESC",
      label: "filters.mostRecent",
    },
    {
      value: "sort-recent-winner",
      param: "winner,DESC",
      label: "filters.recentWinner",
    },
    {
      value: "sort-old-winner",
      param: "winner,ASC",
      label: "filters.oldWinner",
    },
    {
      value: "sort-most-liked",
      param: "likes,DESC",
      label: "filters.mostVoted",
    },
    {
      value: "sort-most-liked-week",
      param: "sort-most-liked-week,DESC",
      label: "filters.mostVotedWeek",
    },
    {
      value: "random",
      param: "random,ASC",
      label: "filters.random",
    },
  ];

  useIsIntersecting(ref, (value: boolean) => {
    setHideLogo({ isHidden: value });
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
        zIndex={100}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        top="-1px"
        position="sticky"
        border="none"
        pt="8px"
      >
        <Container>
          <FormProvider {...form}>
            <form>
              <Flex
                pl="3.6rem"
                fontWeight="800"
                fontSize="5.8rem"
                fontFamily="title"
                overflow="hidden"
                transition="font-size linear 200ms"
              >
                <SortSelect
                  name="sort"
                  control={form.control}
                  onChange={(e) => {
                    onChange(e.param);
                  }}
                  options={options}
                />
              </Flex>
            </form>
          </FormProvider>
        </Container>
      </Flex>
    </>
  );
};

export default SortList;
