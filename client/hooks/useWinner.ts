import { useQuery } from "react-query";
import { client } from "~api/client";
import { Card } from "~@types/Card";
import getWeek from "date-fns/getWeek";

export const getWinner = () =>
  client.get(`/cards/winner`).then((res) => res.data as Card);

const useWinner = () => {
  const date = new Date();
  const week = getWeek(date);

  return useQuery(["winner", week], () => getWinner());
};

export default useWinner;
