/**
 * Created by kelvinsun on 2016/9/19.
 */
'use strict';

const request = require('request').defaults({ jar: true, });
const cheerio = require('cheerio');
const phantom = require('phantom');
const iconv   = require('iconv-lite');
const { NetworkError, ApplyError, } = require('./error');
const parse   = require('./parse');

const networkConfig = {
    url  : 'http://auth-proxy.oa.com/DevNetTempVisit.aspx',
    proxy: 'http://127.0.0.1:8080',
};

const _apply = (callback, formData) =>
    request.post(
        Object.assign({}, networkConfig, { form: formData, }),
        (error, response, body) => {
            if (!error && 200 === response.statusCode) {
                callback(null, cheerio.load(body));
            } else {
                callback(new ApplyError);
            }
        }
    );

const _verify = (callback) => {
    let instance, page;
    phantom.create()
        .then(phInstance => {
            instance = phInstance;
            return phInstance.createPage();
        })
        .then(phPage => {
            page = phPage;
            return phPage.open(networkConfig['url']);
        })
        .then(() => page.property('content'))
        .then(content => {
            console.log(content);
            phInstance.exit();
        })
        .catch(error => phInstance.exit());
    //phantom.create(ph => ph.createPage(page => console.log(page)));
    //const iframeSrc = $('#cap_iframe iframe').prop('src');
    //request.get(
    //    Object.assign({}, networkConfig, { url: iframeSrc, }),
    //    (error, response, body) => {
    //        if (!error && 200 === response.statusCode) {
    //            const $$ = cheerio.load(body);
    //
    //            console.log($$('capImg').prop('src'));
    //        } else {
    //            callback(new ApplyError);
    //        }
    //    }
    //);
};

const query = (callback, isForce) =>
    request.get(
        networkConfig,
        (error, response, body) => {
            if (!error && 200 === response.statusCode) {
                const $    = cheerio.load(body);
                let remain = parse.getRemainTime($);
                //TODO 这个地方判断方式不对, 不过先这么留着, 后面再看
                if (-1 === remain) {
                    return _verify(callback);
                } else if (5 <= remain && !isForce) {
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

// const params = {};
// form.serializeArray().forEach(item => params[item['name']] = item['value']);

module.exports = { query, };