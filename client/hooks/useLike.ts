import { useMutation, UseMutationOptions } from "react-query";
import { client } from "~api/client";

interface Payload {
  cardId: number;
}

interface Response {
  nb: number;
  state: "liked" | "disliked";
}

const useLike = (
  options: UseMutationOptions<Response, Error, Payload> = {}
) => {
  return useMutation((payload) => {
    return client
      .post("/likes/toggle", payload)
      .then((res) => res.data as Response);
  }, options);
};

export default useLike;
