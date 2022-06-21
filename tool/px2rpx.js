/*
 * @Author: airobot
 * @Date: 2022-01-30 00:01:36
 * @LastEditors: airobot
 * @LastEditTime: 2022-01-30 00:37:51
 * @Description:
 */

const fs = require('fs');
const exts = ['vue', 'nvue', 'scss', 'js', 'wxs'];
const path = '../src';
px2rpx(path);

function px2rpx(path) {
    const list = fs.readdirSync(path);
    list.forEach((item) => {
        let file = path + '/' + item;
        let stat = fs.statSync(file);
        if (stat.isDirectory()) {
            px2rpx(file);
        } else if (stat.isFile() && exts.includes(file.substring(file.lastIndexOf('.') + 1))) {
            let content = fs.readFileSync(file, 'utf8');
            content = content.replace(/([\d|.]+)px/g, (v) => v.replace('px', '') * 2 + 'rpx');
            console.log(file);
            fs.writeFileSync(file, content);
        }
    });
}
