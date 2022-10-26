import { useQuery } from "react-query";
import { client } from "~api/client";
import { Winner } from "~@types/Winner";
import getWeek from "date-fns/getWeek";

export const getWinner = () =>
  client.get(`/winners`).then((res) => {
    return res.data as Winner;
  });

export const getKey = () => {
  const date = new Date();
  const week = getWeek(date);

  return ["winner", week];
};

const useWinner = () => {
  return useQuery(getKey(), () => getWinner());
};

export default useWinner;
