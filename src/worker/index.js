import { solve } from './solve.js';

onmessage = event => {
  const solutionArray = solve(event.data);
  postMessage({ solutionArray });
};
