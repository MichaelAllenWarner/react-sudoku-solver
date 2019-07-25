import React, { useState, useEffect, createRef } from 'react';
import { Cell } from './Cell';
import { Solve } from './Solve';
import { Clear } from './Clear';
import { Random } from './Random';
import { StringEntry } from './StringEntry';
import { Solution } from './Solution';
import { worker } from './worker';
import { generateWorkerMessageHandler, generateRows } from './App-helpers';


// constants
const CLEARED_BOARD_ARRAY = Array.from({ length: 81 }, () => '0');
const CLEARED_SOLUTION_ARRAY = Array.from({ length: 81 }, () => 0);

// refs
const cellInputRefs = Array.from({ length: 81 }, () => createRef());
const solveButtonRef = createRef();
const refs = { cellInputRefs, solveButtonRef };


export const App = () => {
  const [boardArray, setBoardArray] = useState(CLEARED_BOARD_ARRAY);
  const [solutionArray, setSolutionArray] = useState(CLEARED_SOLUTION_ARRAY);
  const [status, setStatus] = useState('ready'); // can be: ready, cleared, solving, solved, invalid

  const state = { boardArray, solutionArray, status };
  const stateSetters = { setBoardArray, setSolutionArray, setStatus };

  useEffect(() => { // on mount, set up worker listener
    const messageHandler = generateWorkerMessageHandler(stateSetters);
    worker.addEventListener('message', messageHandler);
  }, []);

  useEffect(() => { // if board was cleared, set status to 'ready'
    setStatus(prevStatus => (prevStatus === 'cleared') ? 'ready' : prevStatus);
  }, [status]);

  const clearBoard = () => {
    setBoardArray(CLEARED_BOARD_ARRAY);
    setSolutionArray(CLEARED_SOLUTION_ARRAY);
    setStatus('cleared');
  };

  const replaceBoardArray = newBoardArray => {
    setBoardArray(newBoardArray);
    setStatus('ready');
  };

  const updateBoardArray = (index, cellVal) => {
    setBoardArray(prevBoardArray => {
      const newBoardArray = [...prevBoardArray];
      newBoardArray[index] = cellVal;
      return newBoardArray;
    });
  };
  
  const solve = () => {
    worker.postMessage(boardArray);
    setStatus('solving');
  };

  const CellProps = { ...state, ...refs, updateBoardArray };
  const rows = generateRows({ ...CellProps, Cell });

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
