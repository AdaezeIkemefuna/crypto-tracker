import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Axios from "axios";
import Loader from "./Loader";
import ErrorComp from "./ErrorComp";
export default function SingleCoin() {
  const { id } = useParams();
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;
  const {
    data: coin,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("coins", async () => {
    return await Axios.get(url).then((res) => res.data);
  });
  console.log(coin);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorComp />;
  }
  return (
    <section>
      <h1 className="head">{coin?.name}</h1>
      <div className="mid_section--1">
        <aside className="mid__left">
          <span>Rank #{coin?.coingecko_rank} </span>
          <div className="img__data">
            <img src={coin?.image.small} alt="img" />
            {coin?.name} ({coin?.symbol})
          </div>
        </aside>

        <aside className="mid__right">
          <h1>${coin?.market_data.current_price.usd}</h1>
        </aside>
      </div>

      <table>
        <thead>
          <tr>
            <th>1h</th>
            <th>24h</th>
            <th>7d</th>
            <th>14d</th>
            <th>30d</th>
            <th>1y</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              {coin?.market_data.price_change_percentage_1h_in_currency.usd}
            </td>
            <td>{coin?.market_data.price_change_percentage_24h}</td>
            <td>{coin?.market_data.price_change_percentage_7d}</td>
            <td>{coin?.market_data.price_change_percentage_14d}</td>
            <td>{coin?.market_data.price_change_percentage_30d}</td>
            <td>{coin?.market_data.price_change_percentage_1y}</td>
          </tr>
        </tbody>
      </table>

      <aside className="about">{coin?.description.en}</aside>
    </section>
  );
}
