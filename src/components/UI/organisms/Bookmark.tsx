import React from "react";
import styled from "styled-components";
import { floatToFxiedUtil, formatUtil } from "src/utiles/currencyUtil";
import { IBookmark } from "src/core/models/bookmark";
import { Icon, Table } from "src/components/UI/atoms";

interface IBookmarkProps {
  bookmarkData: IBookmark[];
  onChangeBookmark: (bookmark: IBookmark) => void;
  onClick: (coinId: string) => void;
}

const Bookmark = ({
  bookmarkData,
  onChangeBookmark,
  onClick,
}: IBookmarkProps) => {
  return (
    <BookmarkStyle>
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
          {bookmarkData.map((data) => (
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
                    currency: data.currency,
                  })
                }
              >
                <Icon name="star_on" className="active" />
              </Table.Td>
              <Table.Td align="left" onClick={() => onClick(data.id)}>
                {data.name}
              </Table.Td>
              <Table.Td>{data.symbol}</Table.Td>
              <Table.Td align="right">
                {data.currency?.icon}{" "}
                {formatUtil(floatToFxiedUtil(data.current_price, 2))}
              </Table.Td>
              {/* <Table.Td align="right" className={10 > 1 ? "plus" : "minus"}>
                1%
              </Table.Td> */}
              <Table.Td align="right" className={10 > 11 ? "plus" : "minus"}>
                {floatToFxiedUtil(data.price_change_percentage_24h, 2)}%
              </Table.Td>
              {/* <Table.Td align="right" className={10 > 1 ? "plus" : "minus"}>
                34.1%
              </Table.Td> */}
              <Table.Td align="right">
                <div>
                  {data.currency?.icon}{" "}
                  {formatUtil(floatToFxiedUtil(data.total_volume, 2))}
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
        {bookmarkData.length ? null : (
          <Table.Tfoot>
            <Table.Tr>
              <Table.Td col={8}>북마크에 등록된 코인이 없습니다.</Table.Td>
            </Table.Tr>
          </Table.Tfoot>
        )}
      </Table>
    </BookmarkStyle>
  );
};

const BookmarkStyle = styled.div`
  padding: 1rem;

  table tr td .active {
    fill: ${(props) => props.theme.color.yellow_600};
  }
`;

export default React.memo(Bookmark);
