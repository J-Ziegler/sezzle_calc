import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

class CalculatorOutput extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.setState({socket: this.props.socket}) &&
    this.state.socket.emit('get-all', '0') &&
    this.state.socket.on('give-all', function(res) {
      alert('message received');
      console.log('message received');
    });
  }

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

    this.submitButtonHandler = this.submitButtonHandler.bind(this);
  }

  submitButtonHandler(e) {
    this.state.socket.emit('get-all', '3 + 3');
  }

  componentWillMount() {
    this.setState({
      socket: io.connect('localhost:3001'),
    });
  }

  componentDidMount() {
    this.state.socket.on('give-all', function(res) {
      console.log(res);
    });
  }

  render() {
    return(
      <div>
        <div className="Instructions">You may use +, -, *, / operators. Spaces and unknown symbols (including parens) are ignored.</div>
        <br />
        <div className="Calc-In">
          <div className="Input-Window">Test</div>
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
