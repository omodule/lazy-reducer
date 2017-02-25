'use strict';

var webpack = require('webpack')
var path = require('path')

var config = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    output: {
        library: 'lazyReducer',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, './lib'),
        filename: 'index.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': 'production'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    externals: [
        {
            redux: {
                root: 'redux',
                commonjs2: 'redux',
                commonjs: 'redux',
                amd: 'redux'
            }
        }
    ]
};


module.exports = config
