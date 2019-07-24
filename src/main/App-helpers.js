import React from 'react';

export const generateWorkerMessageHandler = ({ setSolutionArray, setStatus }) => {
  return function messageHandler(event) {
    if (event.data.solutionArray) {
      setSolutionArray(event.data.solutionArray);
      setStatus('solved');
    } else {
      setStatus('invalid');
    }
  };
};

export const generateRows = ({ Cell, ...CellProps }) => {
  const {
    boardArray,
    updateBoardArray,
    solutionArray,
    status,
    cellInputRefs,
    solveButtonRef,
  } = CellProps;

  const rows = Array.from({ length: 9 }, (_el, rowNum) => {
    const cells = Array.from({ length: 9 }, (_el, colNum) => {
      const cellNum = (rowNum * 9) + colNum;
      return (
        <Cell
          key={cellNum.toString() /* index as key is ok (no IDs, order stable) */ }
          cellNum={cellNum}
          boardVal={boardArray[cellNum]}
          solutionVal={solutionArray[cellNum].toString()}
          status={status}
          cellInputRefs={cellInputRefs}
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
  return rows;
};
