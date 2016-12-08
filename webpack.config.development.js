/**
 * Created by kelvinsun on 2016/12/7.
 */
'use strict';

const webpack    = require('webpack');
const baseConfig = require('./webpack.config.base');

const config = Object.create(baseConfig);

config.devtool = '#cheap-module-source-map';
config.devServer = { hot: true, inline: true, };
config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development'),
        },
    })
);

module.exports = config;