const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        //시작점 여러개 정할수 있음
        main: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,//이전 해쉬 파일 삭제,
        assetModuleFilename: '[name][ext]'//asset 해시처리안된게
    },
    module: {
        rules: [
            {
                // test 정의한 정규식파일에대해 아래 로더가 역순으로 적용됨 (scss-loader>css-loader>style-loader)
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            //asset
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource'
            },
        ]
    },
    plugins: [
        //html도 build때 사용한다. src/index.html을 빌드해서 dist에 index.html을 만든다.
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
    ],
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        port: 3100,
        open: true,
        hot: true,
        liveReload: true
    }
}