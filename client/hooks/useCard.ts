import { useQuery, UseQueryOptions } from "react-query";
import { client } from "~api/client";
import { Card } from "~@types/Card";

const useCard = (id: number | string, options: UseQueryOptions<Card> = {}) => {
  return useQuery(
    ["card", id],
    () => client.get(`/cards/${id}`).then((res) => res.data as Card),
    options
  );
};

export default useCard;
