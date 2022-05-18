import React, { useState } from "react";
import styled from "styled-components";
import { floatToFxiedUtil, formatUtil } from "src/utiles/currencyUtil";
import { Icon, Input, Table } from "src/components/UI/atoms";

interface CoinDetailProps {
  currency: { icon: string; value: string; text: string } | undefined;
  name: string;
  image: string;
  rank: string;
  link: string;
  currentPrice: string;
  priceChangePercentage24h: number;
  marketCap: string;
  totalVolume: string;
  description: string;
  btc: number | string | undefined;
  price: number | string | undefined;
  onConversion: (e: any, type: string) => void;
}

const CoinDetail = ({
  currency,
  name,
  image,
  rank,
  link,
  currentPrice,
  priceChangePercentage24h,
  marketCap,
  totalVolume,
  description,
  btc,
  price,
  onConversion,
}: CoinDetailProps) => {
  return (
    <CoinDetailStyle>
      <TopStyle>
        <TitleStyle>
          <img src={image} alt={name} />
          <div>{name}</div>
        </TitleStyle>
        <InfoWrapStyle>
          <Table className="infoTable">
            <Table.Tbody>
              <Table.Tr>
                <Table.Th align="left">시가총액 Rank</Table.Th>
                <Table.Td align="left">Rank #{rank}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th align="left">웹사이트</Table.Th>
                <Table.Td align="left">
                  <a href={link} target="_blank">
                    {link}
                  </a>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
          <InfoStyle>
            <div className="priceWrap">
              <span className="currentPrice">
                {currency?.icon} {formatUtil(floatToFxiedUtil(currentPrice, 2))}
              </span>
              <span
                className={
                  priceChangePercentage24h > 0
                    ? "plus rate24h"
                    : "minus rate24h"
                }
              >
                {floatToFxiedUtil(priceChangePercentage24h, 2)}%
              </span>
            </div>
            <div>
              <span className="marketCap">
                시가총액 <br /> {currency?.icon}{" "}
                {formatUtil(floatToFxiedUtil(marketCap, 2))}
              </span>
              <span className="transactionAmount">
                24시간 거래대금 <br /> {currency?.icon}{" "}
                {formatUtil(floatToFxiedUtil(totalVolume, 2))}
              </span>
            </div>
          </InfoStyle>
        </InfoWrapStyle>
        <PriceCalculationStyle>
          <div className="title">가격 계산</div>
          <div className="contents">
            <div className="inputWrap">
              <div className="inputTitle">BTC</div>
              <Input
                type="number"
                step="0.00000001"
                value={btc}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => {
                  const { value } = e.target;

                  if (String(value).split(".")[1]?.length > 8) {
                    return value;
                  }
                  onConversion(e, "btc");
                }}
              />
            </div>

            <Icon name="trade" className="trade" />
            <div className="inputWrap">
              <div className="inputTitle">{currency?.value.toUpperCase()}</div>
              <Input
                type="text"
                value={formatUtil(String(price).replace(/(^0+)/, ""))}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => {
                  const { value } = e.target;

                  if (String(value).split(".")[1]?.length > 2) {
                    return value;
                  }

                  onConversion(e, "price");
                }}
              />
            </div>
          </div>
        </PriceCalculationStyle>
      </TopStyle>
      <BottomStyle>
        <Description>{description}</Description>
      </BottomStyle>
    </CoinDetailStyle>
  );
};

const CoinDetailStyle = styled.div``;

const TopStyle = styled.div`
  padding: 0.5rem;
`;

const BottomStyle = styled.div`
  padding: 0.5rem;

  border-top: 1px solid ${(props) => props.theme.color.gray_400};
`;

const TitleStyle = styled.div`
  display: flex;
  align-items: center;

  ${(props) => props.theme.typography.h2};

  img {
    display: block;
    margin-right: 0.5rem;

    width: 3.125rem;
    height: 3.125rem;
  }
`;

const InfoWrapStyle = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 1rem;

  .infoTable {
    width: 50%;
    tr th,
    tr td {
      border: 1px solid ${(props) => props.theme.color.gray_600};
    }

    tr th {
      width: 50%;

      background-color: ${(props) => props.theme.color.gray_400};
    }
  }
`;

const InfoStyle = styled.div`
  .priceWrap {
    margin-bottom: 2rem;

    text-align: right;

    .currentPrice {
      ${(props) => props.theme.typography.display_1};
      font-weight: 700;
    }

    .rate24h {
      display: inline-block;
      margin-left: 1rem;

      ${(props) => props.theme.typography.display_2};
      font-weight: 700;

      &.plus {
        color: ${(props) => props.theme.color.red_400};
      }

      &.minus {
        color: ${(props) => props.theme.color.blue_400};
      }
    }
  }

  .marketCap,
  .transactionAmount {
    display: inline-block;
    margin-left: 2rem;

    ${(props) => props.theme.typography.display_2};
    font-weight: 700;
    text-align: right;
  }
`;

const PriceCalculationStyle = styled.div`
  margin-top: 1rem;
  padding: 1rem;

  background-color: ${(props) => props.theme.color.gray_400};

  .title {
    ${(props) => props.theme.typography.h3};
  }

  .contents {
    display: flex;
    justify-content: center;
    align-items: center;

    .trade {
      margin: 0 1rem;
    }

    .inputWrap {
      display: flex;
      justify-content: center;
      align-items: center;

      .inputTitle {
        padding: 0.3125rem 0.5rem;
        ${(props) => props.theme.typography.h3};

        background-color: lightgray;
        border: 1px solid ${(props) => props.theme.color.gray_400};
      }
    }
  }
`;

const Description = styled.div`
  max-height: 50vh;

  ${(props) => props.theme.typography.display_2};
  line-height: 1.5;
  word-break: keep-all;

  overflow-y: auto;
`;

export default React.memo(CoinDetail);
