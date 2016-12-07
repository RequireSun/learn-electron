/**
 * Created by kelvinsun on 2016/12/6.
 */
'use strict';

const path    = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const htmlExtractor = new ExtractTextPlugin('./[name].html');
const lessExtractor = new ExtractTextPlugin('./style/[name].css');

const outputDir      = './dist',
      outputFilename = 'script/index.js';

module.exports = {
    entry : {
        index: [ './dev/script/index.js', ],
    },
    target: 'atom',
    output: {
        path      : outputDir,
        publicPath: 'http://127.0.0.1:8008/dist/',
        filename  : outputFilename,
    },
    module: {
        loaders: [{
            test   : /\.js$/i,
            loader : 'babel',
            include: [ path.resolve(__dirname, 'dev/script'), ],
            query  : { presets: [ 'es2015', ], },
        }, {
            test  : /\.css$/i,
            loader: ExtractTextPlugin.extract(['css-loader']),
        }, {
            test   : /\.less$/i,
            loader : lessExtractor.extract([ 'css-loader', 'less-loader', ]),
            include: [ path.resolve(__dirname, 'dev/style'), ],
        }, {
            test   : /\.html$/i,
            loader : htmlExtractor.extract([ 'html?minimize=true', ]),
            include: [ path.resolve(__dirname, 'dev'), ],
        }],
    },
    // externals: {
    //     electron: 'electron',
    // },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        lessExtractor,
        htmlExtractor,
    ],
};