/*eslint-disable*/

const { name: pkgName, version } = require('./package.json')
const GeneraterAssetPlugin = require('generate-asset-webpack-plugin')
const path = require('path')
const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: IS_PROD ? '././' : '/',
  outputDir: path.resolve(__dirname, 'dist/app'),
  css: {
    extract: false,
    loaderOptions: {
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        lessOptions: {
          modifyVars: {
            'ant-prefix': pkgName + '-',
            'primary-color': '#1DA57A'
          },
          javascriptEnabled: true
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new GeneraterAssetPlugin({
        filename: '../config/config.json', // 输出到dist根目录下的manifest.json文件,名字可以按需改
        fn: (compilation, cb) => {
          cb(null, createManifestJson(compilation))
        }
      })
    ],
    output: {
      filename: 'index.js'
    }
  },
  productionSourceMap: false
}

// 创建 manifest.json 文件, 包含插件名字和版本号
function createManifestJson(compilation) {
  return JSON.stringify({
    name: pkgName,
    version,
    baseUrl: 'http://',
    bundleTime: new Date().toLocaleString()
  })
}
