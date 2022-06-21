/*
 * @Author: airobot
 * @Date: 2022-02-13 15:02:57
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-13 21:01:28
 * @Description: 基本方法
 */

import test from '../test/test';

// 去除空格
export function trim(str, pos = 'both') {
    str = String(str);
    if (pos == 'both') {
        return str.replace(/^\s+|\s+$/g, '');
    }
    if (pos == 'left') {
        return str.replace(/^\s*/, '');
    }
    if (pos == 'right') {
        return str.replace(/(\s*$)/g, '');
    }
    if (pos == 'all') {
        return str.replace(/\s+/g, '');
    }
    return str;
}

// 随机
function range(min = 0, max = 0, value = 0) {
    return Math.max(min, Math.min(max, Number(value)));
}

// 取随机数
function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
        const gab = max - min + 1;
        return Math.floor(Math.random() * gab + min);
    }
    return 0;
}

// 随机数组
function randomArray(array = []) {
    // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
    return array.sort(() => Math.random() - 0.5);
}

// 获取uuid
function guid(len = 32, firstU = true, radix = null) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    radix = radix || chars.length;
    if (len) {
        // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
        for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
        let r;
        // rfc4122标准要求返回的uuid中,某些位为固定的字符
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (let i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | (Math.random() * 16);
                uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
    if (firstU) {
        uuid.shift();
        return `u${uuid.join('')}`;
    }
    return uuid.join('');
}

// 补零
function padZero(value) {
    return `00${value}`.slice(-2);
}

// 深度克隆
function deepClone(obj) {
    // 对常见的“非”值，直接返回原来值
    if ([null, undefined, NaN, false].includes(obj)) return obj;
    if (typeof obj !== 'object' && typeof obj !== 'function') {
        // 原始类型直接返回
        return obj;
    }
    const o = test.array(obj) ? [] : {};
    for (const i in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, i)) {
            o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
        }
    }
    return o;
}

// 深度合并
function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== 'object' || typeof source !== 'object') return false;
    for (const prop in source) {
        if (!Object.prototype.hasOwnProperty.call(source, prop)) continue;
        if (prop in target) {
            if (typeof target[prop] !== 'object') {
                target[prop] = source[prop];
            } else if (typeof source[prop] !== 'object') {
                target[prop] = source[prop];
            } else if (target[prop].concat && source[prop].concat) {
                target[prop] = target[prop].concat(source[prop]);
            } else {
                target[prop] = deepMerge(target[prop], source[prop]);
            }
        } else {
            target[prop] = source[prop];
        }
    }
    return target;
}

// 获取对象的属性值
function getProperty(obj, key) {
    if (!obj) {
        return;
    }
    if (typeof key !== 'string' || key === '') {
        return '';
    }
    if (key.indexOf('.') !== -1) {
        const keys = key.split('.');
        let firstObj = obj[keys[0]] || {};

        for (let i = 1; i < keys.length; i++) {
            if (firstObj) {
                firstObj = firstObj[keys[i]];
            }
        }
        return firstObj;
    }
    return obj[key];
}

// 设置对象的属性值
function setProperty(obj, key, value) {
    if (!obj) {
        return;
    }
    // 递归赋值
    const inFn = function (_obj, keys, v) {
        // 最后一个属性key
        if (keys.length === 1) {
            _obj[keys[0]] = v;
            return;
        }
        // 0~length-1个key
        while (keys.length > 1) {
            const k = keys[0];
            if (!_obj[k] || typeof _obj[k] !== 'object') {
                _obj[k] = {};
            }
            keys.shift();
            // 自调用判断是否存在属性，不存在则自动创建对象
            inFn(_obj[k], keys, v);
        }
    };
    if (typeof key === 'string' && key !== '') {
        if (key.indexOf('.') !== -1) {
            // 支持多层级赋值操作
            const keys = key.split('.');
            inFn(obj, keys, value);
        } else {
            obj[key] = value;
        }
    }
}

export default {
    trim,
    range,
    random,
    randomArray,
    guid,
    padZero,
    deepClone,
    deepMerge,
    getProperty,
    setProperty,
};
