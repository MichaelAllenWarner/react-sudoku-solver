import React, { Component } from 'react';
import { Cell } from './Cell';
import { Submit } from './Submit';
import { Clear } from './Clear';
import { StringEntry } from './StringEntry';
import { Solution } from './Solution';

export class App extends Component {
  state = {
    boardArray: Array.from({ length: 81 }, () => '0'),
    solutionArray: Array.from({ length: 81 }, () => 0 ),
    status: 'ready' // can be: ready, cleared, solving, solved, invalid
  };

  cellInputRefs = Array.from({ length: 81 }, () => React.createRef());

  solve = () => {
    this.worker.postMessage(this.state.boardArray.join(''));
    this.setState({ status: 'solving' });
  };

  updateBoardArray = (index, cellVal) => {
    this.setState(state => {
      const newBoardArray = [...state.boardArray];
      newBoardArray[index] = cellVal;
      return { boardArray: newBoardArray };
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
      solutionArray: Array.from({ length: 81 }, () => 0 ),
      status: 'cleared'
    });
  };

  componentDidUpdate() {
    this.setState(state => (state.status === 'cleared') ? { status: 'ready' } : null);
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
        this.setState({ status: 'invalid' });
      }
    });
  }

  render() {
    const rows = Array.from({ length: 9 }, (_el, rowNum) => {
      const cells = Array.from({ length: 9 }, (_el, colNum) => 
        <Cell
          key={colNum.toString() /* index as key is ok (no IDs, order stable) */ }
          cellNum={(rowNum * 9) + colNum}
          boardVal={this.state.boardArray[(rowNum * 9) + colNum]}
          solutionVal={this.state.solutionArray[(rowNum * 9) + colNum].toString()}
          status={this.state.status}
          cellInputRefs={this.cellInputRefs}
          solve={this.solve}
          updateBoardArray={this.updateBoardArray}
        />
      );
      return (   
        <tr
          key={rowNum.toString() /* index as key is ok (no IDs, order stable) */ }
          rowNum={rowNum}
        >
          {cells}
        </tr>
      );
    });

    return (
      <>
        <h1>Mike’s Sudoku Solver</h1>
        <table>{rows}</table>
        <div id="divBelowBoard">
          <div id="buttons">
            <Submit
              solve={this.solve}
              status={this.state.status}
            />
            <Clear
              clearBoard={this.clearBoard}
              status={this.state.status}
            />
          </div>
          <StringEntry
            solve={this.solve}
            replaceBoardArray={this.replaceBoardArray}
            boardArray={this.state.boardArray}
            status={this.state.status}
          />
          <Solution
            solutionArray={this.state.solutionArray}
            status={this.state.status}
          />
        </div>
      </>
    );
  }
}