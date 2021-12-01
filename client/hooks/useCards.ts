import { useQuery, UseQueryOptions } from "react-query";
import { client } from "~api/client";
import { Card } from "~@types/Card";

const useCards = (options: UseQueryOptions<Card[]> = {}) => {
  return useQuery(
    ["cards"],
    () => client.get("/cards").then((res) => res.data as Card[]),
    options
  );
};

export default useCards;
