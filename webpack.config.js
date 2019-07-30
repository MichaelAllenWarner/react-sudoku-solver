const {
  es5Main,
  es6Main
} = require('./webpack-helpers/base-bundles');
const {
  devCssRule,
  prodCssPlugin,
  prodHtmlPlugins,
  prodCssRule
} = require('./webpack-helpers/css-helpers');


module.exports = [
  // ES6+ version
  (_env, argv) => {
    if (argv.mode === 'development') {
      es6Main.module.rules.push(devCssRule);
      es6Main.output.globalObject = 'this'; // fixes 'window is not defined' error in dev server
    }
    if (argv.mode === 'production') {
      es6Main.plugins.push(prodCssPlugin, ...prodHtmlPlugins); // prodHtmlPlugins only for 1 bundle
      es6Main.module.rules.push(prodCssRule);
    }
    return es6Main;
  },

  // ES5 version
  (_env, argv) => {
    if (argv.mode === 'development') {
      es5Main.module.rules.push(devCssRule);
      es5Main.output.globalObject = 'this'; // fixes 'window is not defined' error in dev server
    }
    if (argv.mode === 'production') {
      es5Main.plugins.push(prodCssPlugin); // overwrites identical CSS file from es6Main (ok)
      es5Main.module.rules.push(prodCssRule);
    }
    return es5Main;
  }
];
