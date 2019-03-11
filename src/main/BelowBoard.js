import React from 'react';
import { Buttons } from './Buttons';
import { TextBoxes } from './TextBoxes';

export const BelowBoard = props => (
  <div id="divBelowBoard">
    <Buttons
      solve={props.solve}
      clearBoard={props.clearBoard}
      status={props.status}
    />
    <TextBoxes
      solve={props.solve}
      solutionArray={props.solutionArray}
      replaceBoardArray={props.replaceBoardArray}
      boardArray={props.boardArray}
      status={props.status}
    />
  </div>
);