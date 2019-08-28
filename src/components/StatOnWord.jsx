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
    <dl className={styles.detailsList}>
      <dt className={styles.detailsItem}>Attempts</dt>
      <dd className={styles.detailsDesc}>{attempts}</dd>
      <dt className={styles.detailsItem}>Correct</dt>
      <dd className={styles.detailsDesc}>{correctAttempts}</dd>
      <dt className={styles.detailsItem}>Precision</dt>
      <dd className={styles.detailsDesc}>{Math.round(precision * 100)}%</dd>
      <dt className={styles.detailsItem}>Avg. Speed</dt>
      <dd className={styles.detailsDesc}>{Math.round(avgSpeed / 1000)}s</dd>
    </dl>
  </>
);

export default StatOnWord;
