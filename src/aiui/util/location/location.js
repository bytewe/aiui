/*
 * @Author: airobot
 * @Date: 2022-02-13 15:30:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-13 21:47:46
 * @Description: 位置
 */

// 获取位置
function getLocation(time = 60) {
    return new Promise((resolve) => {
        const storage = uni.$util.getStorageSync('location', time);
        if (storage) {
            resolve(storage);
            return;
        }
        uni.getLocation({
            type: 'wgs84',
            success: (res) => {
                const location = {
                    status: 1,
                    latitude: res.latitude,
                    longitude: res.longitude,
                };
                uni.$util.setStorageSync('location', location);
                resolve(location);
            },
            fail: () => {
                resolve({
                    status: 0,
                    latitude: null,
                    longitude: null,
                });
            },
        });
    });
}

export default {
    getLocation,
};
