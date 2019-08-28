import React, { useContext, useState } from "react";

import StoreContext from "../store";

import styles from "./Stats.module.css";
import formStyles from "../components/Form.module.css";
import StatOnWord from "../components/StatOnWord";

const Stats = () => {
  const { words, stats } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("ALPHABETICALLY");

  return (
    <div>
      <aside className={styles.optionsPanel}>
        <div>
          <h3>Search by Word</h3>

          <input
            type="text"
            className={formStyles.input}
            onChange={e => setSearchTerm(e.target.value.trim().toLowerCase())}
            placeholder="Search..."
          />
        </div>
        <div className={styles.sortSection}>
          <h3>Sort By</h3>

          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
            className={formStyles.input}
          >
            <option value="ALPHABETICALLY">Alphabetically</option>
            <option value="PRECISION">Precision</option>
            <option value="AVG_SPEED">Avg. Speed</option>
            <option value="ATTEMPTS">Attemps</option>
            <option value="CORRECT_ATTEMPTS">Correct</option>
          </select>
        </div>
      </aside>

      <ul className={styles.list}>
        {words
          .filter(word => {
            if (!searchTerm) return true;
            return word.includes(searchTerm);
          })

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
          .sort((a, b) => {
            switch (sortOption) {
              case "ALPHABETICALLY":
                return a.word > b.word ? 1 : -1;
              case "PRECISION":
                return b.precision - a.precision; // Highest to lowest
              case "AVG_SPEED":
                return b.avgSpeed - a.avgSpeed;
              case "ATTEMPTS":
                return b.attempts - a.attempts;
              case "CORRECT_ATTEMPTS":
                return b.correctAttempts - a.correctAttempts;
            }
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
