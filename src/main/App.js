import React, { Component } from 'react';
import { Title } from './Title';
import { Board } from './Board';
import { BelowBoard } from './BelowBoard';

export class App extends Component {
  state = {
    boardArray: Array.from({ length: 81 }, () => '0'),
    solutionArray: [],
    status: 'ready' // can be: ready, cleared, solving, solved, invalid
  };

  solve = () => {
    this.worker.postMessage(this.state.boardArray.join(''));
    this.setState({
      status: 'solving'
    });
  };

  updateBoardArray = (index, cellVal) => {
    const newBoardArray = [...this.state.boardArray];
    newBoardArray[index] = cellVal;
    this.setState({
      boardArray: newBoardArray,
    });
  };

  replaceBoardArray = newBoardArray => {
    this.setState({
      boardArray: newBoardArray,
      status: 'ready'
    });
  };

  clearBoard = () => {
    this.setState({
      boardArray: Array.from({ length: 81 }, () => '0'),
      solutionArray: [],
      status: 'cleared'
    });
  }

  componentDidUpdate() {
    if (this.state.status === 'cleared') {
      this.setState({ status: 'ready' });
    }
  }

  componentDidMount() {
    // serve ES6+ worker if browser supports modules, ES5 worker if it doesn't
    const testScript = document.createElement('script');
    const workerFilename = ('noModule' in testScript) ? 'js/worker.js' : 'js/es5-worker.js';

    this.worker = new Worker(workerFilename);

    this.worker.addEventListener('message', event => {
      if (event.data.solutionArray) {
        this.setState({
          solutionArray: event.data.solutionArray,
          status: 'solved'
        });
      } else {
        this.setState({
          status: 'invalid'
        });
      }
    });
  }

  render() {
    return (
      <>
        <Title />
        <Board
          solve={this.solve}
          updateBoardArray={this.updateBoardArray}
          solutionArray={this.state.solutionArray}
          boardArray={this.state.boardArray}
          status={this.state.status}
        />
        <BelowBoard
          solve={this.solve}
          solutionArray={this.state.solutionArray}
          replaceBoardArray={this.replaceBoardArray}
          clearBoard={this.clearBoard}
          boardArray={this.state.boardArray}
          status={this.state.status}
        />
      </>
    );
  }
}