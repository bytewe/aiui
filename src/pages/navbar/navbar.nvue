<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:35
 * @Description: 导航栏
-->

<template>
    <ai-page>
        <ai-navbar title="导航栏" background="#f3f4f6" />

        <ai-cell-group title="基础功能" :border="false">
            <ai-navbar
                title="个人中心"
                :safe-area-inset-top="false"
                :fixed="false"
                @rightClick="rightClick"
                @leftClick="leftClick"
            />
        </ai-cell-group>

        <ai-cell-group title="自定义文本" :border="false">
            <ai-navbar
                title="个人中心"
                left-text="返回"
                right-icon="location"
                :safe-area-inset-top="false"
                :fixed="false"
            />
        </ai-cell-group>

        <ai-cell-group title="自定义插槽" :border="false">
            <ai-navbar left-text="返回" title="个人中心" :safe-area-inset-top="false" :fixed="false">
                <view slot="left" class="navbar__left">
                    <ai-icon name="arrow-left" size="19" />
                    <ai-line direction="column" :hairline="false" length="16" margin="0 16rpx" />
                    <ai-icon name="home" size="20" />
                </view>
            </ai-navbar>
        </ai-cell-group>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        navigateBack() {
            uni.navigateBack({
                delta: 1,
            });
        },
        rightClick() {
            console.log('rightClick');
        },
        leftClick() {
            console.log('leftClick');
        },
    },
};
</script>

<style lang="scss" scoped>
.navbar {
    &__left {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-width: 0.5px;
        border-radius: 200rpx;
        border-color: $border-color-default;
        padding: 6rpx 14rpx;
        opacity: 0.8;
    }
}
</style>
