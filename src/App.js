import React, { Component } from 'react';
import './App.css';

class CalculatorOutput extends Component {
  render() {
    return(
      <div className="Calc-Out">
        Shared Calculator Output
      </div>
    );
  }
}

class LocalCalculator extends Component {
  constructor(props) {
    super(props);
    this.buttonPressHandler = this.buttonPressHandler.bind(this);
  }

  buttonPressHandler(e) {

  }

  render() {
    return(
      <div>
        <div className="Instructions">You may use +, -, *, / operators. Spaces and unknown symbols (including parens) are ignored.</div>
        <br />
        <div className="Calc-In">
          <div className="Input-Window">Test</div>
          <div className="Submit-Button" onClick={this.buttonPressHandler}>Submit</div>
        </div>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return(
      <div>
        <div className="Header-Box">
          <h2 className="Header">A Shared Calculator</h2>
        </div>
        <p className="Me-Intro">
          Here's a calculator. I only brought one though, so you'll need to share.
        </p>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <br />
        <LocalCalculator />
        <br /><br />
        <CalculatorOutput />
      </div>
    );
  }
}

export default App;
