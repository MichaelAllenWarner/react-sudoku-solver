import React from 'react';

export const setUpWorker = ({ setSolution, setStatus, worker }) => {
  const messageHandler = event => {
    if (event.data.solution) {
      setSolution(event.data.solution);
      setStatus('solved');
    } else {
      setStatus('invalid');
    }
  };
  worker.addEventListener('message', messageHandler);
};

export const readyIfCleared = prevStatus => (prevStatus === 'cleared') ? 'ready' : prevStatus;

export const _clear = ({
  setBoard,
  setSolution,
  setStatus,
  FRESH_BOARD,
  FRESH_SOLUTION
}) => {
  setBoard(FRESH_BOARD);
  setSolution(FRESH_SOLUTION);
  setStatus('cleared');
};

export const _replaceBoard = ({ setBoard, setStatus, newBoard }) => {
  setBoard(newBoard);
  setStatus('ready');
};

export const _updateBoard = ({ setBoard, index, cellVal }) => {
  setBoard(prevBoard => {
    const newBoard = [...prevBoard];
    newBoard[index] = cellVal;
    return newBoard;
  });
};

export const _solve = ({ worker, board, setStatus }) => {
  worker.postMessage(board);
  setStatus('solving');
};

export const generateRows = ({
  Cell,
  board,
  solution,
  ...otherCellProps
}) => {
  return Array.from({ length: 9 }, (_el, rowNum) => {
    const cells = Array.from({ length: 9 }, (_el, colNum) => {
      const cellNum = (rowNum * 9) + colNum;
      return (
        <Cell
          key={cellNum.toString()}
          cellNum={cellNum}
          boardVal={board[cellNum]}
          solutionVal={solution[cellNum].toString()}
          {...otherCellProps}
        />
      );
    });
    return (   
      <tr key={rowNum.toString()}>
        {cells}
      </tr>
    );
  });
};
