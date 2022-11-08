import { CachedQuery } from "~@types/CachedQuery";
import { InfiniteData, QueryClient } from "react-query";
import { Card, Winner } from "~@types";

export const setWinnerData = (
  isLiked: boolean,
  queryClient: QueryClient,
  cachedQuery: CachedQuery
) => {
  const previousValue = queryClient.getQueryData<InfiniteData<Card[]>>(
    cachedQuery.key
  );

  if (previousValue) {
    queryClient.setQueryData(cachedQuery.key, (winner: Winner) => {
      return {
        ...winner,
        card: {
          ...winner.card,
          likes: isLiked ? winner.card.likes - 1 : winner.card.likes + 1,
          hasLiked: !isLiked,
        },
      };
    });
    return previousValue;
  }
};
