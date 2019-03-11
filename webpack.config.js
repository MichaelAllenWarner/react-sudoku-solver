const path = require('path');

module.exports = [

  // ES5 version of main bundle (Babel w/ preset-react, preset-env, and polyfills)
  {
    entry: './src/main/index.js',
    output: {
      filename: 'es5-main.js',
      path: path.resolve(__dirname, 'public/js')
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-proposal-class-properties'],
              presets: [
                '@babel/preset-react',
                ['@babel/preset-env', {
                  useBuiltIns: 'usage',
                  debug: true,
                  targets: {
                    browsers: ['IE >= 10']
                  }
                }]
              ]
            }
          }
        }
      ]
    }
  },

  // ES5 version of worker bundle (Babel w/ preset-env and polyfills):
  {
    entry: './src/worker/index.js',
    output: {
      filename: 'es5-worker.js',
      path: path.resolve(__dirname, 'public/js')
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  useBuiltIns: 'usage',
                  debug: true,
                  targets: {
                    browsers: ['IE >= 10']
                  }
                }]
              ]
            }
          }
        }
      ]
    }
  },

  // ES6+ version of main bundle (Babel w/ preset-react only):
  {
    entry: './src/main/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'public/js')
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-proposal-class-properties'],
              presets: ['@babel/preset-react']
            }
          }
        }
      ]
    }
  },

  // ES6+ version of worker bundle (no Babel at all):
  {
    entry: './src/worker/index.js',
    output: {
      filename: 'worker.js',
      path: path.resolve(__dirname, 'public/js')
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/
        }
      ]
    }
  }
];
