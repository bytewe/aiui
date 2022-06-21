/*
 * @Author: airobot
 * @Date: 2022-02-13 15:17:13
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-13 15:18:23
 * @Description: 路由
 */

// 获取当前页面路径
function page() {
    // eslint-disable-next-line no-undef
    const pages = getCurrentPages();
    // 某些特殊情况下(比如页面进行redirectTo时的一些时机)，pages可能为空数组
    return `/${pages[pages.length - 1]?.route ?? ''}`;
}

// 获取当前路由栈实例数组
function pages() {
    // eslint-disable-next-line no-undef
    const pages = getCurrentPages();
    return pages;
}

// 对象转url参数
function queryParams(data = {}, isPrefix = true, arrayFormat = 'brackets') {
    const prefix = isPrefix ? '?' : '';
    const _result = [];
    if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
    for (const key in data) {
        const value = data[key];
        // 去掉为空的参数
        if (['', undefined, null].indexOf(value) >= 0) {
            continue;
        }
        // 如果值为数组，另行处理
        if (value.constructor === Array) {
            // e.g. {ids: [1, 2, 3]}
            switch (arrayFormat) {
                case 'indices':
                    // 结果: ids[0]=1&ids[1]=2&ids[2]=3
                    for (let i = 0; i < value.length; i++) {
                        _result.push(`${key}[${i}]=${value[i]}`);
                    }
                    break;
                case 'brackets':
                    // 结果: ids[]=1&ids[]=2&ids[]=3
                    value.forEach((_value) => {
                        _result.push(`${key}[]=${_value}`);
                    });
                    break;
                case 'repeat':
                    // 结果: ids=1&ids=2&ids=3
                    value.forEach((_value) => {
                        _result.push(`${key}=${_value}`);
                    });
                    break;
                case 'comma': {
                    // 结果: ids=1,2,3
                    let commaStr = '';
                    value.forEach((_value) => {
                        commaStr += (commaStr ? ',' : '') + _value;
                    });
                    _result.push(`${key}=${commaStr}`);
                    break;
                }
                default:
                    value.forEach((_value) => {
                        _result.push(`${key}[]=${_value}`);
                    });
            }
        } else {
            _result.push(`${key}=${value}`);
        }
    }
    return _result.length ? prefix + _result.join('&') : '';
}

export default {
    page,
    pages,
    queryParams,
};
