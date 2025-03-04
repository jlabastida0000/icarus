const path = require('path');
   const HtmlWebpackPlugin = require('html-webpack-plugin');

   module.exports = {
     entry: './src/index.js',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'bundle.js',
     },
     module: {
       rules: [
         {
           test: /\.js$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['@babel/preset-env', '@babel/preset-react'],
             },
           },
         },
         {
           test: /\.css$/,
           use: ['style-loader', 'css-loader', 'postcss-loader'],
         },
       ],
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './public/index.html',
       }),
     ],
     devServer: {
       static: {
         directory: path.join(__dirname, 'dist'),
       },
       compress: true,
       port: 8080,
       proxy: [{
         context: ['/api', '/ws'],
         target: 'http://localhost:3000',
         ws: true,
       }],
     },
     experiments: {
       asyncWebAssembly: true,
     },
   };