import React, { createContext, useReducer, useEffect } from "react";

import initialStore from "./initStore";

const StoreContext = createContext({});
export default StoreContext;

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialStore, () => {
    const localCache = localStorage.getItem("SPELLINGS_STORE");

    if (localCache) return JSON.parse(localCache);
    else return initialStore;
  });

  useEffect(() => {
    localStorage.setItem("SPELLINGS_STORE", JSON.stringify(store));
  }, [store]);

  return (
    <StoreContext.Provider value={{ ...store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

function reducer(store, statToAdd) {
  const statsOnWord = store[statToAdd.word] || [];
  statsOnWord.push({
    isCorrect: statToAdd.isCorrect,
    date: statToAdd.date,
    speed: statToAdd.speed
  });

  const stats = Object.assign({}, store.stats, {
    [statToAdd.word]: statsOnWord
  });

  return { ...store, stats };
}
