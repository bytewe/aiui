<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:50
 * @Description: 长按提示
-->

<template>
    <ai-page background="white">
        <ai-box title="基础使用">
            <ai-tooltip :text="text1" overlay />
        </ai-box>

        <ai-box title="下方显示">
            <ai-tooltip :text="text2" direction="bottom" />
        </ai-box>

        <ai-box title="扩展按钮">
            <ai-tooltip :text="text3" :buttons="buttons1" @click="click" />
        </ai-box>

        <ai-box title="自动调整位置">
            <ai-tooltip :text="text4" :buttons="buttons2" />
        </ai-box>

        <ai-box title="高亮选中文本背景色">
            <ai-tooltip :text="text5" :buttons="buttons3" background="#e3e4e6" />
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            text1: '长按文本，上方提示',
            text2: '长按文本，下方提示',
            text3: '显示多个扩展按钮',
            text4: '自动调整气泡位置',
            text5: '长按文本，显示背景色',
            buttons1: ['扩展'],
            buttons2: ['扩展', '搜索', '翻译'],
            buttons3: ['扩展', '搜索', '翻译'],
        };
    },
    onLoad() {},
    methods: {
        click(index) {
            console.log('index', index);
        },
    },
};
</script>

<style lang="scss" scoped></style>
