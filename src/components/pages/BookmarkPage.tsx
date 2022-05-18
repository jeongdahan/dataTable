import React, { useState, useCallback, useContext } from "react";
import { CurrencyContext } from "src/core/providers/CurrencyProvider";
import { useLocalStorage } from "src/utiles/hooks/useStorage";
import { CoinDetailFeature } from "src/components/features";
import { IBookmark } from "src/core/models/bookmark";
import { Bookmark } from "src/components/UI/organisms";

const BookmarkPage = () => {
  const { currency } = useContext(CurrencyContext);
  const [bookmark, setBookmark] = useLocalStorage("bookmark", []);
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [coinId, setCoinId] = useState("");

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

  const handleClick = useCallback((coinId: string) => {
    setCoinId(coinId);
    setIsDetailModal(true);
  }, []);

  return (
    <React.Fragment>
      <React.Fragment>
        <Bookmark
          bookmarkData={bookmark}
          onChangeBookmark={handleChangeBookmark}
          onClick={handleClick}
        />
        <CoinDetailFeature
          coinId={coinId}
          isDetailModal={isDetailModal}
          onIsDetailModal={setIsDetailModal}
          currency={currency}
        />
      </React.Fragment>
    </React.Fragment>
  );
};

export default BookmarkPage;
