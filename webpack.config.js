const {
  es5Main,
  es5Worker,
  es6Main,
  es6Worker
} = require('./webpack-helpers/base-bundles');
const {
  devCssRule,
  prodCssPlugin,
  prodHtmlPlugins,
  prodCssRule
} = require('./webpack-helpers/css-helpers');


module.exports = [
  // ES6+ version of Main bundle
  (_env, argv) => {
    if (argv.mode === 'development') {
      es6Main.module.rules.push(devCssRule);
    }
    if (argv.mode === 'production') {
      es6Main.plugins.push(prodCssPlugin); // overwrites identical CSS file from es5Main (ok)
      Array.prototype.push.apply(es6Main.plugins, prodHtmlPlugins); // only in 1 bundle
      es6Main.module.rules.push(prodCssRule);
    }
    return es6Main;
  },

  // ES6+ version of Worker bundle
  () => es6Worker,

  // ES5 version of Main bundle
  (_env, argv) => {
    if (argv.mode === 'development') {
      es5Main.module.rules.push(devCssRule);
    }
    if (argv.mode === 'production') {
      es5Main.plugins.push(prodCssPlugin);
      es5Main.module.rules.push(prodCssRule);
    }
    return es5Main;
  },

  // ES5 version of Worker bundle
  () => es5Worker
];
