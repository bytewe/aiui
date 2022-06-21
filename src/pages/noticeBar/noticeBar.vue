<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:37
 * @Description: 滚动通知
-->

<template>
    <ai-page background="white">
        <ai-box title="基础功能">
            <ai-notice-bar :text="text1" />
        </ai-box>

        <ai-box title="可关闭">
            <ai-notice-bar :text="text5" mode="closable" />
        </ai-box>

        <ai-box title="自定义横向滚动速度">
            <ai-notice-bar :text="text2" speed="250" mode="closable" />
        </ai-box>

        <ai-box title="可跳转(点击右箭头)">
            <ai-notice-bar :text="text3" mode="link" url="/pages/tag/tag" />
        </ai-box>

        <ai-box title="横向步进滚动">
            <ai-notice-bar :text="text4" :step="true" @click="click" />
        </ai-box>

        <ai-box title="纵向滚动">
            <ai-notice-bar :text="text4" direction="column" @click="click" />
        </ai-box>

        <ai-box title="自定义样式">
            <ai-notice-bar :text="text1" color="#ffffff" background="#f56c6c" />
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            text1: 'AIUI众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用',
            text2: 'AIUI众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨',
            text3: 'AIUI收集众多的常用页面和布局，减少开发者的重复工作，让您专注逻辑，事半功倍',
            text4: ['寒雨连江夜入吴', '平明送客楚山孤', '洛阳亲友如相问', '一片冰心在玉壶'],
            text5: '涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川',
        };
    },
    onLoad() {},
    methods: {
        click(e) {
            console.log(e);
        },
    },
};
</script>

<style lang="scss" scoped></style>
