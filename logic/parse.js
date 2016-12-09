/**
 * Created by kelvinsun on 2016/11/23.
 */

const getRemainTime = $ => {
    if (needVerification($)) {
        return -1;
    } else if (needApply($)) {
        return 0;
    } else {
        let time = $('#AuthIpDivClick').text().trim();
        if (time.includes('访问外网时间剩余不足1分钟。请您稍后重新申请')) {
            time = 1;
        } else {
            time = time.replace('访问外网时间剩余', '').replace('分钟', '').replace('。', '');
            if (time.includes('小时')) {
                time = time.split('小时');
                time = time[0] * 60 + time[1] * 1;
            }
        }
        return time;
    }
};

const needVerification = $ => !!$('#cap_iframe').length;

const needApply = $ => 'block' === $('#NoAuthIpDiv').css('display');

const getForm = $ => parseForm($('#btnDevTempVisit').parents('form'));

const parseForm = form => {
    const params = {};
    form.serializeArray().forEach(item => params[item['name']] = item['value']);
    params['btnDevTempVisit'] = '';
    return params;
};

module.exports = { getRemainTime, getForm, };

