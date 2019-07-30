import { solve } from './solve';

onmessage = event => {
  const solution = solve(event.data);
  postMessage({ solution });
};
