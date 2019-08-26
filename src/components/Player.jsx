import React, { useState } from "react";
import styles from "./Player.module.css";

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
    <div
      className={`${styles.sound} ${!isPlaying && styles.isPaused}`}
      onClick={playSound}
    >
      <div className={styles.soundIcon} />
    </div>
  );
};

export default Sound;
