import React, { useContext, useEffect, useState } from "react";

import StoreContext from "../store";
import Form from "../components/Form";

import styles from "./Practice.module.css";

const Practice = () => {
  const { words } = useContext(StoreContext);
  const [option, setOption] = useState("ALL"); // ALL/FILTERED
  const [queue, setQueue] = useState([]);
  const [practiceIndex, setPracticeIndex] = useState(0);

  useEffect(() => {
    if (option === "FILTERED") setQueue([]);
    else if (option === "ALL") setQueue(words);

    setPracticeIndex(0);
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
          <span>Practice </span>
          <select
            value={option}
            className={styles.select}
            onChange={e => setOption(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="FILTERED">Filtered</option>
          </select>
        </label>
      </div>

      <Form word={queue[practiceIndex]} next={nextWord} />
    </div>
  );
};

export default Practice;
