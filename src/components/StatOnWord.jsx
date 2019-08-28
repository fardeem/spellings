import React from "react";

import styles from "./StatOnWord.module.css";

const StatOnWord = ({
  word,
  attempts,
  correctAttempts,
  avgSpeed,
  precision
}) => (
  <>
    <p>{word}</p>
    <ul className={styles.detailsList}>
      <li>
        <span>Attempts</span>
        <span>{attempts}</span>
      </li>
      <li>
        <span>Correct</span>
        <span>{correctAttempts}</span>
      </li>
      <li>
        <span>Precision</span>
        <span>{Math.round(precision * 100)}</span>
      </li>
      <li>
        <span>Avg. Speed</span>
        <span>{Math.round(avgSpeed / 1000)}</span>
      </li>
    </ul>
  </>
);

export default StatOnWord;
