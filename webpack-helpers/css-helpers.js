const MiniCssExtractsPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const devCssRule = {
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader'
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
};

const prodCssPlugin = new MiniCssExtractsPlugin({
  filename: 'css/[name].css'
});

const prodHtmlPlugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    excludeAssets: /\.js$/ // only want css, not js
  }),
  new HtmlWebpackExcludeAssetsPlugin()  
];

const prodCssRule = {
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractsPlugin.loader
    },
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[hash:base64]'
        }
      }
    }
  ]
};

module.exports = {
  devCssRule,
  prodCssPlugin,
  prodHtmlPlugins,
  prodCssRule
};
