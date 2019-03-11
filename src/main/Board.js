import React, { Component } from 'react';
import { Row } from './Row';

export class Board extends Component {
  cellInputRefs = Array.from({ length: 81 }, () => React.createRef());
  
  render() {
    const rows = Array.from({ length: 9 }, (el, ind) =>
      <Row
        key={ind.toString()}
        rowNum={ind}
        cellInputRefs={this.cellInputRefs}
        solve={this.props.solve}
        updateBoardArray={this.props.updateBoardArray}
        boardArray={this.props.boardArray}
        solutionArray={this.props.solutionArray}
        status={this.props.status}
      />
    );
    return <table>{rows}</table>;
  }
}