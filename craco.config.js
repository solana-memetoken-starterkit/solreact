const webpack = require('webpack');

module.exports = {
    webpack: {
      plugins: {
        add: [
          new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
          })
        ]
      },
      configure: {
        resolve: {
          fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            url: require.resolve('url'),
            zlib: require.resolve('browserify-zlib')
          }
        }
      }
    }
  };