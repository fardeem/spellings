import React, { useContext, useEffect, useState } from "react";

import StoreContext from "../store";
import Form from "../components/Form";

import styles from "./Practice.module.css";

const Practice = () => {
  const { words, stats } = useContext(StoreContext);
  const [option, setOption] = useState("RANDOM"); // RANDOM/DIFFICULTY
  const [queue, setQueue] = useState([]);
  const [practiceIndex, setPracticeIndex] = useState(0);

  useEffect(() => {
    if (option === "RANDOM")
      setQueue([].concat(words).sort(() => Math.random() - 0.5));
    else if (option === "DIFFICULTY") {
      const wordListWithPrecision = words.map(word => {
        let precision = 0;

        if (stats[word]) {
          const statsOnWord = stats[word];
          precision =
            statsOnWord.filter(({ isCorrect }) => isCorrect).length /
            statsOnWord.length;
        }

        return { word, precision };
      });

      setQueue(
        wordListWithPrecision
          .sort((a, b) => a.precision - b.precision)
          .map(({ word }) => word)
      );
    }

    setPracticeIndex(0);
    // eslint-disable-next-line
  }, [option, words]);

  function nextWord() {
    return setPracticeIndex(index => index + 1);
  }

  return (
    <div>
      <div className={styles.control}>
        <p className="counter">
          Spelling {practiceIndex + 1} of {queue.length}
        </p>

        <label>
          <span>Sort By </span>
          <select
            value={option}
            className={styles.select}
            onChange={e => setOption(e.target.value)}
          >
            <option value="RANDOM">Random</option>
            <option value="DIFFICULTY">Difficulty</option>
          </select>
        </label>
      </div>

      <Form word={queue[practiceIndex]} next={nextWord} />
    </div>
  );
};

export default Practice;
