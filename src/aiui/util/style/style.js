/*
 * @Author: airobot
 * @Date: 2022-02-13 14:53:56
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-14 10:37:39
 * @Description: 样式
 */

import { trim, deepMerge } from '../base/base';
import test from '../test/test';

// 生成样式
function gen(name, mods) {
    if (!mods) {
        return '';
    }
    if (typeof mods === 'string' || typeof mods === 'number') {
        return ` ${name}--${mods}`;
    }
    if (Array.isArray(mods)) {
        return mods.reduce((ret, item) => ret + gen(name, item), '');
    }
    return Object.keys(mods).reduce((ret, key) => ret + (mods[key] ? gen(name, key) : ''), '');
}

// 生成bem样式
function bem(name, mods) {
    return `${name}` + gen(name, mods);
}

// 对齐转flex
function alignToJustify(align) {
    let justify = '';
    switch (align) {
        case 'left':
            justify = 'flex-start';
            break;
        case 'center':
            justify = 'center';
            break;
        case 'right':
            justify = 'flex-end';
    }
    return justify;
}

// 根据主题type值,获取对应的图标
function type2icon(type = 'success', fill = false) {
    // 如果非预置值,默认为success
    if (['primary', 'info', 'danger', 'warning', 'success'].indexOf(type) == -1) type = 'success';
    let iconName = '';
    // 目前(2019-12-12),info和primary使用同一个图标
    switch (type) {
        case 'primary':
            iconName = 'info-circle';
            break;
        case 'info':
            iconName = 'info-circle';
            break;
        case 'danger':
            iconName = 'close-circle';
            break;
        case 'warning':
            iconName = 'info-circle';
            break;
        case 'success':
            iconName = 'check-circle';
            break;
        default:
            iconName = 'check-circle';
    }
    // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
    if (fill) iconName += '-fill';
    return iconName;
}

// 获取px
function getPx(value, unit = false) {
    if (test.number(value)) {
        return unit ? `${value}px` : value;
    }
    // 如果带有rpx，先取出其数值部分，再转为px值
    if (/(rpx|upx)$/.test(value)) {
        return unit ? `${uni.upx2px(parseInt(value))}px` : uni.upx2px(parseInt(value));
    }
    return unit ? `${parseInt(value)}px` : parseInt(value);
}

// 获取样式
function getStyle(paramStyle, customStyle) {
    console.log('paramStyle===', paramStyle);
    const style = {};
    for (const key in paramStyle) {
        const value = paramStyle[key];
        if (value === null || value === undefined || value === '') {
            continue;
        }
        switch (key) {
            case 'fontWeight':
            case 'lines':
            case 'textAlign':
            case 'textDecoration':
            case 'wordWrap':
                style[key] = value;
                break;
            case 'fontSize':
                style.fontSize = this.addUnit(uni.$config[`font-size-${value}`] || value);
                break;
            case 'color':
                style.color = uni.$config[`color-${value}`] || value;
                break;
            case 'background':
                style.background = uni.$config[`background-${value}`] || value;
                break;
            case 'lineHeight':
                style.lineHeight = this.addUnit(uni.$config[`line-height-${value}`] || value);
                break;
            case 'borderRadius':
                style.borderRadius = this.addUnit(uni.$config[`border-radius-${value}`] || value);
                break;
            case 'margin':
            case 'padding':
                style[key] = this.addUnit(uni.$config[`space-${value}`] || value);
                break;
        }
    }
    return deepMerge(style, this.addStyle(customStyle));
}

