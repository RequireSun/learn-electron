/**
 * Created by kelvinsun on 2016/12/9.
 */
/**
 * 判断用户client width
 * 然后给html设置一个font-size
 * 目的是为了方便rem做自适应布局
 * author:harrischen;
 * date:2014/11/21 11:10:04;
 */

(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            var docElWidth = 100 * (clientWidth / 320);
            if (docElWidth > 200) docElWidth = 200;
            console.log(docElWidth);
            docEl.style.fontSize = docElWidth + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);