/*
 * @Author: airobot
 * @Date: 2022-02-13 21:03:58
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-13 21:05:32
 * @Description: 本地缓存
 */

// 同步获取本地缓存
function getStorageSync(key, time = 86400) {
    const res = uni.getStorageSync(key);
    if (res.time && new Date().getTime() - res.time < time * 1000) {
        return res.data;
    } else {
        return null;
    }
}

// 同步设置本地缓存
function setStorageSync(key, data) {
    uni.setStorageSync(key, {
        time: new Date().getTime(),
        data: data,
    });
}

export default {
    getStorageSync,
    setStorageSync,
};
