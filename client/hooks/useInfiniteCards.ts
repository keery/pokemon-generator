import { useInfiniteQuery, UseInfiniteQueryOptions } from "react-query";
import { client } from "~api/client";
import { Card } from "~@types/Card";

export const QUERY_KEY = "infinite-cards";

const useInfiniteCards = (
  options: UseInfiniteQueryOptions<Card[]> = {},
  params: Record<string, any> = null
) => {
  return useInfiniteQuery(
    [QUERY_KEY, params],
    ({ pageParam = 0 }) =>
      client
        .get(
          `/cards${
            params
              ? `?${new URLSearchParams({
                  ...params,
                  page: pageParam,
                }).toString()}`
              : ""
          }`
        )
        .then((res) => res.data as Card[]),
    options
  );
};

export default useInfiniteCards;
