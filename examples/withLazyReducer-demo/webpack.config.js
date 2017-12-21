const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') // eslint-disable-line import/no-extraneous-dependencies

const config = {
    devtool: 'source-map',
    entry: ['webpack-hot-middleware/client?reload=true', './src/index.js'],
    output: {
        path: '/',
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js' // so that import('module') creates module.js
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
}

module.exports = config
