var WebpackNotifierPlugin = require('webpack-notifier')

var config = {
    devtool: 'eval-cheap-module-source-map',
   entry: './main.js',

   output: {
      path:'./',
      filename: 'index.js',
   },

   devServer: {
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
      inline: true,
      port: 8080
   },
    plugins: [
      new WebpackNotifierPlugin()
   ],
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',

            query: {
               presets: ['es2015', 'react', 'stage-0'],
               plugins: [
            "transform-class-properties","transform-decorators-legacy"
          ]
            }
         }
      ]
   }
}

module.exports = config;
