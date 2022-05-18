import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { CoinDetail, Modal } from "src/components/UI/organisms";
import { Loading } from "src/components/UI/atoms";
import { floatToFxiedUtil } from "src/utiles/currencyUtil";

interface CoinDetailFeatureProps {
  currency: { icon: string; value: string; text: string } | undefined;
  coinId: string;
  isDetailModal: boolean;
  onIsDetailModal: (visible: boolean) => void;
}

const CoinDetailFeature = ({
  currency,
  coinId,
  isDetailModal,
  onIsDetailModal,
}: CoinDetailFeatureProps) => {
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [btc, setBtc] = useState<string | number | undefined>(1);
  const [price, setPrice] = useState<string | number | undefined>(1);
  const [standardPrice, setStandardPrice] = useState(1);

  const loadMarketData = useCallback(
    async (coinId: string) => {
      try {
        setIsLoading(true);
        const res = await axios({
          method: "get",
          url: `https://api.coingecko.com/api/v3/coins/${coinId}`,
        });

        const data = res.data;

        if (currency?.value) {
          setPrice(data.market_data.current_price[currency.value]);
          setStandardPrice(data.market_data.current_price[currency.value]);
        }

        setData(data);
      } catch (error) {
        alert(
          "데이터를 불러오는데 실패했습니다. 다시 한번 새로고침 부탁드립니다."
        );
      } finally {
        setTimeout(() => setIsLoading(false), 400);
      }
    },
    [currency?.value]
  );

  const handleConversion = useCallback(
    (e: { target: { value: React.SetStateAction<any> } }, type: string) => {
      const { value } = e.target;
      const _value = value.replace(/,/g, "");

      if (type === "btc") {
        setBtc(() => {
          setPrice(floatToFxiedUtil(_value * standardPrice, 2) || 0);
          return _value;
        });
      } else {
        setPrice(() => {
          setBtc(floatToFxiedUtil(_value / standardPrice, 8));
          return _value;
        });
      }
    },
    [standardPrice]
  );

  useEffect(() => {
    if (coinId) {
      loadMarketData(coinId);
    }
  }, [coinId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      {Object.keys(data).length > 0 && (
        <Modal
          visible={isDetailModal}
          onCancel={() => {
            onIsDetailModal(false);
          }}
        >
          {currency?.value && (
            <CoinDetail
              currency={currency}
              name={data.name}
              image={data?.image?.small}
              rank={data.market_cap_rank}
              link={data.links.homepage[0]}
              currentPrice={data.market_data.current_price[currency.value]}
              priceChangePercentage24h={
                data.market_data.price_change_percentage_24h_in_currency[
                  currency.value
                ]
              }
              marketCap={data.market_data.market_cap[currency.value]}
              totalVolume={data.market_data.total_volume[currency.value]}
              description={data.description.ko}
              btc={btc}
              price={price}
              onConversion={handleConversion}
            />
          )}
        </Modal>
      )}
    </React.Fragment>
  );
};

export default React.memo(CoinDetailFeature);
