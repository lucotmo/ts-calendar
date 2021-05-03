const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DotEnv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths = require('./paths');

module.exports = {
  context: paths.srcDir,
  entry: {
    app: './index.tsx',
  },
  output: {
    path: paths.publicDir,
    filename: "[name].js",
    assetModuleFilename: '[path][name].[ext]',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          "style-loader", 
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        type: "asset/resource",
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new DotEnv(),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: `${paths.srcDir}/${paths.staticFolder}`,
    //       to: `${paths.publicDir}`,
    //     },
    //   ],
    // }),
    new HtmlWebpackPlugin({
      title: 'Calendar App',
      favicon: `${paths.srcDir}/${paths.imagesFolder}/favicon.ico`,
      template: paths.srcDir + '/template.html',
      filename: 'index.html',
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      chunks: ['app']
    }),
  ],
  stats: 'errors-only',
};
