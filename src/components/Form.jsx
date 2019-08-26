import React, { useState, useEffect } from "react";
import "./Form.css";
import Feedback from "./Feedback";

const Form = ({ word }) => {
  const [input, setInput] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (!showAnswer) return;
    window.addEventListener("keyup", e => {
      console.log(e);
    });
  }, [showAnswer]);

  return (
    <div>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          setShowAnswer(true);
          // setInput("");

          if (input.toLowerCase() === word.toLowerCase()) {
            document.body.classList.add("right");
          } else {
            document.body.classList.add("wrong");
          }
        }}
      >
        <input
          type="text"
          className="form__input form__input--answer"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={showAnswer}
        />
        <input type="submit" className="form__input form__input--submit" />
      </form>

      {showAnswer && <Feedback word={word} answer={input} />}
    </div>
  );
};

export default Form;
