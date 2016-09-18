/**
 * Created by kelvinsun on 2016/9/19.
 */
'use strict';

const request = require('request');
const cheerio = require('cheerio');

const url = '//auth-proxy.oa.com/DevNetTempVisit.aspx';

const options = {};

const request = callback => request(
    url,
    options,
    (error, response, body) => {
        if (!error && 200 === response.statusCode) {
            $ = cheerio.load(body);
        } else {
            // 当前网络不通, xxx 后重试
        }
    }
);

module.exports = { request };