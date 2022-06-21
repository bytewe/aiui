/*
 * @Author: airobot
 * @Date: 2022-01-24 22:45:17
 * @LastEditors: airobot
 * @LastEditTime: 2022-01-28 00:20:00
 * @Description: 防抖
 */
let flag;
/**
 * @description: 节流原理：在一定时间内，只能触发一次
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function throttle(func, wait = 500, immediate = true) {
    if (immediate) {
        if (!flag) {
            flag = true;
            // 如果是立即执行，则在wait毫秒内开始时执行
            typeof func === 'function' && func();
            setTimeout(() => {
                flag = false;
            }, wait);
        }
    } else if (!flag) {
        flag = true;
        // 如果是非立即执行，则在wait毫秒内的结束处执行
        setTimeout(() => {
            flag = false;
            typeof func === 'function' && func();
        }, wait);
    }
}
export default throttle;
