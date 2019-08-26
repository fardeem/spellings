import React, { useState, useEffect, useRef } from "react";

import styles from "./Form.module.css";

const Form = ({ word, next }) => {
  const [input, setInput] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const inputEl = useRef(null);

  function nextWord() {
    setInput("");
    setShowAnswer(false);
    next();
  }

  useEffect(() => {
    function bindKeys(e) {
      if (e.target === inputEl.current) return;
      if (!showAnswer) return;

      if (e.key === "n" || e.key === "ArrowRight") nextWord();
    }

    window.addEventListener("keyup", bindKeys);

    return () => {
      window.removeEventListener("keyup", bindKeys);
    };
  }, [showAnswer, nextWord]);

  useEffect(() => {
    document.body.classList.remove("right");
    document.body.classList.remove("wrong");
  }, [word]);

  function handleSubmit(e) {
    e.preventDefault();
    setShowAnswer(true);

    if (input.toLowerCase() === word.toLowerCase()) {
      document.body.classList.add("right");
    } else {
      document.body.classList.add("wrong");
    }
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={showAnswer}
          ref={inputEl}
        />
        <input type="submit" className={styles.btn} />
      </form>

      {showAnswer && (
        <section>
          <div className={styles.feedback}>
            <h2>
              {answer.toLowerCase() === word.toLowerCase() ? (
                "Correct!"
              ) : (
                <>
                  Wrong! <br /> Correct spelling: <b>{word}</b>
                </>
              )}
            </h2>
          </div>

          <div className={styles.feedbackBtnArea}>
            <button className={styles.btn} onClick={nextWord}>
              Next
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Form;
