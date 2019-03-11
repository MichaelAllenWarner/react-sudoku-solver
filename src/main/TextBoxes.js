import React from 'react';
import { StringEntry } from './StringEntry';
import { Solution } from './Solution';

export const TextBoxes = props => (
  <>
    <StringEntry
      solve={props.solve}
      replaceBoardArray={props.replaceBoardArray}
      boardArray={props.boardArray}
      solutionArray={props.solutionArray}
      status={props.status}
    />
    <Solution
      solutionArray={props.solutionArray}
      status={props.status}
    />
  </>
);