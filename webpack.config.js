/**
 * Created by kelvinsun on 2016/12/6.
 */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let lessExtractor = new ExtractTextPlugin('./style/index.css');

const outputDir      = './dist',
      outputFilename = 'script/index.js';

module.exports = {
    entry : {
        index: './dev/script/index.js',
        style: './dev/style/index.less',
    },
    //watch : true,
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
            test   : /index\.less$/i,
            loader : lessExtractor.extract(['css-loader', 'less-loader']),
            include: [ path.resolve(__dirname, 'dev/style'), ],
        },],
    },
    plugins: [
        lessExtractor,
    ],
};