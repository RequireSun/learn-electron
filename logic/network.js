/**
 * Created by kelvinsun on 2016/9/19.
 */
'use strict';

const request = require('request');
const cheerio = require('cheerio');
const { NetworkError, ApplyError, } = require('./error');
const parse   = require('./parse');

const networkConfig = {
    url: '//auth-proxy.oa.com/DevNetTempVisit.aspx',
};

const query = (callback, isForce) =>
    request.get(
        networkConfig,
        (error, response, body) => {
            if (!error && 200 === response.statusCode) {
                const $    = cheerio.load(body);
                let remain = parse.getRemainTime($);

                if (5 <= remain && !isForce) {
                    return callback(null, remain);
                } else {
                    // 禁止访问
                    return _apply(
                        (error, $$) =>
                            error ?
                                callback(error) :
                                (1 <= parse.getRemainTime($$) ?
                                    callback(null, parse.getRemainTime($$)) :
                                    callback(new ApplyError)),
                        parse.getForm($)
                    );
                }
            } else {
                // 当前网络不通, xxx 后重试
                return callback(new NetworkError);
            }
        }
    );

const _apply = (callback, formData) =>
    request.post(
        Object.assign({}, networkConfig, parseForm(formData)),
        (error, response, body) => {
            if (!error && 200 === response.statusCode) {
                callback(null, cheerio.load(body));
            } else {
                callback(new ApplyError);
            }
        }
    );

const parseForm = form => {
    const params = {};
    form.serializeArray().forEach(item => params[item['name']] = item['value']);
    return params;
};
// const params = {};
// form.serializeArray().forEach(item => params[item['name']] = item['value']);

module.exports = { query, };