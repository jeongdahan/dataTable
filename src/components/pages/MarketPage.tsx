import React, { useState, useCallback, useContext } from "react";
import { CurrencyContext } from "src/core/providers/CurrencyProvider";
import useMarket from "src/utiles/hooks/useMarket";
import { useLocalStorage } from "src/utiles/hooks/useStorage";
import { IBookmark } from "src/core/models/bookmark";
import { CoinDetailFeature } from "src/components/features";
import { Market } from "src/components/UI/organisms";
import { Loading } from "src/components/UI/atoms";

const MarketPage = () => {
  const { currencyList, currency, onCurrency } = useContext(CurrencyContext);
  const [bookmark, setBookmark] = useLocalStorage("bookmark", []);
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [coinId, setCoinId] = useState("");

  const { marketData, marketDataError, marketDataIsLoading, onPage } =
    useMarket({
      currency,
    });
  const handleChangeCurrency = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      const { value } = e.target;
      const currency = currencyList.find(
        (currency: any) => currency.value === value
      );
      onCurrency(currency);
    },
    [currencyList]
  );

  const handleChangeBookmark = useCallback(
    (_bookmark: IBookmark) => {
      if (
        bookmark.findIndex((item: IBookmark) => item.id === _bookmark.id) > -1
      ) {
        setBookmark(
          bookmark.filter((item: IBookmark) => item.id !== _bookmark.id)
        );
        alert(`${_bookmark.name} 북마크가 해제되었습니다`);
      } else {
        setBookmark([...bookmark, _bookmark]);
        alert(`${_bookmark.name} 북마크가 추가되었습니다`);
      }
    },
    [bookmark]
  );

  const handleMarketDataMore = useCallback(() => {
    onPage((page) => page + 1);
  }, []);

  const handleClick = useCallback((coinId: string) => {
    setCoinId(coinId);
    setIsDetailModal(true);
  }, []);

  if (marketDataIsLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Market
        marketData={marketData}
        bookmark={bookmark}
        currency={currency}
        currencyList={currencyList}
        onChangeCurrency={handleChangeCurrency}
        onChangeBookmark={handleChangeBookmark}
        onMarketDataMore={handleMarketDataMore}
        onClick={handleClick}
      />

      <CoinDetailFeature
        coinId={coinId}
        isDetailModal={isDetailModal}
        onIsDetailModal={setIsDetailModal}
        currency={currency}
      />
    </React.Fragment>
  );
};

export default MarketPage;
