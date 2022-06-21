/*
 * @Author: airobot
 * @Date: 2022-02-13 15:08:49
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-13 15:10:44
 * @Description: 格式化
 */

// 格式化时间
function timeFormat(dateTime = null, fmt = 'yyyy-mm-dd') {
    // 如果为null,则格式化当前时间
    if (!dateTime) dateTime = Number(new Date());
    // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
    if (dateTime.toString().length == 10) dateTime *= 1000;
    const date = new Date(dateTime);
    let ret;
    const opt = {
        'y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'h+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        's+': date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const k in opt) {
        ret = new RegExp(`(${k})`).exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
        }
    }
    return fmt;
}

// 时间戳转为多久之前
function timeFrom(timestamp = null, format = 'yyyy-mm-dd') {
    if (timestamp == null) timestamp = Number(new Date());
    timestamp = parseInt(timestamp);
    // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
    if (timestamp.toString().length == 10) timestamp *= 1000;
    let timer = new Date().getTime() - timestamp;
    timer = parseInt(timer / 1000);
    // 如果小于5分钟,则返回"刚刚",其他以此类推
    let tips = '';
    switch (true) {
        case timer < 300:
            tips = '刚刚';
            break;
        case timer >= 300 && timer < 3600:
            tips = `${parseInt(timer / 60)}分钟前`;
            break;
        case timer >= 3600 && timer < 86400:
            tips = `${parseInt(timer / 3600)}小时前`;
            break;
        case timer >= 86400 && timer < 2592000:
            tips = `${parseInt(timer / 86400)}天前`;
            break;
        default:
            // 如果format为false，则无论什么时间戳，都显示xx之前
            if (format === false) {
                if (timer >= 2592000 && timer < 365 * 86400) {
                    tips = `${parseInt(timer / (86400 * 30))}个月前`;
                } else {
                    tips = `${parseInt(timer / (86400 * 365))}年前`;
                }
            } else {
                tips = timeFormat(timestamp, format);
            }
    }
    return tips;
}

// 数字格式化
function priceFormat(number, decimals = 0, decimalPoint = '.', thousandsSeparator = ',') {
    number = `${number}`.replace(/[^0-9+-Ee.]/g, '');
    const n = !isFinite(+number) ? 0 : +number;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === 'undefined' ? ',' : thousandsSeparator;
    const dec = typeof decimalPoint === 'undefined' ? '.' : decimalPoint;
    let s = '';
    const toFixedFix = function (n, prec) {
        const k = 10 ** prec;
        return `${Math.ceil(n * k) / k}`;
    };

    s = (prec ? toFixedFix(n, prec) : `${Math.round(n)}`).split('.');
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, `$1${sep}$2`);
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

export default {
    timeFormat,
    timeFrom,
    priceFormat,
};
