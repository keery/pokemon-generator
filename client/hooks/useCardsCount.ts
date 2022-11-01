import { useQuery } from "react-query";
import { client } from "~api/client";

export const QUERY_KEY = "cards-count";

const useCardsCount = () => {
  return useQuery(
    QUERY_KEY,
    () => client.get(`/cards/count`).then((res) => res.data as number),
    {
      retry: false,
    }
  );
};

export default useCardsCount;
