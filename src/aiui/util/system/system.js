/*
 * @Author: airobot
 * @Date: 2022-02-13 15:13:35
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-13 15:24:11
 * @Description: 系统
 */

// 系统平台
function os() {
    return uni.getSystemInfoSync().platform.toLowerCase();
}

// 系统信息
function sys() {
    return uni.getSystemInfoSync();
}

// 延时
function sleep(value = 30) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, value);
    });
}

export default {
    os,
    sys,
    sleep,
};
