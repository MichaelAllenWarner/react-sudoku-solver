import React, { useState, useEffect, createRef } from 'react';
import { Cell } from './Cell';
import { Solve } from './Solve';
import { Clear } from './Clear';
import { Random } from './Random';
import { StringEntry } from './StringEntry';
import { Solution } from './Solution';

// serve ES6+ worker if browser supports modules, ES5 worker if it doesn't
const testScript = document.createElement('script');
const workerFilename = ('noModule' in testScript) ? 'js/worker.js' : 'js/es5-worker.js';
const worker = new Worker(workerFilename);

// constants and refs (should only be declared once, so outside component)
const clearedBoardArray = Array.from({ length: 81 }, () => '0');
const clearedSolutionArray = Array.from({ length: 81 }, () => 0);

const cellInputRefs = Array.from({ length: 81 }, () => createRef());

const solveButtonRef = createRef();


export const App = () => {
  const [boardArray, setBoardArray] = useState(clearedBoardArray);
  const [solutionArray, setSolutionArray] = useState(clearedSolutionArray);
  const [status, setStatus] = useState('ready'); // can be: ready, cleared, solving, solved, invalid

  useEffect(() => { // on mount, set up worker listener
    worker.addEventListener('message', event => {
      if (event.data.solutionArray) {
        setSolutionArray(event.data.solutionArray);
        setStatus('solved');
      } else {
        setStatus('invalid');
      }
    });
  }, []);

  useEffect(() => { // if board was cleared, set status to 'ready'
    setStatus(prevStatus => (prevStatus === 'cleared') ? 'ready' : prevStatus);
  }, [status]);

  const solve = () => {
    worker.postMessage(boardArray.join(''));
    setStatus('solving');
  };

  const updateBoardArray = (index, cellVal) => {
    setBoardArray(prevBoardArray => {
      const newBoardArray = [...prevBoardArray];
      newBoardArray[index] = cellVal;
      return newBoardArray;
    });
  };

  const replaceBoardArray = newBoardArray => {
    setBoardArray(newBoardArray);
    setStatus('ready');
  };

  const clearBoard = () => {
    setBoardArray(clearedBoardArray);
    setSolutionArray(clearedSolutionArray);
    setStatus('cleared');
  };
  
  const rows = Array.from({ length: 9 }, (_el, rowNum) => {
    const cells = Array.from({ length: 9 }, (_el, colNum) => {
      const cellNum = (rowNum * 9) + colNum;
      return (
        <Cell
          key={cellNum.toString()}
          cellNum={cellNum}
          boardVal={boardArray[cellNum]}
          solutionVal={solutionArray[cellNum].toString()}
          status={status}
          cellInputRefs={cellInputRefs}
          solve={solve}
          solveButtonRef={solveButtonRef}
          updateBoardArray={updateBoardArray}
        />
      );
    });
    return (   
      <tr key={rowNum.toString() /* index as key is ok (no IDs, order stable) */ }>
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
          <Solve
            solve={solve}
            status={status}
            solveButtonRef={solveButtonRef}
          />
          <Clear
            clearBoard={clearBoard}
            status={status}
          />
          <Random
            clearBoard={clearBoard}
            replaceBoardArray={replaceBoardArray}
            status={status}
          />
        </div>
        <StringEntry
          solve={solve}
          replaceBoardArray={replaceBoardArray}
          boardArray={boardArray}
          status={status}
        />
        <Solution
          solutionArray={solutionArray}
          status={status}
        />
      </div>
    </>
  );
};
