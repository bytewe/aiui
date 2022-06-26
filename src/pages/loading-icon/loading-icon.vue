<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-26 20:56:41
 * @Description: 加载中图标
-->

<template>
    <ai-page background="white">
        <ai-box title="基本案列">
            <ai-row>
                <ai-loading-icon />
            </ai-row>
        </ai-box>

        <ai-box title="半圆loading">
            <ai-row>
                <ai-loading-icon mode="semicircle" />
            </ai-row>
        </ai-box>

        <ai-box title="圆形loading">
            <ai-row>
                <ai-loading-icon mode="circle" />
            </ai-row>
        </ai-box>

        <ai-box title="自定义动画">
            <ai-row>
                <ai-loading-icon mode="circle" timing-function="linear" />
            </ai-row>
        </ai-box>

        <ai-box title="自定义颜色">
            <ai-row>
                <ai-loading-icon color="#19be6b" />
            </ai-row>
        </ai-box>

        <ai-box title="自定义文字">
            <ai-row>
                <ai-loading-icon :vertical="true" text="加载中" />
            </ai-row>
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
