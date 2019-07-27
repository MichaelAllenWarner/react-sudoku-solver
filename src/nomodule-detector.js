// serve ES6+ if browser supports modules, ES5 if it doesn't
const head = document.head || document.getElementsByTagName('head')[0];
const testScript = document.createElement('script');
testScript.src = ('noModule' in testScript) ? 'js/main.js' : 'js/es5-main.js';
head.appendChild(testScript);
