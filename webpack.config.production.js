/**
 * Created by kelvinsun on 2016/12/7.
 */
'use strict';

const webpack    = require('webpack');
const baseConfig = require('./webpack.config.base');

const config = Object.create(baseConfig);

config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
        },
    })
);

module.exports = config;
