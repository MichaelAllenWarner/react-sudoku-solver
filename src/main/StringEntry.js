import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StringEntry extends Component {
  state = { value: '' };

  stringEntryRef = React.createRef();

  handleInput = event => {
    if (this.props.status === 'solving') {
      return;
    }

    // convert non-number characters to 0
    const formattedString = event.target.value.replace(/[^0-9]/gi, '0');
    this.setState({ value: formattedString });

    if (formattedString.length === 81) {
      this.props.replaceBoardArray(formattedString.split(''));
    }
  };

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
      return { value: '' };
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
          placeholder="81-digit string entry (anything not 1&ndash;9 is a blank)."
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

StringEntry.propTypes = {
  replaceBoardArray: PropTypes.func.isRequired,
  solve: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  boardArray: PropTypes.arrayOf(PropTypes.string).isRequired
};

export { StringEntry };