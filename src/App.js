import React, { Component } from 'react';
import { shuffle } from 'lodash';
import axios from 'axios';

import './App.css';

import Sound from './sound.js';
import { airtable } from './settings.js';

const endpoint = `https://api.airtable.com/v0/${airtable.id}/${airtable.table}?view=Grid%20view&api_key=${airtable.key}`;



class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      isLoading: true,
      index: 0,
      answer: '',
      hasAnswered: false,
      isCorrect: false
    };

    this.submitAnswer = this.submitAnswer.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    axios(endpoint).then( (res) => {
      const data = res.data.records.map( ({id, fields}) => {
        return { id, fields };
      });
      this.setState({ data: shuffle(data), isLoading: false });
    });

    document.onkeydown = (e) => {
      if (e.which === 39 && this.state.hasAnswered) {
        this.next();
      }
    }
  }

  submitAnswer(e) {
    e.preventDefault();
    const { data, index, answer } = this.state;
    const record = data[index];

    if (answer.trim().length === 0)
      return;

    let correct = record.fields.correct || 0;
    let attempts = record.fields.attempts + 1 || 1;
    
    if( answer === record.fields.Name ) {
      correct += 1;
      this.setState({ hasAnswered: true, isCorrect: true });
    } else {
      this.setState({ hasAnswered: true, isCorrect: false });      
    }

    axios({
      url: `https://api.airtable.com/v0/${airtable.id}/main/${record.id}/`,
      headers: {
        'Authorization': `Bearer ${airtable.key}`,
        'Content-type': 'application/json'
      },
      method: 'patch',
      data: {
        "fields": {
          "attempts": attempts,
          "correct": correct
        }
      },
    });
  }

  next() {
    const { index, data } = this.state;
    
    let nextNum = index + 1 < data.length ? index + 1 : 0;

    this.setState({
      index: nextNum,
      hasAnswered: false,
      answer: '',
      isCorrect: false
    });

    if (nextNum === 0) {
      this.setState({ data: shuffle(data) });
    }
  }

  render() {
    const { data, index, isLoading, answer, hasAnswered, isCorrect } = this.state;
    const doc = data[index];
    const btnState = hasAnswered ? { disabled: true } : {};

    return ! isLoading ? (
      <div className={`container ${ isLoading ? 'loading' : 'loaded'}`}>
        <p className="counter">Spelling &nbsp; {index + 1} / {data.length}</p>
        <Sound word={doc.fields.Name} />
        
        <form onSubmit={this.submitAnswer}>
          <input
            type="text"
            className="input input--answer"
            value={answer}
            onChange={(e) => this.setState({ answer: e.target.value })} />{/*
          */}<input type="submit" {...btnState} className="input input--submit" />
        </form>

        {hasAnswered ? <div className="feedback">
          <h1>
            That was {isCorrect ? 'correct' : 'incorrect. You dummy!'}.
            {! isCorrect ? <DiffSpelling word={doc.fields.Name} answer={answer} /> : ''}
          </h1>
          <div className="next" onClick={this.next}>Next Word →</div>
        </div> : null}
      </div>
    ) : null;
  }
}

const DiffSpelling = ({ word, answer }) => (
  <div>
    The right spelling was<span>&nbsp;</span>
    {word.split('').map( (char, index) => {
      if (char === answer[index]) {
        return { char };
      } else {
        return { char, flagged: true };
      }
    }).map( (letter, i) => (
      <span key={i} className={'status-' + (letter.flagged || '')}>{letter.char}</span>
    ))}
  </div>
);

export default App;
