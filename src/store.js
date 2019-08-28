import React, { createContext, useReducer, useEffect } from "react";

import initialStore from "./initStore";

const StoreContext = createContext({
  words: [],
  stats: {},
  dispatch: action => {}
});
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

function reducer(state, action) {
  const { type, value } = action;
  let { words, stats } = state;

  if (type === "REMOVE_WORD") {
    words.splice(words.indexOf(value.word), 1);

    if (stats[value.word]) delete stats[value.word];
  }

  if (type === "ADD_WORD") {
    words.push(value.word);
  }

  if (type === "ADD_STAT") {
    const statsByWord = stats[value.word] || [];
    statsByWord.push({
      date: value.date,
      speed: value.speed,
      isCorrect: value.isCorrect
    });

    stats = {
      ...stats,
      [value.word]: statsByWord
    };
  }
  console.log(state);
  return { words, stats };
}
