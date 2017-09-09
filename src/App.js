import React, { Component } from 'react';
import { shuffle } from 'lodash';
import axios from 'axios';

import './App.css';

import Sound from './sound.js';
import { airtable } from './settings.js';



const endpoint = `https://api.airtable.com/v0/${airtable.id}/main?view=Grid%20view&api_key=${airtable.key}`;

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
  }

  submitAnswer(e) {
    e.preventDefault();
    const { data, index, answer } = this.state;
    const record = data[index];

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
    const { index } = this.state;
    
    this.setState({
      index: index + 1,
      hasAnswered: false,
      answer: '',
      isCorrect: false
    });
  }

  render() {
    const { data, index, isLoading, answer, hasAnswered, isCorrect } = this.state;
    const doc = data[index];
    const btnState = hasAnswered ? { disabled: true } : {};

    return ! isLoading ? (
      <div className={`container ${ isLoading ? 'loading' : 'loaded'}`}>
        <p className="counter">Spelling #{index + 1}</p>
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
            That was {isCorrect ? 'correct' : 'incorrect'}.
            {! isCorrect ? ` The right spelling was ${data[index].fields.Name}.` : ''}
          </h1>
          <div className="next" onClick={this.next}>Next Word →</div>
        </div> : null}
      </div>
    ) : null;
  }
}



export default App;
