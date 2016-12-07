/**
 * Created by kelvinsun on 2016/12/6.
 */

const path = require('path');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');

let htmlExtractor = new ExtractTextPlugin('./[name].html');
let lessExtractor = new ExtractTextPlugin('./style/[name].css');

const outputDir      = './dist',
      outputFilename = 'script/index.js';

module.exports = {
    entry : {
        index: './dev/script/index.js',
    },
    target: 'atom',
    output: {
        path    : outputDir,
        filename: outputFilename,
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
    plugins: [
        lessExtractor,
        htmlExtractor,
    ],
};