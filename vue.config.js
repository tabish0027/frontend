const { defineConfig } = require('@vue/cli-service')
const BundleTracker = require('webpack-bundle-tracker')

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/static/dist/' : 'http://localhost:8080',
  outputDir: '../static/dist',
  indexPath: '../templates/index.html',
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new BundleTracker({ path: __dirname, filename: 'webpack-stats.json' }),
    ],
  },
})



// module.exports = defineConfig({
//   transpileDependencies: true
// })
