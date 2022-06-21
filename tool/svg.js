/*
 * @Author: airobot
 * @Date: 2022-02-03 01:42:22
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-12 14:08:20
 * @Description:
 */
const fs = require('fs');
const exts = ['svg'];
const path = './svg';
const newPath = './svg2';
main(path);

function main(path) {
    const list = fs.readdirSync(path);
    list.forEach((item) => {
        let file = path + '/' + item;
        let stat = fs.statSync(file);
        if (stat.isFile() && exts.includes(file.substring(file.lastIndexOf('.') + 1))) {
            let newItem = '';
            if (item.indexOf('-o.svg') !== -1) {
                newItem = item.replace('-o.svg', '.svg');
            } else if (fs.existsSync(file.replace('.svg', '-o.svg'))) {
                newItem = item.replace('.svg', '--fill.svg');
            } else {
                newItem = item;
            }
            let newFile = newPath + '/' + newItem;
            // const newName = getKebabCase(item.replace('.js', ''));
            // const newFile = `../src/aiui/config/ai-${newName}/ai-${newName}.js`;
            // const newPath = `../src/aiui/config/ai-${newName}`;
            // if (!fs.existsSync(newPath)) {
            //     fs.mkdirSync(newPath);
            // }
            let content = fs.readFileSync(file, 'utf8');
            fs.writeFileSync(newFile, content);
            console.log(newFile);
        }
    });
}
