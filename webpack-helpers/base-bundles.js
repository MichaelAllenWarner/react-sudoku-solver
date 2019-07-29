const path = require('path');
const {
  es6MainBabelOptions,
  es5MainBabelOptions,
  es5WorkerBabelOptions
} = require('./babel-loader-options');

const es6Main = {
  entry: './src/main/index.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },
  devServer: { // devServer only needs to be in 1 bundle
    contentBase: path.join(__dirname, '../src'), // not public b/c of how css loads in prod vs. dev
    compress: true,
    proxy: {
      '/api': 'http://localhost:3000'
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
          options: es6MainBabelOptions
        }
      }
    ]
  }
};

const es6Worker = {
  entry: './src/worker/index.js',
  output: {
    filename: 'js/worker.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};

const es5Main = {
  entry: './src/main/es5-index.js',
  output: {
    filename: 'js/es5-main.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },
  plugins: [], // so we can push to it
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: es5MainBabelOptions
        }
      }
    ]
  }
};

const es5Worker = {
  entry: './src/worker/index.js',
  output: {
    filename: 'js/es5-worker.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
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
};

module.exports = {
  es6Main,
  es6Worker,
  es5Main,
  es5Worker,
};
