import { useQuery } from "react-query";
import Axios from "axios";

export const useQueryHook = (url: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery(
    "coins",
    async () => {
      return await Axios.get(url).then((res) => res.data);
    }
  );

  return { data, isLoading, isError, error, refetch };
};
