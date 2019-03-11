import React, { Component } from 'react';

export class StringEntry extends Component {
  state = { value: '81-digit string entry (anything not 1\u20139 is a blank).' };

  stringEntryRef = React.createRef();

  handleInput = event => {
    const formattedString = event.target.value.replace(/[^0-9]/gi, '0');
    this.setState({ value: formattedString });
    if (
      formattedString.length === 81
      && Number.isInteger(+formattedString)
      && +formattedString >= 0
    ) {
      this.props.replaceBoardArray(formattedString.split(''));
    }
  }

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.props.solve();
    }
  };

  handleFocus = () => {
    this.stringEntryRef.current.select();
  };

  static getDerivedStateFromProps(props) {
    if (props.status === 'cleared') {
      return { value: '81-digit string entry (anything not 1\u20139 is a blank).' };
    }
    if (props.status === 'solving') {
      return { value: props.boardArray.join('') };
    }
    return null;
  }

  render() {     
    return (
      <div>
        <input
          id="stringEntry"
          ref={this.stringEntryRef}
          value={this.state.value}
          onInput={this.handleInput}
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleFocus}
        />
      </div>
    );
  }
}