import { CachedQuery } from "~@types/CachedQuery";
import { InfiniteData, QueryClient } from "react-query";
import { Card } from "~@types/Card";

export const setCardListData = (
  isLiked: boolean,
  queryClient: QueryClient,
  cachedQuery: CachedQuery,
  card: Card
): InfiniteData<Card[]> => {
  const previousValue = queryClient.getQueryData<InfiniteData<Card[]>>(
    cachedQuery.key
  );

  if (previousValue) {
    queryClient.setQueryData<InfiniteData<Card[]>>(cachedQuery.key, (old) => {
      const page = old.pages[cachedQuery.indexPage];
      const index = page.findIndex((c) => c.id === card.id);

      if (index === -1) return old;

      const newPage = [...page];

      newPage[index] = {
        ...newPage[index],
        likes: isLiked ? page[index].likes - 1 : page[index].likes + 1,
        hasLiked: !isLiked,
      };

      old.pages.splice(cachedQuery.indexPage, 1, newPage);

      return {
        pageParams: old.pageParams,
        pages: old.pages,
      };
    });
    return previousValue;
  }
};
