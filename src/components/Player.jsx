import React, { useState, useEffect } from "react";
import styles from "./Player.module.css";

const Sound = ({ word, start }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  function playSound() {
    setIsPlaying(true);
    const msg = new SpeechSynthesisUtterance(word);
    msg.rate = 0.8;
    msg.pitch = 1.2;
    msg.onend = () => {
      setIsPlaying(false);
      // @ts-ignore
      document.querySelector("input[type=text]").focus();
    };

    speechSynthesis.speak(msg);
    start();
  }

  useEffect(() => {
    function bindKeys(e) {
      if (e.target === document.body && e.key === " ") playSound();
    }

    window.addEventListener("keyup", bindKeys);

    return () => {
      window.removeEventListener("keyup", bindKeys);
    };
  });

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
