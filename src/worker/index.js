import { solve } from './solve.js';

onmessage = event => {
  const solution = solve(event.data);
  postMessage({ solution });
};
