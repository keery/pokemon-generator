import { useMutation, UseMutationOptions } from "react-query";
import { client } from "~api/client";

interface Payload {
  reason: string;
  description: string;
  card: { id: number };
}

const useCreateReport = (
  options: UseMutationOptions<boolean, Error, Payload> = {}
) => {
  return useMutation((payload) => {
    return client.post("/reports", payload);
  }, options);
};

export default useCreateReport;
