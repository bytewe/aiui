<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:44
 * @Description: 吸顶
-->

<template>
    <ai-page background="white">
        <ai-box title="基础使用">
            <ai-text type="content" text="滚动页面,即可看到下方的按钮会吸顶。" />
            <!-- #ifdef APP-NVUE -->
            <ai-text type="warning" text="目前由于nvue的bug,设置sticky的top值无效。" />
            <!-- #endif -->
        </ai-box>
        <ai-sticky>
            <view class="ai-padding-left ai-padding-right">
                <ai-button text="吸顶按钮" type="success" />
            </view>
        </ai-sticky>
        <ai-gap background="white" size="3000rpx" />
        <ai-divider text="已到底部" />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        navigateBack() {
            uni.navigateBack();
        },
    },
};
</script>

<style lang="scss" scoped></style>
