<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:16:10
 * @Description: 加载动画
-->

<template>
    <ai-transition
        :show="loading"
        :custom-style="{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: background,
            display: 'flex',
        }"
    >
        <view class="ai-loading-page">
            <view class="ai-loading-page__warpper">
                <view class="ai-loading-page__warpper__loading-icon">
                    <image
                        v-if="image"
                        :src="image"
                        class="ai-loading-page__warpper__loading-icon__img"
                        mode="widthFit"
                    />
                    <ai-loading-icon v-else :mode="loadingMode" size="28" :color="loadingColor" />
                </view>
                <slot>
                    <text
                        class="ai-loading-page__warpper__text"
                        :style="{
                            fontSize: $util.addUnit(fontSize),
                            color: color,
                        }"
                        >{{ loadingText }}</text
                    >
                </slot>
            </view>
        </view>
    </ai-transition>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiLoadingPage',
    mixins: [mixins],
    props: {
        // 提示内容
        loadingText: {
            type: [String, Number],
            default: '正在加载',
        },
        // 文字上方用于替换loading动画的图片
        image: {
            type: String,
            default: '',
        },
        // 加载动画的模式，circle-圆形，spinner-花朵形，semicircle-半圆形
        loadingMode: {
            type: String,
            default: 'circle',
        },
        // 是否加载中
        loading: {
            type: Boolean,
            default: false,
        },
        // 背景色
        background: {
            type: String,
            default: '#ffffff',
        },
        // 文字颜色
        color: {
            type: String,
            default: '#C8C8C8',
        },
        // 文字大小
        fontSize: {
            type: [String, Number],
            default: 19,
        },
        // 加载中图标的颜色，只能rgb或者十六进制颜色值
        loadingColor: {
            type: String,
            default: '#C8C8C8',
        },
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
$ai-text-color: rgb(200, 200, 200) !default;
$ai-text-size: 38rpx !default;
$ai-loading-icon-margin-bottom: 20rpx !default;

.ai-loading-page {
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;

    &__warpper {
        margin-top: -300rpx;
        justify-content: center;
        align-items: center;
        /* #ifndef APP-NVUE */
        color: $ai-text-color;
        font-size: $ai-text-size;
        /* #endif */
        flex-direction: column;

        &__loading-icon {
            margin-bottom: $ai-loading-icon-margin-bottom;

            &__img {
                width: 80rpx;
                height: 80rpx;
            }
        }

        &__text {
            font-size: $ai-text-size;
            color: $ai-text-color;
        }
    }
}
</style>
