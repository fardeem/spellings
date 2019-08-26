import React from "react";
import "./Feedback.css";

const Feedback = ({ answer, word }) => {
  return (
    <div className="feedback">
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
  );
};

export default Feedback;
