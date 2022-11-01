import { useQuery, UseQueryOptions } from "react-query";
import { client } from "~api/client";
import { Card } from "~@types/Card";

export const QUERY_KEY = "card";
export const getCard = (id: string | number) =>
  client.get(`/cards/${id}`).then((res) => res.data as Card);

const useCard = (id: number | string, options: UseQueryOptions<Card> = {}) => {
  return useQuery([QUERY_KEY, id], () => getCard(id), options);
};

export default useCard;
