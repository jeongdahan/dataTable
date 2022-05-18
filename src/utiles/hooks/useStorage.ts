import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialState: any) => {
  const item: any = window.localStorage.getItem(key);
  const [state, setState] = useState(() => JSON.parse(item) || initialState);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export { useLocalStorage };
