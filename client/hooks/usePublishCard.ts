import { useMutation, UseMutationOptions } from "react-query";
import { client } from "~api/client";
import { FormatValue } from "~utils/card";

interface PublishData extends FormatValue {
  img: File;
}

const usePublishCard = (
  options: UseMutationOptions<boolean, Error, FormData> = {}
) => {
  return useMutation((payload) => {
    return client.post("/card/publish", payload);
  }, options);
};

export default usePublishCard;
