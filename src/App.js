import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var uuid = require('uuid');
var firebase = require('firebase');




var config = {
    apiKey: "AIzaSyCvtplcQL3Gum3enw3zAHTHbdX0ku5hcdE",
    authDomain: "simplesurvey-2bbb5.firebaseapp.com",
    databaseURL: "https://simplesurvey-2bbb5.firebaseio.com",
    storageBucket: "simplesurvey-2bbb5.appspot.com",
    messagingSenderId: "226308527195"
};
firebase.initializeApp(config);


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: uuid.v1(),
            name: '',
            answers: {
                q1: '',
                q2: '',
                q3: '',
                q4: ''
            },
            submitted: false
        }

        this.handleQuestionChange = this.handleQuestionChange.bind(this);
    }
    handleNameSubmit(event) {
        var name = this.refs.name.value;
        this.setState({ name: name }, function() {
            console.log(this.state);
        });
        event.preventDefault();
    }
    handleQuestionSubmit(event) {
      firebase.database().ref('surveys/'+this.state.id).set({
        name: this.state.name,
        answers: this.state.answers
      });
      this.setState({submitted:true}, function() {
        console.log('questions submitted');
      });
      event.preventDefault();
    }
    handleQuestionChange(event) {
        var answers = this.state.answers;
        if (event.target.name === 'q1') {
            answers.q1 = event.target.value;
        } else if (event.target.name === 'q2') {
            answers.q2 = event.target.value;
        } else if (event.target.name === 'q3') {
            answers.q3 = event.target.value;
        } else if (event.target.name === 'q4') {
            answers.q4 = event.target.value;
        } else if (event.target.name === 'q5') {
            answers.q5 = event.target.value;
        }
        this.setState({ answers: answers }, function() {
            console.log(this.state);
        });
    }

    render() {
        var user;
        var questions;
        if (this.state.name && this.state.submitted === false) {
            user = <h2> Welcome {this.state.name}</h2>
            questions = <span>
        <h3>Question List</h3>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>
          <div>
            <label>Have you heard of any of these devices?</label><br />
            <input type="radio" name="q1" value="oculus" onChange={this.handleQuestionChange} />Oculus Rift<br />
            <input type="radio" name="q1" value="gear" onChange={this.handleQuestionChange} />Gear VR<br />
            <input type="radio" name="q1" value="vive" onChange={this.handleQuestionChange} />HTC Vive<br />
            <input type="radio" name="q1" value="cardboard" onChange={this.handleQuestionChange} />Google Cardboard<br />
            <input type="radio" name="q1" value="daydream" onChange={this.handleQuestionChange} />DayDream<br />
          </div>
          <div>
            <label>Have you ever used a VR kit?</label><br />
            <input type="radio" name="q2" value="yes-abit" onChange={this.handleQuestionChange} />yes over an hour <br />
            <input type="radio" name="q2" value="yes" onChange={this.handleQuestionChange} />yes under an hour <br />
            <input type="radio" name="q2" value="no" onChange={this.handleQuestionChange} />no<br />
            <input type="radio" name="q2" value="noty" onChange={this.handleQuestionChange} />no, and the idea makes me sick<br />
          </div>
          <div>
            <label>Do you plan on purchasing a vr kit in the future?</label><br />
            <input type="radio" name="q3" value="zelda" onChange={this.handleQuestionChange} />Zelda<br />
            <input type="radio" name="q3" value="metal-gear" onChange={this.handleQuestionChange} />Metal Gear<br />
            <input type="radio" name="q3" value="final-fantasy" onChange={this.handleQuestionChange} />Final Fantasy<br />
            <input type="radio" name="q3" value="tomb-raider" onChange={this.handleQuestionChange} />Tomb Raider<br />
            <input type="radio" name="q3" value="metroid" onChange={this.handleQuestionChange} />Metroid<br />
          </div>
          <div>
            <label>Do you play video games?</label><br />
            <input type="radio" name="q4" value="zelda" onChange={this.handleQuestionChange} />Zelda<br />
            <input type="radio" name="q4" value="metal-gear" onChange={this.handleQuestionChange} />Metal Gear<br />
            <input type="radio" name="q4" value="final-fantasy" onChange={this.handleQuestionChange} />Final Fantasy<br />
            <input type="radio" name="q4" value="tomb-raider" onChange={this.handleQuestionChange} />Tomb Raider<br />
            <input type="radio" name="q4" value="metroid" onChange={this.handleQuestionChange} />Metroid<br />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </span>
        } else if (!this.state.name && this.state.submitted === false) {
            user = <span>
        <h2>Please enter your name to begin the survey</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type="text" placeholder="enter name" ref="name" />
        </form>
        </span>;
            questions = '';
        } else if (this.state.submitted === true) {
          user = <h2>Thank you, {this.state.name}! </h2>
        }
        return (
            <div className="App">
        <div className="App-header text-center">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>SimpleSurvey</h2>
        </div>
          <div className="text-center">
          {user}
        </div>
        <div className="container">
          {questions}
        </div>
      </div>
        );
    }
}

export default App;
