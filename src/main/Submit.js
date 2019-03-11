import React from 'react';

export const Submit = props => (
  <button
    id="submit"
    onClick={props.solve}
    disabled={props.status !== 'ready'}
  >
    Submit
  </button>
);