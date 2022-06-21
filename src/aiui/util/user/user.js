/*
 * @Author: airobot
 * @Date: 2022-02-13 21:12:25
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-13 21:46:48
 * @Description: 用户
 */

// 获取用户信息
function getUserInfo() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
        const storage = uni.$util.getStorageSync('userInfo');
        if (storage) {
            resolve(storage);
            return;
        }
        const res = await uni.$api.getUserInfo();
        if (res.code !== 200) {
            resolve(null);
            return;
        }
        const userInfo = res.data;
        uni.$util.setStorageSync('userInfo', userInfo);
        resolve(userInfo);
    });
}

export default {
    getUserInfo,
};
