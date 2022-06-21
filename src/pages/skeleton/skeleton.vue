<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:43
 * @Description: 骨架屏
-->

<template>
    <ai-page background="white">
        <ai-box title="基础使用">
            <ai-skeleton rows="3" title loading />
        </ai-box>

        <ai-box title="自定义段落行数">
            <ai-skeleton rows="2" title loading />
        </ai-box>

        <ai-box title="设置段落宽度">
            <ai-skeleton rows="2" title :rows-width="['100%', '35%']" loading />
        </ai-box>

        <ai-box title="设置段落高度">
            <ai-skeleton
                rows="3"
                title
                :rows-width="['100%', '100%', '100%']"
                :rows-height="['36rpx', '36rpx', '160rpx']"
                loading
            />
        </ai-box>

        <ai-box title="是否开启动画">
            <ai-switch v-model="switch1" space="2" inactive-color="#e6e6e6" />
        </ai-box>

        <ai-box>
            <ai-skeleton :animate="switch1" rows="3" title loading />
        </ai-box>

        <ai-box title="展示头像">
            <ai-skeleton :animate="switch1" rows="3" title loading avatar />
        </ai-box>

        <ai-box title="切换状态">
            <ai-switch v-model="switch2" space="2" inactive-color="#e6e6e6" />
        </ai-box>

        <ai-box>
            <ai-skeleton title avatar rows="2" rows-height="14" :loading="switch2">
                <view class="skeleton">
                    <image src="/static/uview/common/logo.png" class="skeleton__image" />
                    <view class="skeleton__content">
                        <ai-text text="利剑出鞘,一统江湖" type="main" size="16" />
                        <ai-text
                            type="tips"
                            size="14"
                            custom-style="margin-top: 10rpx"
                            text="众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用"
                        />
                    </view>
                </view>
            </ai-skeleton>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            switch1: true,
            switch2: false,
        };
    },
};
</script>

<style lang="scss" scoped>
.skeleton {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    &__image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 200rpx;
    }

    &__content {
        margin-left: 20rpx;
        flex: 1;
    }
}
</style>
