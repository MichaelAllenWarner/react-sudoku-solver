import React from 'react';
import PropTypes from 'prop-types';
import { StringEntry } from './StringEntry';
import { Solution } from './Solution';

const TextBoxes = props => (
  <>
    <StringEntry
      solve={props.solve}
      replaceBoardArray={props.replaceBoardArray}
      boardArray={props.boardArray}
      status={props.status}
    />
    <Solution
      solutionArray={props.solutionArray}
      status={props.status}
    />
  </>
);

TextBoxes.propTypes = {
  solve: PropTypes.func.isRequired,
  replaceBoardArray: PropTypes.func.isRequired,
  boardArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  solutionArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  status: PropTypes.string.isRequired
};

export { TextBoxes };