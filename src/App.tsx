import React, { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "src/core/providers/CurrencyProvider";
import { MarketPage, BookmarkPage } from "src/components/pages";
import { Nav } from "src/components/UI/molecules";

function App() {
  const navList = useMemo(
    () => [
      { to: "/market?", text: "가장자산 시세목록", active: true },
      { to: "/bookmark", text: "북마크 목록" },
    ],
    []
  );

  return (
    <div className="App">
      <Nav list={navList} />
      <CurrencyProvider>
        <Routes>
          <Route path="/" element={<MarketPage />}></Route>
          <Route path="/market" element={<MarketPage />}></Route>
          <Route path="/bookmark" element={<BookmarkPage />}></Route>
        </Routes>
      </CurrencyProvider>
    </div>
  );
}

export default App;
