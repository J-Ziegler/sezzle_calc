import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

class Calculation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expression: this.props.value.expression,
      result: this.props.value.result,
    }
  }

  render() {
    return(
      <div className="Equation">{this.state.expression} = {this.state.result}</div>
    );
  }
}

class CalculatorOutput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      socket: this.props.socket,
    };

    this.state.socket.emit('get all', 0);
    this.updateResults = this.updateResults.bind(this);
  }

  componentDidMount() {
    this.state.socket.on('update', (res) => {
      this.updateResults(res);
    });
    this.state.socket.on('return all', (res) => {
      this.updateResults(res);
    });
  }

  updateResults(res) {
    this.setState({results: res});
    console.log('Results updated');
  }

  render() {
    return(
      <div className="Calc-Out">
        {this.state.results.map((result) =>
          <Calculation key={result.key} value={result}/>
        )}
      </div>
    );
  }
}

class LocalCalculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: io.connect('localhost:3001'),
      equation: '',
      invalidEntry: true,
    };

    this.submitButtonHandler = this.submitButtonHandler.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
  }

  componentDidMount() {
    this.state.socket.on('invalid expression', (res) => {
      this.setState({
        equation: res,
        invalidEntry: false,
      });
    })
  }

  submitButtonHandler(e) {
    if (this.state.equation !== '') {
      this.state.socket.emit('equation', this.state.equation);
      this.setState({equation: '', invalidEntry: false});
    }
  }

  inputChanged(e) {
    this.setState({equation: e.target.value});
  }

  render() {
    return(
      <div>
        <p className="Instructions">Enter an expression into the box below.</p>
        {this.state.invalidEntry ? <div className="Error-Box">The entry you submitted in an invalid mathematical expression. Please try again.</div> : null}
        <br /><br />
        <div className="Calc-In">
          <input className="Input-Window" type="text" value={this.state.equation} onChange={this.inputChanged}></input>
          <div className="Submit-Button" onClick={this.submitButtonHandler}>Submit</div>
        </div>
        <br /><br />
        <CalculatorOutput socket={this.state.socket}/>
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
      </div>
    );
  }
}

export default App;
