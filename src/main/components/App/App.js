import React, { useState, useEffect, createRef } from 'react';
import { Cell } from '../Cell/Cell';
import { Solve } from '../Solve/Solve';
import { Clear } from '../Clear/Clear';
import { Random } from '../Random/Random';
import { StringEntry } from '../StringEntry/StringEntry';
import { Solution } from '../Solution/Solution';
import { worker } from '../../worker';
import {
  setUpWorker,
  readyIfCleared,
  _clear,
  _replaceBoard,
  _updateBoard,
  _solve,
  generateRows
} from './App-helpers';
import styles from './App-styles.css';


const FRESH_BOARD = Array.from({ length: 81 }, () => '0');
const FRESH_SOLUTION = Array.from({ length: 81 }, () => 0);
const constants = { FRESH_BOARD, FRESH_SOLUTION };

const cellInputRefs = Array.from({ length: 81 }, () => createRef());
const solveButtonRef = createRef();
const refs = { cellInputRefs, solveButtonRef };


export const App = () => {
  const [board, setBoard] = useState(FRESH_BOARD);
  const [solution, setSolution] = useState(FRESH_SOLUTION);
  const [status, setStatus] = useState('ready'); // ready, cleared, solving, solved, invalid

  const state = { board, solution, status };
  const stateSetters = { setBoard, setSolution, setStatus };

  useEffect(() => {
    setUpWorker({ worker, ...stateSetters });
  }, []); // (only on mount)

  useEffect(() => { // switch to 'ready' after 'cleared' (latter is only to cue StringEntry)
    setStatus(readyIfCleared);
  }, [status]);

  const clear = () => {
    _clear({ ...constants, ...stateSetters });
  };

  const replaceBoard = newBoard => {
    _replaceBoard({ ...stateSetters, newBoard });
  };

  const updateBoard = (index, cellVal) => {
    _updateBoard({ ...stateSetters, index, cellVal });
  };
  
  const solve = () => {
    _solve({ worker, ...state, ...stateSetters });
  };

  const rows = generateRows({ Cell, ...state, ...refs, updateBoard });

  const SolveProps = { solve, status, solveButtonRef };
  const ClearProps = { clear, status };
  const RandomProps = { clear, replaceBoard, status };
  const StringEntryProps = { solve, replaceBoard, board, status };
  const SolutionProps = { solution, status };

  return (
    <>
      <h1 className={styles.header}>Mike’s Sudoku Solver</h1>
      <table className={styles.board}>
        <tbody>{rows}</tbody>
      </table>
      <div className={styles.belowBoard}>
        <div className={styles.buttons}>
          <Solve {...SolveProps}/>
          <Clear {...ClearProps}/>
          <Random {...RandomProps}/>
        </div>
        <StringEntry {...StringEntryProps}/>
        <Solution {...SolutionProps}/>
      </div>
    </>
  );
};
