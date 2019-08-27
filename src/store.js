import React, { createContext, useReducer } from "react";

import sampleStore from "./storeInit.js";

const StoreContext = createContext({
  words: [],
  stats: {},
  dispatch: item => {}
});
export default StoreContext;

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, sampleStore);

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
