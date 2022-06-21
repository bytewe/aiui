<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:38:59
 * @Description: 加载中图标
-->

<template>
    <ai-page background="white">
        <ai-box title="基本案列" direction="row">
            <ai-loading-icon />
        </ai-box>

        <ai-box title="半圆loading" direction="row">
            <ai-loading-icon mode="semicircle" />
        </ai-box>

        <ai-box title="圆形loading" direction="row">
            <ai-loading-icon mode="circle" />
        </ai-box>

        <ai-box title="自定义动画" direction="row">
            <ai-loading-icon mode="circle" timing-function="linear" />
        </ai-box>

        <ai-box title="自定义颜色" direction="row">
            <ai-loading-icon color="#19be6b" />
        </ai-box>

        <ai-box title="自定义文字" direction="row">
            <ai-loading-icon :vertical="true" text="加载中" />
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped></style>
