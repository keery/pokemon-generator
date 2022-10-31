import { useMutation, UseMutationOptions } from "react-query";
import { client } from "~api/client";
import { FormatValue } from "~utils/card";

const useCreateReport = (
  options: UseMutationOptions<boolean, Error, FormData> = {}
) => {
  return useMutation((payload) => {
    return client.post("/reports", payload);
  }, options);
};

export default useCreateReport;
