import { useQuery, UseQueryOptions } from "react-query";
import { client } from "~api/client";
import { Card } from "~@types/Card";

const useCards = (
  options: UseQueryOptions<Card[]> = {},
  params: Record<string, string> = null
) => {
  return useQuery(
    ["cards", params],
    () =>
      client
        .get(
          `/cards${params ? `?${new URLSearchParams(params).toString()}` : ""}`
        )
        .then((res) => res.data as Card[]),
    options
  );
};

export default useCards;
