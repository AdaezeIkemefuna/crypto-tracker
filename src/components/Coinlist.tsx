import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Axios from "axios";
import { FaSearch } from "react-icons/fa";
import Loader from "./Loader";
import ErrorComp from "./ErrorComp";

type coinType = {
  name: String;
  id: String;
  image: string;
  current_price: String;
  price_change_percentage_24h: String;
  total_volume: String;
  market_cap: String;
  symbol: String;
};

export default function Coinlist() {
  const navigate = useNavigate();
  const [cryptoCoins, setCryptoCoins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  const { data, isLoading, isError, error, refetch } = useQuery(
    "coins",
    async () => {
      return await Axios.get(url).then((res) => {
        setCryptoCoins(res.data);
      });
    }
  );

  useEffect(() => {
    refetch();
    console.log("refetched");
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorComp />;
  }

  const transformData = (coins: coinType[]) => {
    let sortedCoins = coins;

    if (searchQuery !== "") {
      sortedCoins = coins.filter((coin: coinType) =>
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return sortedCoins;
  };

  return (
    <div>
      <header>
        <h1 className="title">Welcome To the crypto tracker</h1>
        <form className="form">
          <FaSearch className="search__icon" />
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
          />
        </form>
      </header>

      <table>
        <thead style={{ fontSize: "1.3rem" }}>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Current Price</th>
            <th>24h</th>
            <th>Volume</th>
            <th>Market Cap</th>
          </tr>
        </thead>

        <tbody className="row__body">
          {transformData(cryptoCoins)?.map((coin: coinType, index) => (
            <tr
              onClick={() => navigate(`/singlecoin/${coin?.id}`)}
              key={index}
              className="row__data"
            >
              <td>{index + 1}</td>
              <td className="img__data">
                <img src={coin?.image} alt="img" width={"40px"} />
                {coin?.symbol}
              </td>
              <td>${coin?.current_price}</td>
              <td
                className={
                  Number(coin?.price_change_percentage_24h) < 0
                    ? "negative"
                    : "positive"
                }
              >
                {coin?.price_change_percentage_24h}%
              </td>
              <td>${coin?.total_volume}</td>
              <td>${coin?.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
