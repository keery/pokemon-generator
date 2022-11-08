import { CachedQuery, Card } from "~@types";
import { QueryClient } from "react-query";

export type MutateLikeFunction = (
  isLiked: boolean,
  queryClient: QueryClient,
  cachedQuery: CachedQuery,
  card?: Card
) => any;
