const path = require('path');
const MiniCssExtractsPlugin = require('mini-css-extract-plugin');

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


module.exports = [

  // ES5 version of Main bundle
  {
    entry: './src/main/es5-index.js',
    output: {
      filename: './js/es5-main.js',
      path: path.resolve(__dirname, 'public'),
      publicPath: '/'
    },
    plugins: [
      new MiniCssExtractsPlugin({
        filename: 'css/[name].css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: es5MainBabelOptions
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractsPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              }
            }
          ]
        }
      ]
    }
  },

  // ES5 version of Worker bundle
  {
    entry: './src/worker/index.js',
    output: {
      filename: 'es5-worker.js',
      path: path.resolve(__dirname, 'public/js')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: es5WorkerBabelOptions
          }
        }
      ]
    }
  },

  // ES6+ version of Main bundle
  {
    entry: './src/main/index.js',
    output: {
      filename: './js/main.js',
      path: path.resolve(__dirname, 'public'),
      publicPath: '/'
    },
    plugins: [
      new MiniCssExtractsPlugin({
        filename: 'css/[name].css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: es6MainBabelOptions
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractsPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              }
            }
          ]
        }
      ]
    }
  },

  // ES6+ version of Worker bundle
  {
    entry: './src/worker/index.js',
    output: {
      filename: 'es5-worker.js',
      path: path.resolve(__dirname, 'public/js')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/
        }
      ]
    }
  }
];
