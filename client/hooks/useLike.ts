import { useMutation, UseMutationOptions } from "react-query";
import { client } from "~api/client";

interface Payload {
  cardId: number;
}

export enum State {
  LIKED = "liked",
  DISLIKED = "disliked",
}

interface Response {
  nb: number;
  state: State.LIKED | State.DISLIKED;
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
