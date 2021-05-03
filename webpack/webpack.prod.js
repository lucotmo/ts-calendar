const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const paths = require('./paths')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: paths.publicDir,
    publicPath: './',
    filename: `[name].js`,
    chunkFilename: `[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader, 
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
  },
  plugins: [
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['imagemin-mozjpeg', { quality: 50, progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          ['svgo'],
        ],
      },
    }),
    new MiniCssExtractPlugin()
  ],
}