const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
const css = require('./webpack/css');
const webpack = require('webpack');
const sourceMap = require('./webpack/sourceMap');
const lintCSS = require('./webpack/sass.lint');
const images = require('./webpack/images');
const babel = require('./webpack/babel');
const favicon = require('./webpack/favicon');
const fonts = require('./webpack/fonts');

const PATHS = {
  source: path.join(__dirname, 'assets'),
  build: path.join(__dirname, 'build'),
};
const common = merge([
  {
    entry: {
      'index': PATHS.source + '/pages/index/index.js',
      'blog': PATHS.source + '/pages/blog/blog.js',
      'main': PATHS.source + '/main.js',
    },
    output: {
      path: PATHS.build,
      filename: './js/[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common', 'main'],
        template: PATHS.source + '/pages/index/index.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'blog.html',
        chunks: ['blog', 'common', 'main'],
        template: PATHS.source + '/pages/blog/blog.pug',
      }),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          'common': {
            minChunks: 2,
            chunks: 'all',
            name: 'common',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
    
  },
  pug(),
  // lintJS({ paths: PATHS.sources }),
  lintCSS(),
  images(),
  babel(),
  fonts(),
]);


module.exports = function(env, argv) {
  if (argv.mode === 'production') {
    return merge([
      common,
      extractCSS(),
    //   favicon(),
    ]);
  }
  if (argv.mode === 'development') {
    return merge([
      common,
      devserver(),
      sass(),
      css(),
      sourceMap(),
    ]);
  }
};