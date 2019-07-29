// Bundle-specific Babel options:

// ES5 version of Main bundle uses React (w/ class props) and preset-env (w/ polyfills)
const es5MainBabelOptions = {
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3,
      debug: true,
      targets: {
        browsers: ['IE >= 10']
      }
    }]
  ]
};

// ES5 version of Worker bundle gets preset-env w/ polyfills (no React)
const es5WorkerBabelOptions = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3,
      debug: true,
      targets: {
        browsers: ['IE >= 10']
      }
    }]
  ]
};

// ES6+ version of Main bundle uses React w/ class props
const es6MainBabelOptions = {
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: ['@babel/preset-react']
};

// (no Babel at all for ES6+ version of Worker bundle)


module.exports = {
  es5MainBabelOptions,
  es5WorkerBabelOptions,
  es6MainBabelOptions
};