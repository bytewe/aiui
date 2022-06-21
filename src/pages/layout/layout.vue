<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-13 22:55:04
 * @Description: 布局
-->

<template>
    <ai-page background="white">
        <ai-box size="small" title="基础使用">
            <ai-row custom-style="margin-bottom: 20rpx">
                <ai-col span="6">
                    <ai-card border-radius="4px" background="#e5e9f2" />
                </ai-col>
                <ai-col span="6">
                    <ai-card border-radius="4px" background="#ced7e1" />
                </ai-col>
            </ai-row>
            <ai-row custom-style="margin-bottom: 20rpx">
                <ai-col span="4">
                    <ai-card border-radius="4px" background="#ced7e1" />
                </ai-col>
                <ai-col span="4">
                    <ai-card border-radius="4px" background="#e5e9f2" />
                </ai-col>
                <ai-col span="4">
                    <ai-card border-radius="4px" background="#99a9bf" />
                </ai-col>
            </ai-row>
            <ai-row justify="between">
                <ai-col span="3">
                    <ai-card border-radius="4px" background="#ced7e1" />
                </ai-col>
                <ai-col span="3">
                    <ai-card border-radius="4px" background="#e5e9f2" />
                </ai-col>
                <ai-col span="3">
                    <ai-card border-radius="4px" background="#ced7e1" />
                </ai-col>
                <ai-col span="3">
                    <ai-card border-radius="4px" background="#e5e9f2" />
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box size="small" title="分栏间隔">
            <ai-row justify="between" gutter="10">
                <ai-col span="3">
                    <ai-card border-radius="4px" background="#ced7e1" />
                </ai-col>
                <ai-col span="3">
                    <ai-card border-radius="4px" background="#e5e9f2" />
                </ai-col>
                <ai-col span="3">
                    <ai-card border-radius="4px" background="#ced7e1" />
                </ai-col>
                <ai-col span="3">
                    <ai-card border-radius="4px" background="#e5e9f2" />
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box size="small" title="混合布局">
            <ai-row justify="between" gutter="10">
                <ai-col span="2">
                    <ai-card border-radius="4px" background="#e5e9f2" />
                </ai-col>
                <ai-col span="4">
                    <ai-card border-radius="4px" background="#ced7e1" />
                </ai-col>
                <ai-col span="6">
                    <ai-card border-radius="4px" background="#99a9bf" />
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box size="small" title="分栏偏移">
            <ai-row justify="between" custom-style="margin-bottom: 20rpx">
                <ai-col span="3" offset="3">
                    <ai-card border-radius="4px" background="#e5e9f2" />
                </ai-col>
                <ai-col span="3" offset="3">
                    <ai-card border-radius="4px" background="#ced7e1" />
                </ai-col>
            </ai-row>
            <ai-row>
                <ai-col span="3">
                    <ai-card border-radius="4px" background="#e5e9f2" />
                </ai-col>
                <ai-col span="3" offset="3">
                    <ai-card border-radius="4px" background="#ced7e1" />
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box size="small" title="对齐方式">
            <ai-row justify="between" custom-style="margin-bottom: 20rpx">
                <ai-col span="3">
                    <ai-card border-radius="4px" background="#e5e9f2" />
                </ai-col>
                <ai-col span="3">
                    <ai-card border-radius="4px" background="#ced7e1" />
                </ai-col>
            </ai-row>
            <ai-row>
                <ai-col span="3">
                    <ai-card border-radius="4px" background="#e5e9f2" />
                </ai-col>
                <ai-col span="3">
                    <ai-card border-radius="4px" background="#ced7e1" />
                </ai-col>
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
