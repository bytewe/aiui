/*
 * @Author: airobot
 * @Date: 2022-01-24 22:35:42
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:13:30
 * @Description:  eslint 配置文件
 */

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    globals: {
        swan: 'readonly',
        wx: 'readonly',
        uni: 'readonly',
        weex: 'readonly',
        plus: 'readonly',
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/essential',
        'plugin:vue/strongly-recommended',
        'plugin:vue/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['vue'],
    rules: {
        'vue/multi-word-component-names': 0, // 组件要使用多个单词命名
        'vue/singleline-html-element-content-newline': 0, // 在单行元素的内容前后需要换行符
        'vue/html-indent': 0, // 缩进
        'vue/multiline-html-element-content-newline': 0, // 在多行元素的内容之前和之后需要换行符
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ], // 自闭合标签
        'vue/no-side-effects-in-computed-properties': 0, // 不要在直接修改props的数据
        'vue/no-v-html': 0,
        'vue/html-closing-bracket-newline': 0, // html闭合标签要在新一行
        'vue/first-attribute-linebreak': 0, // 首个属性要换行
        'vue/max-attributes-per-line': 0,
    },
};
