import React, { useContext, useState } from "react";

import StoreContext from "../store";

import styles from "./WordList.module.css";
import formStyles from "../components/Form.module.css";

const WordList = () => {
  const { words, dispatch } = useContext(StoreContext);
  const [newWord, setNewWord] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!words.includes(newWord.trim().toLowerCase())) {
      dispatch({
        type: "ADD_WORD",
        value: { word: newWord }
      });
    }

    setNewWord("");
  }

  return (
    <article className={styles.container}>
      <div>
        <h1 className={styles.heading}>Add Word</h1>

        <form onSubmit={handleSubmit} className={formStyles.form}>
          <input
            type="text"
            value={newWord}
            onChange={e => setNewWord(e.target.value)}
            className={formStyles.input}
          />
          <input type="submit" className={formStyles.btn} />
        </form>
      </div>

      <div>
        <h1 className={styles.heading}>Word List</h1>
        <ol className={styles.list}>
          {words.map((word, i) => (
            <li key={i} className={styles.listItem}>
              {word}
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
};

export default WordList;
