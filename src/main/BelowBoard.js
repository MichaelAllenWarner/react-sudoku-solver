import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Buttons } from './Buttons';
import { TextBoxes } from './TextBoxes';

class BelowBoard extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.status !== this.props.status) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div id="divBelowBoard">
        <Buttons
          solve={this.props.solve}
          clearBoard={this.props.clearBoard}
          status={this.props.status}
        />
        <TextBoxes
          solve={this.props.solve}
          solutionArray={this.props.solutionArray}
          replaceBoardArray={this.props.replaceBoardArray}
          boardArray={this.props.boardArray}
          status={this.props.status}
        />
      </div>
    );
  }
}

BelowBoard.propTypes = {
  solve: PropTypes.func.isRequired,
  clearBoard: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  solutionArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  replaceBoardArray: PropTypes.func.isRequired,
  boardArray: PropTypes.arrayOf(PropTypes.string).isRequired
};

export { BelowBoard };