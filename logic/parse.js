/**
 * Created by kelvinsun on 2016/11/23.
 */

const getRemainTime = $ => {
    if (needApply($)) {
        return 0;
    } else {
        let time = $('#AuthIpDivClick').text().trim();
        if (time.contains('访问外网时间剩余不足1分钟。请您稍后重新申请')) {
            time = 1;
        } else {
            time = time.replace('访问外网时间剩余', '').replace('分钟', '');
            if (time.contains('小时')) {
                time = time.split('小时');
                time = time[0] * 60 + time[1] * 1;
            }
        }
        return time;
    }
};

const needApply = $ => 'block' === $('#NoAuthIpDiv').css('display');

const getForm = $ => $('#btnDevTempVisit').parents('form');

module.exports = { getRemainTime, getForm, };

