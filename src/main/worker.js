// serve ES6+ worker if browser supports modules, ES5 worker if it doesn't
const testScript = document.createElement('script');
const workerFilename = ('noModule' in testScript) ? 'js/worker.js' : 'js/es5-worker.js';

export const worker = new Worker(workerFilename);
