import { useQuery, UseQueryOptions } from "react-query";
import { client } from "~api/client";
import { Card } from "~@types/Card";

const useClapWinner = (options: UseQueryOptions<Card[]> = {}) => {
  return useQuery(
    "clap",
    () => client.get(`/winners/clap`).then((res) => res.data as Card[]),
    { enabled: false }
  );
};

export default useClapWinner;