// 添加样式
function addStyle(customStyle, target = 'object') {
    if (test.empty(customStyle)) {
        // 空直接返回对象或字符串
        return target === 'object' ? {} : '';
    } else if (typeof customStyle === target) {
        // 字符串转字符串，对象转对象情形，直接返回
        return customStyle;
    }
    // 字符串转对象
    if (target === 'object') {
        // 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 40rpx 0如果去掉了就错了)，空格是无用的
        customStyle = trim(customStyle);
        // 根据";"将字符串转为数组形式
        const styleArray = customStyle.split(';');
        const style = {};
        // 历遍数组，拼接成对象
        for (let i = 0; i < styleArray.length; i++) {
            // 'font-size:40rpx;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
            if (styleArray[i]) {
                const item = styleArray[i].split(':');
                style[trim(item[0])] = trim(item[1]);
            }
        }
        return style;
    }
    // 这里为对象转字符串形式
    let string = '';
    for (const i in customStyle) {
        // 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
        const key = i.replace(/([A-Z])/g, '-$1').toLowerCase();
        string += `${key}:${customStyle[i]};`;
    }
    // 去除两端空格
    return trim(string);
}

// 添加单位
function addUnit(value = 'auto', unit = 'px') {
    value = String(value);
    // 判断是否为数值
    return test.number(value) ? `${value}${unit}` : value;
}

// 删除单位
function deleteUnit(value) {
    value = String(value);
    if (value.substr(-3) === 'rpx') {
        return uni.upx2px(Number(value.substr(0, value.length - 3)));
    } else if (value.substr(-2) === 'px') {
        return Number(value.substr(0, value.length - 2));
    } else {
        return Number(value);
    }
}

// 获取duration值
function getDuration(value, unit = true) {
    const valueNum = parseInt(value);
    if (unit) {
        if (/s$/.test(value)) return value;
        return value > 30 ? `${value}ms` : `${value}s`;
    }
    if (/ms$/.test(value)) return valueNum;
    if (/s$/.test(value)) return valueNum > 30 ? valueNum : valueNum * 1000;
    return valueNum;
}

// 求两个颜色之间的渐变值
function colorGradient(startColor = 'rgb(0, 0, 0)', endColor = 'rgb(255, 255, 255)', step = 10) {
    const startRGB = hexToRgb(startColor, false); // 转换为rgb数组模式
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];

    const endRGB = hexToRgb(endColor, false);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];

    const sR = (endR - startR) / step; // 总差值
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;
    const colorArr = [];
    for (let i = 0; i < step; i++) {
        // 计算每一步的hex值
        let hex = rgbToHex(
            `rgb(${Math.round(sR * i + startR)},${Math.round(sG * i + startG)},${Math.round(sB * i + startB)})`
        );
        // 确保第一个颜色值为startColor的值
        if (i === 0) hex = rgbToHex(startColor);
        // 确保最后一个颜色值为endColor的值
        if (i === step - 1) hex = rgbToHex(endColor);
        colorArr.push(hex);
    }
    return colorArr;
}

// 将hex表示方式转换为rgb表示方式
function hexToRgb(sColor, str = true) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = String(sColor).toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        // 处理六位的颜色值
        const sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
        }
        if (!str) {
            return sColorChange;
        }
        return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
    }
    if (/^(rgb|RGB)/.test(sColor)) {
        const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
        return arr.map((val) => Number(val));
    }
    return sColor;
}

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
    const _this = rgb;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
        const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
        let strHex = '#';
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16);
            hex = String(hex).length == 1 ? `${0}${hex}` : hex; // 保证每个rgb的值为2位
            if (hex === '0') {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = _this;
        }
        return strHex;
    }
    if (reg.test(_this)) {
        const aNum = _this.replace(/#/, '').split('');
        if (aNum.length === 6) {
            return _this;
        }
        if (aNum.length === 3) {
            let numHex = '#';
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += aNum[i] + aNum[i];
            }
            return numHex;
        }
    } else {
        return _this;
    }
}

// 将颜色转换为RGBA
function colorToRgba(color, alpha) {
    color = rgbToHex(color);
    // 十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    /* 16进制颜色转为RGB格式 */
    let sColor = String(color).toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        // 处理六位的颜色值
        const sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
        }
        // return sColorChange.join(',')
        return `rgba(${sColorChange.join(',')},${alpha})`;
    }
    return sColor;
}

export default {
    bem,
    alignToJustify,
    type2icon,
    getPx,
    getStyle,
    addStyle,
    addUnit,
    deleteUnit,
    getDuration,
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba,
};
