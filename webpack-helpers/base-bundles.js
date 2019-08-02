const path = require('path');

const es6Main = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },
  devServer: { // devServer only on this ES6 bundle
    contentBase: path.join(__dirname, '../src'), // not public b/c of how css loads in prod vs. dev
    compress: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [], // so we can push to it
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['react-hot-loader/babel'],
            presets: ['@babel/preset-react'] // ONLY preset-react here (no ES5 or polyfills)
          }
        }
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            inline: true,
            fallback: false // browsers that can support ES6+ can support inline workers
          }
        }
      }
    ]
  }
};

const es5Main = {
  entry: './src/js/es5-index.js',
  output: {
    filename: 'js/es5-main.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },
  // resolve: {
  //   alias: {
  //     'react-dom': '@hot-loader/react-dom'
  //   }
  // },
  plugins: [], // so we can push to it
  module: {
    rules: [
      { // worker-loader before babel here (otherwise ES6 in worker doesn't get Babel'd!)
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            inline: true,
            fallback: true // otherwise IE10 gives an error about the inline worker
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // plugins: ['react-hot-loader/babel'],
            presets: [ // ES5 bundle gets preset-react AND preset-env (w/ polyfills)
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
          }
        }
      }
    ]
  }
};

module.exports = { es6Main, es5Main };
