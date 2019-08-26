import React, { createContext } from "react";

const StoreContext = createContext({
  words: []
});
export default StoreContext;

export const StoreProvider = ({ children }) => {
  const words = [
    "absurd",
    "accomplish",
    "advantageous",
    "ancient",
    "anxious",
    "astonishment",
    "bewilder",
    "blunder",
    "cautious",
    "competition",
    "disappear",
    "durability",
    "elation",
    "evidence",
    "exaggerate",
    "feasible",
    "genre",
    "grumble",
    "hazardous",
    "hesitate",
    "immediate",
    "impair",
    "implement",
    "initiate",
    "meddlesome",
    "medieval",
    "mischief",
    "monarch",
    "narrator",
    "necessaryy",
    "occasion",
    "pedestrian",
    "perish",
    "punctual",
    "receipt",
    "rhythm",
    "scatter",
    "servant",
    "solitary",
    "tremble"
  ];

  return (
    <StoreContext.Provider value={{ words }}>{children}</StoreContext.Provider>
  );
};
