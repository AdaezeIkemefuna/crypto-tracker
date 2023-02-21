import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { FaBackward } from "react-icons/fa";
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
  const navigate = useNavigate();
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorComp />;
  }

  const goBack = () => {
    navigate(-1);
  };
  return (
    <section className="singleCoin__wrapper">
      <span className="go_back" onClick={goBack}>
        <FaBackward />
        Go Back
      </span>
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
          <h1>${coin?.market_data.current_price.usd.toLocaleString()}</h1>
        </aside>
      </div>

      <table className="single__table">
        <thead className="single__head">
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
              {coin?.market_data.price_change_percentage_1h_in_currency.usd}%
            </td>
            <td>{coin?.market_data.price_change_percentage_24h}%</td>
            <td>{coin?.market_data.price_change_percentage_7d}%</td>
            <td>{coin?.market_data.price_change_percentage_14d}%</td>
            <td>{coin?.market_data.price_change_percentage_30d}%</td>
            <td>{coin?.market_data.price_change_percentage_1y}%</td>
          </tr>
        </tbody>
      </table>

      <div className="mid_section--1 second">
        <div className="mid_left">
          <div className="hour_change">
            <h3>24 hour low</h3>
            <span>${coin?.market_data.low_24h.usd}</span>
          </div>
          <div className="hour_change">
            <h3>24 hour high</h3>
            <span>${coin?.market_data.high_24h.usd}</span>
          </div>
        </div>
        <div className="mid_right">
          <div className="hour_change">
            <h3>market cap</h3>
            <span>${coin?.market_data.market_cap.usd.toLocaleString()}</span>
          </div>
          <div className="hour_change">
            <h3>circulating supply</h3>
            <span>
              ${coin?.market_data.circulating_supply.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <aside className="about">
        <h1>About</h1>
        <p>{coin?.description.en}</p>
      </aside>
    </section>
  );
}
