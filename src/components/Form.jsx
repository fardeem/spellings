import React, { useState } from "react";
import "./Form.css";

const Form = () => {
  const [input, setInput] = useState("");

  return (
    <form className="form">
      <input
        type="text"
        className="form__input form__input--answer"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <input type="submit" className="form__input form__input--submit" />
    </form>
  );
};

export default Form;
