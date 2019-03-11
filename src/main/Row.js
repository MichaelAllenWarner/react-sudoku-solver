import React, { Component } from 'react';
import Cell from './Cell';

export default class Row extends Component {
  render() {
    const cells = Array.from({ length: 9 }, (el, ind) =>
      <Cell
        key={ind.toString()}
        rowNum={this.props.rowNum}
        colNum={ind}
        cellInputRefs={this.props.cellInputRefs}
        solve={this.props.solve}
        updateBoardArray={this.props.updateBoardArray}
        boardArray={this.props.boardArray}
        solutionArray={this.props.solutionArray}
        status={this.props.status}
      />
    );
    return <tr>{cells}</tr>;
  }
}