import React, { Component } from 'react';

export class CellInput extends Component {
  render() {
    return (
      <input
        value={this.props.value}
        onInput={this.props.handleInput}
        onKeyDown={this.props.handleKeyDown}
        onKeyUp={this.props.handleKeyUp}
        onFocus={this.props.handleFocus}
        ref={this.props.cellInputRefs[this.props.cellNum]}
        id={`row${this.props.rowNum}col${this.props.colNum}input`}
        className={this.props.className}
        readOnly={this.props.isReadOnly}
        type="number"
        min="1"
        max="9"
      />
    );
  }
}