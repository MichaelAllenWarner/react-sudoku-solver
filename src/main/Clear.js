import React from 'react';

export const Clear = props => (
  <button
    id="clear"
    onClick={props.clearBoard}
    disabled={props.status === 'solving'}  
  >
    Clear
  </button>
);