import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryHook } from "../hooks/useQueryHook";

type coinType = {
  name: String;
  id: String;
  image: String;
  current_price: Number;
  price_change_percentage_24h: Number;
  total_volume: Number;
  total_supply: Number;
};

export default function Coinlist() {
  const navigate = useNavigate();
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  const { data: coins, isLoading, isError, error, refetch } = useQueryHook(url);
  console.log(coins);

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      {/* {coins?.map((coin: coinType) => (
          <li onClick={() => navigate(`/singlecoin/${coin?.id}`)}>
            {coin?.name}
          </li>
        ))} */}
    </div>
  );
}
