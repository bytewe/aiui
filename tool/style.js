/*
 * @Author: airobot
 * @Date: 2022-02-03 02:01:45
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-03 02:05:05
 * @Description:
 */
const fs = require('fs');
const exts = ['scss'];
const path = '../src/aiui/config/style';
main(path);

function main(path) {
    const list = fs.readdirSync(path);
    list.forEach((item) => {
        let file = path + '/' + item;
        let stat = fs.statSync(file);
        if (stat.isFile() && exts.includes(file.substring(file.lastIndexOf('.') + 1))) {
            const newName = 'ai-' + item.replace('.scss', '');
            const newFile = `../src/aiui/config/${newName}/${newName}.scss`;
            const newPath = `../src/aiui/config/${newName}`;
            if (fs.existsSync(newPath)) {
                let content = fs.readFileSync(file, 'utf8');
                fs.writeFileSync(newFile, content);
                fs.unlinkSync(file);
                console.log(newFile);
            }
        }
    });
}
