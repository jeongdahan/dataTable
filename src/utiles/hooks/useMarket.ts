import { useState, useCallback, useEffect } from "react";
import axios from "axios";

interface IuseMarketType {
  currency?: { icon: string; value: string; text: string } | undefined;
}

const useMarket = ({ currency }: IuseMarketType) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMarketData = useCallback(async (currency: string, page: number) => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "get",
        url: "https://api.coingecko.com/api/v3/coins/markets",
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: 50 * page,
          page: 1,
        },
      });

      setData(
        res.data.map((v: any) => ({
          id: v.id,
          name: v.name,
          symbol: v.symbol,
          current_price: v.current_price,
          price_change_percentage_24h: v.price_change_percentage_24h,
          total_volume: v.total_volume,
        }))
      );
    } catch (error) {
      alert(
        "데이터를 불러오는데 실패했습니다. 다시 한번 새로고침 부탁드립니다."
      );
      setError(error);
    } finally {
      setTimeout(() => setIsLoading(false), 400);
    }
  }, []);

  useEffect(() => {
    if (currency?.value) {
      loadMarketData(currency?.value, page);
    }
  }, [currency?.value, page]);

  return {
    marketData: data,
    marketDataError: error,
    marketDataIsLoading: isLoading,
    onPage: setPage,
  };
};

export default useMarket;
