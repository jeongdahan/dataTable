import React from "react";
import styled from "styled-components";
import { formatUtil, floatToFxiedUtil } from "src/utiles/currencyUtil";
import { IBookmark } from "src/core/models/bookmark";
import { Icon, Select, Table } from "src/components/UI/atoms";

interface IMarketProps {
  marketData: any[];
  bookmark: IBookmark[];
  currency: { icon: string; value: string; text: string } | undefined;
  currencyList: { icon: string; value: string; text: string }[];
  onChangeCurrency: (e: {
    target: { value: React.SetStateAction<string> };
  }) => void;
  onChangeBookmark: (bookmark: IBookmark) => void;
  onMarketDataMore: () => void;
  onClick: (coinId: string) => void;
}

const Market = ({
  marketData,
  bookmark,
  currency,
  currencyList,
  onChangeCurrency,
  onChangeBookmark,
  onMarketDataMore,
  onClick,
}: IMarketProps) => {
  return (
    <MarketStyle>
      <SelectStyle>
        <Select
          data={currency}
          list={currencyList}
          onChange={onChangeCurrency}
        />
      </SelectStyle>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th align="left">자산</Table.Th>
            <Table.Th></Table.Th>
            <Table.Th align="right">Price</Table.Th>
            {/* <Table.Th align="right">1H</Table.Th> */}
            <Table.Th align="right">24H</Table.Th>
            {/* <Table.Th align="right">7h</Table.Th> */}
            <Table.Th align="right">24H Volume</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {marketData.map((data) => (
            <Table.Tr key={data.symbol}>
              <Table.Td
                onClick={() =>
                  onChangeBookmark({
                    id: data.id,
                    name: data.name,
                    symbol: data.symbol,
                    current_price: data.current_price,
                    price_change_percentage_24h:
                      data.price_change_percentage_24h,
                    total_volume: data.total_volume,
                    currency: currency,
                  })
                }
              >
                {bookmark.findIndex((item) => item.id === data.id) > -1 ? (
                  <Icon name="star_on" className="active" />
                ) : (
                  <Icon name="star_off" />
                )}
              </Table.Td>
              <Table.Td align="left" onClick={() => onClick(data.id)}>
                {data.name}
              </Table.Td>
              <Table.Td>{data.symbol}</Table.Td>
              <Table.Td align="right">
                {currency?.icon}{" "}
                {formatUtil(floatToFxiedUtil(data.current_price, 2))}
              </Table.Td>
              {/* <Table.Td align="right" className={10 > 1 ? "plus" : "minus"}>
                1%
              </Table.Td> */}
              <Table.Td
                align="right"
                className={
                  data.price_change_percentage_24h > 0 ? "plus" : "minus"
                }
              >
                {floatToFxiedUtil(data.price_change_percentage_24h, 2)}%
              </Table.Td>
              {/* <Table.Td align="right" className={10 > 1 ? "plus" : "minus"}>
                34.1%
              </Table.Td> */}
              <Table.Td align="right">
                <div>
                  {currency?.icon}{" "}
                  {formatUtil(floatToFxiedUtil(data.total_volume, 2))}
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
        <Table.Tfoot>
          <Table.Tr>
            <Table.Td col={8} onClick={onMarketDataMore}>
              더보기
            </Table.Td>
          </Table.Tr>
        </Table.Tfoot>
      </Table>
    </MarketStyle>
  );
};

const SelectStyle = styled.div`
  text-align: right;
`;

const MarketStyle = styled.div`
  padding: 1rem;

  table tr td .active {
    fill: ${(props) => props.theme.color.yellow_600};
  }
`;

export default React.memo(Market);
