import React from "react";

import Player from "../components/Player";
import Form from "../components/Form";

import styles from "./Practice.module.css";

const Practice = () => (
  <div>
    <div className={styles.control}>
      <Player word="Extravagance" />

      <div className={styles.metaPanel}>
        <p className="counter">Spelling 1 of 10</p>

        <label className={styles.selectLabel}>
          <span>Practice </span>
          <select className={styles.select}>
            <option value="imp">Filtered</option>
            <option value="all">All</option>
          </select>
        </label>
      </div>
    </div>

    <Form word="Extravagance" />
  </div>
);

export default Practice;
