import React, { useContext } from "react";

import StoreContext from "../store";

import styles from "./Stats.module.css";
import StatOnWord from "../components/StatOnWord";

const Stats = () => {
  const { words, stats } = useContext(StoreContext);

  return (
    <div>
      <ul className={styles.list}>
        {words
          .map(word => {
            const statByWord = stats[word] || [];
            const attempts = statByWord.length;
            const correctAttempts = statByWord.filter(
              ({ isCorrect }) => isCorrect
            ).length;
            const precision = correctAttempts / (attempts || 1);
            const avgSpeed =
              statByWord.reduce((sumOfSpeed, item) => {
                return sumOfSpeed + item.speed;
              }, 0) / (attempts || 1);

            return { word, attempts, correctAttempts, avgSpeed, precision };
          })
          .map((item, i) => (
            <li key={i} className={styles.item}>
              <StatOnWord {...item} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Stats;
