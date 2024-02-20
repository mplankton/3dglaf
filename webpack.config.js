const webpack = require('webpack');
const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = [
    {
        entry: `./src/index.js`,
        output: {
            path: `${__dirname}/dist`,
            filename: 'index.js'
        },
        mode: "production",
        devServer: {
            static: {
                directory: path.join(__dirname, "dist"),
            },
            open: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                //テンプレートに使用するhtmlファイルを指定
                template: './src/index.html',filename: "index.html",
            })
        ],
        module:{
            rules:[
                {
                    test:/\.js$/,
                    use:[
                        {
                            loader:"babel-loader",
                            options:{
                                presets:[
                                    "@babel/preset-env"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        performance: {
            maxEntrypointSize: 500000,
            maxAssetSize: 500000,
          },
    }
]