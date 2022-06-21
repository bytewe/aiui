/*
 * @Author: airobot
 * @Date: 2022-02-13 20:03:24
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-13 21:38:35
 * @Description: 请求
 */

// 请求
function request(options) {
    return new Promise((reslove, reject) => {
        let url = options.url;
        if (url.indexOf('http') === -1 && url.indexOf('https') === -1) {
            url = uni.$config.api + url + '.json';
        }
        const data = options.data || {};
        const header = options.header || {};
        if (options.token) {
            // const token = uni.$util.getStorageSync('token');
            // if (!token) {
            //     uni.redirectTo({
            //         url: '/pages/account/login',
            //     });
            // }
            // header.token = token;
        }
        const method = options.method || 'GET';
        uni.request({
            url: url,
            data: data,
            header: header,
            timeout: uni.$config.timeout || 5000,
            method: method,
            success: (res) => {
                reslove(res.data);
            },
            fail: (err) => {
                reject(err);
            },
        });
    });
}

export default request;
