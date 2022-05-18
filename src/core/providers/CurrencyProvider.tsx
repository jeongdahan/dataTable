import React, { useState, useMemo, createContext } from "react";

interface ICurrencyProviderProps {
  children?: React.ReactNode;
}

interface ICurrencyContext {
  icon: string;
  value: string;
  text: string;
}

const CurrencyContext = createContext<ICurrencyContext | any>(null);

const CurrencyProvider = ({ children }: ICurrencyProviderProps) => {
  const currencyList = useMemo(
    () => [
      {
        icon: "₩",
        value: "krw",
        text: "KRW 보기",
      },
      {
        icon: "$",
        value: "usd",
        text: "USD 보기",
      },
    ],
    []
  );
  const [currency, setCurrency] = useState<ICurrencyContext | null>(
    currencyList[0]
  );

  const value = {
    currencyList: currencyList,
    currency: currency,
    onCurrency: setCurrency,
  };
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyProvider, CurrencyContext };
