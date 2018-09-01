import React, { Component } from 'react';

class Sound extends Component {
  constructor() {
    super();

    this.state = {
      isPaused: false
    };
    this.playSound = this.playSound.bind(this);
  }
  
  playSound() {
    this.setState({ isPaused: true });
    const msg = new SpeechSynthesisUtterance(this.props.word);
    
    msg.rate = 0.8;
    msg.pitch = 1.2;
    msg.onend = () => {
      this.setState({ isPaused: false });
    };
    speechSynthesis.speak(msg);    
  }

  render() {
    return (
      <div className={`sound ${this.state.isPaused ? '' : 'is-play' }`} onClick={this.playSound}>
        <div className="sound__icon"></div>
      </div>
    );
  }
}

export default Sound;
