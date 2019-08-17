import React, { useState } from "react";
import "./Player.css";

const Sound = ({ word }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  function playSound() {
    setIsPlaying(true);
    const msg = new SpeechSynthesisUtterance(word);
    msg.rate = 0.8;
    msg.pitch = 1.2;
    msg.onend = () => {
      setIsPlaying(false);
    };

    speechSynthesis.speak(msg);
  }

  return (
    <div className="control">
      <div className={`sound ${!isPlaying && "is-paused"}`} onClick={playSound}>
        <div className="sound__icon" />
      </div>
      <p className="counter">Spelling 1 of 10</p>
    </div>
  );
};

export default Sound;
