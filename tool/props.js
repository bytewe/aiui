/*
 * @Author: airobot
 * @Date: 2022-02-03 01:42:22
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-03 02:01:45
 * @Description:
 */
const fs = require('fs');
const exts = ['js'];
const path = '../src/aiui/config/props';
main(path);

function main(path) {
    const list = fs.readdirSync(path);
    list.forEach((item) => {
        let file = path + '/' + item;
        let stat = fs.statSync(file);
        if (stat.isFile() && exts.includes(file.substring(file.lastIndexOf('.') + 1))) {
            const newName = getKebabCase(item.replace('.js', ''));
            const newFile = `../src/aiui/config/ai-${newName}/ai-${newName}.js`;
            const newPath = `../src/aiui/config/ai-${newName}`;
            if (!fs.existsSync(newPath)) {
                fs.mkdirSync(newPath);
            }
            let content = fs.readFileSync(file, 'utf8');
            fs.writeFileSync(newFile, content);
            console.log(newFile);
        }
    });
}

function getKebabCase(str) {
    return str.replace(/[A-Z]/g, function (item) {
        return '-' + item.toLowerCase();
    });
}
