const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    hot: true,
    port: 8080,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
  }
};

const esLintPlugin = (isDev) => isDev ? [] : [new ESLintPlugin({
  extensions: ['ts', 'js']
})];

module.exports = ({
  develop
}) => ({
  mode: develop ? 'development' : 'production',
  devtool: develop ? 'inline-source-map' : false,
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
    publicPath: '/',
  },
  module: {
    rules: [{
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    ...esLintPlugin(develop),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {from:'./src/assets/images', to:'assets/images'},
    //     {from:'./src/assets/icons', to:'assets/icons'},
    //     {from:'./src/public', to:'public'}
    //   ],
    // }),
  ],
  experiments: {  
    topLevelAwait: true,  
  },
  ...devServer(develop),
});
