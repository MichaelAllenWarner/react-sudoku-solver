import React, { Component } from 'react';
import CellInputContainer from './CellInputContainer';

export default class CellForm extends Component {
  formRef = React.createRef();

  formReset = () => {
    this.formRef.current.reset();
  }

  render() {
    return (
      // form wrapper b/c reset() method lets us forbid bad entry in <input type="number">
      <form ref={this.formRef}>
        <CellInputContainer
          cellNum={this.props.cellNum}
          rowNum={this.props.rowNum}
          colNum={this.props.colNum}
          cellInputRefs={this.props.cellInputRefs}
          formReset={this.formReset}
          solve={this.props.solve}
          updateBoardArray={this.props.updateBoardArray}
          boardArray={this.props.boardArray}
          solutionArray={this.props.solutionArray}
          status={this.props.status}
        />
      </form>
    );
  }
}