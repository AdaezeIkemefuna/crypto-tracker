import { useParams } from "react-router-dom";
import { useQueryHook } from "../hooks/useQueryHook";

export default function SingleCoin() {
  const { id } = useParams();
  const {
    data: coin,
    isLoading,
    isError,
    error,
  } = useQueryHook(`https://api.coingecko.com/api/v3/coins/${id}`);

  if (isLoading) {
    console.log("loading...");
  }
  return (
    <div>
      <ul>
        <li>{coin?.name}</li>
      </ul>
    </div>
  );
}
