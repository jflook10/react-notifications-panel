const path = require('path')
const webpack = require('webpack')

const WebpackDevServer = require('webpack-dev-server')

const config = require('./webpack/config')
const port = process.env.PORT_CHAT_CONSOLE_WEB || 9000

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true, chunks: false },
}).listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err)
  }
  console.log(`Listening at localhost:${port}`)
})
