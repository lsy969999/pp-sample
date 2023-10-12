// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

// module.exports = {
//     mode: 'development',
//     entry: {
//         //시작점 여러개 정할수 있음
//         main: path.resolve(__dirname, 'src/index.js'),
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: '[name][contenthash].js',
//         clean: true,//이전 해쉬 파일 삭제,
//         assetModuleFilename: '[name][ext]'//asset 해시처리안된게
//     },
//     module: {
//         rules: [
//             {
//                 // test 정의한 정규식파일에대해 아래 로더가 역순으로 적용됨 (scss-loader>css-loader>style-loader)
//                 test: /\.s[ac]ss$/i,
//                 use: [
//                     'style-loader',
//                     'css-loader',
//                     'sass-loader'
//                 ]
//             },
//             //asset
//             {
//                 test: /\.(png|svg|jpg|jpeg|gif)$/,
//                 type: 'asset/resource'
//             },
//         ]
//     },
//     plugins: [
//         //html도 build때 사용한다. src/index.html을 빌드해서 dist에 index.html을 만든다.
//         new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template: 'src/index.html'
//         }),
//     ],
//     devtool: 'source-map',
//     devServer: {
//         static: {
//             directory: path.join(__dirname, 'dist')
//         },
//         compress: true,
//         port: 3100,
//         open: true,
//         hot: true,
//         liveReload: true
//     }
// }

const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist/'),
  },

  entry: {
    // define HTML templates here
    index: './src/index.html',  // => dist/index.html
    'views/haha': './src/views/haha.html', // => dist/about/index.html
  },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,//이전 해쉬 파일 삭제,
        assetModuleFilename: '[name][ext]'//asset 해시처리안된게
    },
  plugins: [
    new HtmlBundlerPlugin({
      js: {
        // output filename of extracted JS from source script loaded in HTML via `<script>` tag
        filename: 'assets/js/[name].[contenthash:8].js',
      },
      css: {
        // output filename of extracted CSS from source style loaded in HTML via `<link>` tag
        filename: 'assets/css/[name].[contenthash:8].css',
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: HtmlBundlerPlugin.loader, // HTML loader
      },
      // styles
      {
        test: /\.(css|sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // images
    //   {
    //     test: /\.(png|jpe?g|svg|ico)/,
    //     type: 'asset/resource',
    //     generator: {
    //       filename: 'asset/img/[name].[hash:8][ext]',
    //     },
    //   },
    ],
  },
  devtool: 'source-map',
  // enable HMR with live reload
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
    compress: true,
    port: 3100,
    open: true,
    hot: true,
    liveReload: true
  },
};