const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //分离css
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //压缩js
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩
const HtmlWebpackPlugin = require('html-webpack-plugin'); //
module.exports = {
    //入口文件
    entry: {
        index: [
            path.join(__dirname, '../src/public/scripts/index.es'),
            path.join(__dirname, '../src/public/scripts/addNum.js')

        ],
        tags: [
            path.join(__dirname, '../src/public/scripts/tag.es'),
        ]

    },
    //输出文件
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'public/scripts/[name]-[hash:5].js'
    },
    // loader资源处理
    module: {
        rules: [{
                test: /\.es$/,
                exclude: /(node_modules|bower_components)/, //排除
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    //插件
    plugins: [
        //当运行上线版本
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"prod"'
            }
        }),
        //输出css文件：
        new ExtractTextPlugin('public/styles/[name]-[hash:5].css'),
        //压缩js
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    warnings: true
                },
                output: {
                    comments: false,
                },
                warnings: false
            }
        }),
        //压缩css
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        //提取公共文件
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            // ( 公共chunk(commnons chunk) 的名称)
            filename: "public/scripts/conmmons/[name]-[hash:5].min.js",
        }),

    ]
}