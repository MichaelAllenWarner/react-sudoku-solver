import React from 'react';
import { Submit } from './Submit';
import { Clear } from './Clear';

export const Buttons = props => (
  <div id="buttons">
    <Submit
      solve={props.solve}
      status={props.status}
    />
    <Clear
      clearBoard={props.clearBoard}
      status={props.status}
    />
  </div>
);