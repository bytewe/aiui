/*
 * @Author: airobot
 * @Date: 2022-01-29 00:47:27
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-13 01:43:21
 * @Description: 临时
 */
const fs = require('fs');
const content = fs.readFileSync('./temp.txt', 'utf8');
const urls = content.split('\r\n');
const pages = [...new Set(urls)]

pages.sort((a, b) => {
    return a.localeCompare(b);
});

pages.forEach((item) => {
    console.log(item);
});
