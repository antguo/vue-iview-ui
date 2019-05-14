'use strict'
const path = require('path')
const utils = require('./utils')//引入utils工具模块，utils主要用来处理css-loader和vue-style-loader
const config = require('../config')//引入config目录下的index.js配置文件，主要用来定义一些开发和生产环境的属性
const vueLoaderConfig = require('./vue-loader.conf')//vue-loader.conf配置文件是用来解决各种css文件的，定义了诸如css，less，sass
//返回到dir为止的绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
var webpack = require("webpack")
//配置webpack编译入口
module.exports = {
  context: path.resolve(__dirname, '../'),
  //entry告诉webpack哪些文件是应用程序的入口点，主要文件
  entry: {
    app: './src/main.js'
  },
  //配置webpack输出路径和命名规则
  output: {
    path: config.build.assetsRoot,
    //path代表我们要输出的路径，config.build.assetsRoot里是assetsRoot:path.resolve(__dirname,'../dist'),这个是想把打包出来的文件路径放在根目录的dist目录下
    filename: '[name].js',
    //filename:'[name].js'文件名，是用来打包后出的文件名，name就是入口文件前面的key值，此处是index和admin，为什么用name，因为会打包出来三个文件，第一个是源代码文件，第二个是runtime文件，第三个是ventor文件，所以每个文件打包出来的名字就跟定义的chunkname一致
    publicPath: process.env.NODE_ENV === 'production'//webpack编译输出的发布路径，上线地址，也就是真正的文件引用路径
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  //插件
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      "windows.jQuery": "jquery"
    })
  ],
  // resolve是webppack的内置选项，也就是说当使用import "jquery",该如何去执行这件事情，就是resolve配置项要做的，import jQuery from "./additional/dist/js/jquery"这样会很麻烦，可以起个别名简化操作
  resolve: {
    extensions: ['.js', '.vue', '.json'],//省略扩展名，也就是说.js，.vue,.json文件导入可以省略后缀名，这会覆盖默认的配置，所以要省略扩展名在这里一定要写上
    alias: {//alias是配置别名，什么是别名呢，如果你在一个很深的文件引入其他文件中又一个很深的文件
      'vue$': 'vue/dist/vue.esm.js',
      /*
        相对路径会写到吐血，那用别名我们定入一个入口位置，我们用@来代替src目录的绝对路径，此时就
        用到了上面function resolve封装的函数，此时绝对路径就定位到了src目录，因为我们所有文件
        都放在src目录下，就可以通过src目录直接定位到你想要找的文件
      */
      '@': resolve('src'),
    }
  },
  //module配置不同类型模块的处理规则
  module: {
    rules: [
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      // 添加less-loader
      // {
      //   test: /\.less$/,
      //   loader: "style-loader!css-loader!less-loader"
      // },
      //对vue文件使用vue-loader，该loader是vue单文件组件的实现核心，专门用来解析.vue文件的
      {
        test: /\.vue$/,
        loader: 'vue-loader',//对js文件使用babel-loader转码，该插件是用来解析es6等代码
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]//指明src和test目录下的js文件要使用该loader
      },
      /*
        对图片相关的文件使用url-loader插件，这个插件的作用是将一个足够小的文件生成一个64位的DataURL
        DataURL是当一个图片足够小，为了避免单独请求可以把图片的二进制代码变成64位的
      */
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,//限制10000个字节以下转base64，以上不转
          name: utils.assetsPath('img/[name].[hash:7].[ext]')//资源发布路径
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,//引用媒体
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,//引用font-icon
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
